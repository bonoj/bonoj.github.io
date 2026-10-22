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
dedup = {}
for j in jobs:
    key=(j["company"].casefold(),j["title"].casefold())
    dedup.setdefault(key,j)
result={"schema":"job-lattice-feed/v1","fetched_at":dt.datetime.now(dt.timezone.utc).isoformat(),"sources":sources,"jobs":list(dedup.values())}
if not result["jobs"]:
    raise SystemExit("No public feeds returned jobs; preserving prior snapshot")
OUT.write_text(json.dumps(result,ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
print("Collected",len(result["jobs"]),"jobs from",sources)
