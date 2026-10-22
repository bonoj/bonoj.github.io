#!/usr/bin/env python3
"""Job Lattice public feed ingestion. No credentials, no applicant data."""
import datetime as dt
import html
import json
import pathlib
import re
import urllib.request

OUT = pathlib.Path(__file__).resolve().parent / "jobs.json"
HEADERS = {"User-Agent": "JobLattice/1.0 (+https://bonoj.github.io/jit/job-lattice/)", "Accept": "application/json"}
def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=22) as response:
        return json.load(response)
def clean(value):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", " ", str(value or "")))).strip()
def normalize(id, title, company, location, published, description, url, source):
    if not url or not str(url).startswith("https://"):
        return None
    return {"id":str(id),"title":clean(title)[:180],"company":clean(company)[:120],
            "location":clean(location)[:120],"published":str(published or "")[:24],
            "description":clean(description)[:2400],"apply_url":url,"source":source}
jobs = []
sources = {}
try:
    data = fetch("https://remotive.com/api/remote-jobs?limit=500")
    for j in data.get("jobs", []):
        x = normalize("remotive:"+str(j.get("id")),j.get("title"),j.get("company_name"),j.get("candidate_required_location") or "Remote",j.get("publication_date"),j.get("description"),j.get("url"),"remotive")
        if x: jobs.append(x)
    sources["remotive"] = {"status":"ok","count":len(jobs)}
except Exception as e:
    sources["remotive"] = {"status":"error","message":str(e)[:140]}
try:
    data = fetch("https://www.arbeitnow.com/api/job-board-api")
    count = 0
    for j in data.get("data", []):
        x = normalize("arbeitnow:"+str(j.get("slug")),j.get("title"),j.get("company_name"),j.get("location"),j.get("created_at"),j.get("description"),j.get("url"),"arbeitnow")
        if x: jobs.append(x);count+=1
    sources["arbeitnow"] = {"status":"ok","count":count}
except Exception as e:
    sources["arbeitnow"] = {"status":"error","message":str(e)[:140]}

# ATS board feeds: independent employers, including research, graphics,
# games, infrastructure and creative-tool organizations. Missing boards
# remain visible as errors rather than silently shrinking coverage.
GREENHOUSE = ["openai","anthropic","figma","notion","linear","roblox","unity","databricks","cloudflare","stripe","reddit","discord","duolingo","webflow","replit","scaleai","huggingface","crusoe","ramp","vercel","sentry","mongodb","canva","elastic","gitlab"]
LEVER = ["netflix","palantir","anduril","nvidia","epicgames","supergiantgames","larianstudios","wetransfer","astranis","shieldai","relativityspace","runwayml","characterai","perplexity","midjourney"]
def ingest_board(name, url, parse):
    before = len(jobs)
    try:
        data = fetch(url)
        for item in parse(data):
            if item: jobs.append(item)
        sources[name] = {"status":"ok","count":len(jobs)-before}
    except Exception as e:
        sources[name] = {"status":"error","message":str(e)[:140]}
for board in GREENHOUSE:
    def gh(data, board=board):
        for j in data.get("jobs", []):
            details=j.get("content") or ""
            if not details:
                details=" ".join(str(x.get("name","")) for x in j.get("departments",[]))
            yield normalize("greenhouse:"+board+":"+str(j.get("id")),j.get("title"),board,
                (j.get("location") or {}).get("name"),j.get("updated_at"),details,
                j.get("absolute_url"),"greenhouse:"+board)
    ingest_board("greenhouse:"+board,"https://boards-api.greenhouse.io/v1/boards/"+board+"/jobs?content=true",gh)
for board in LEVER:
    def lv(data, board=board):
        for j in data:
            cats=j.get("categories") or {}
            yield normalize("lever:"+board+":"+str(j.get("id")),j.get("text"),board,
                cats.get("location") or " / ".join(cats.get("allLocations") or []),
                j.get("createdAt"),j.get("descriptionPlain") or j.get("description") or "",
                j.get("hostedUrl"),"lever:"+board)
    ingest_board("lever:"+board,"https://api.lever.co/v0/postings/"+board+"?mode=json",lv)

# Wide prefilter: titles OR descriptions, not a narrow title taxonomy.
# Retain each candidate's matching signals and the source accounting.
SIGNALS = {
 "research":["research","scientist","experimental","r&d","innovation","advanced development"],
 "simulation":["simulation","physics","dynamics","robotics","digital twin","modeling","modelling"],
 "creative":["creative technology","interactive","immersive","experience design","imagineering","worldbuilding"],
 "games":["gameplay","game engine","game development","technical artist","procedural","rendering"],
 "visualization":["visualization","visualisation","graphics","3d","spatial","geospatial","computer vision"],
 "architecture":["systems architect","technical architect","principal engineer","staff engineer","technical lead"],
 "prototyping":["prototype","prototyping","rapid iteration","proof of concept","skunkworks"],
 "tooling":["developer tools","internal tools","toolchain","pipeline","platform engineering","infrastructure"],
 "scientific":["scientific software","computational","scientific computing","astronomy","aerospace","space systems"],
 "intelligence":["artificial intelligence","machine learning","ai engineer","agentic","autonomous systems"],
 "engineering":["software engineer","software developer","full stack","frontend","front-end","android","unity","webgl","three.js"]
}
def signals(job):
    title=job["title"].lower()
    description=job["description"].lower()
    return [category for category,words in SIGNALS.items() if any(w in title or w in description for w in words)]

dedup = {}
for j in jobs:
    key=(j["company"].casefold(),j["title"].casefold())
    dedup.setdefault(key,j)
all_unique=list(dedup.values())
filtered=[]
for job in all_unique:
    match=signals(job)
    if match:
        job["signals"]=match
        filtered.append(job)
result={"schema":"job-lattice-feed/v2","fetched_at":dt.datetime.now(dt.timezone.utc).isoformat(),
        "sources":sources,"coverage":{"source_count":len(sources),"healthy_sources":sum(x["status"]=="ok" for x in sources.values()),
        "raw_count":len(jobs),"unique_count":len(all_unique),"prefiltered_count":len(filtered),
        "signal_counts":{k:sum(k in j["signals"] for j in filtered) for k in SIGNALS}},
        "jobs":filtered}
if not result["jobs"]:
    raise SystemExit("No public feeds returned jobs; preserving prior snapshot")
OUT.write_text(json.dumps(result,ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
print("Collected",len(result["jobs"]),"jobs from",sources)
