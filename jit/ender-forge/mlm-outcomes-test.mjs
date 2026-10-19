import {evaluateLocalOutcome as evaluate} from "./mlm-outcomes.js";
const obs=(x,y,seconds,entities=[])=>({self:{x,y},seconds,entities});
const cases=[
 ["roam-progress",obs(0,0,1),obs(30,0,4),{action:"ROAM"},"observed"],
 ["roam-unknown",obs(0,0,1),obs(0,0,4),{action:"ROAM"},"unknown"],
 ["look-new-kind",obs(0,0,1,[{kind:"crop"}]),obs(0,0,4,[{kind:"crop"},{kind:"depot"}]),{action:"LOOK"},"observed"],
 ["look-no-novelty",obs(0,0,1,[{kind:"crop"}]),obs(0,0,4,[{kind:"crop"}]),{action:"LOOK"},"unknown"],
 ["approach-progress",obs(0,0,1),obs(35,0,4),{action:"APPROACH",target:{x:100,y:0,kind:"depot"}},"observed"],
 ["follow-unknown",obs(0,0,1),obs(35,0,4),{action:"FOLLOW",target:{x:100,y:0,kind:"bee-worker"}},"unknown"],
 ["visibility-loss-unknown",obs(0,0,1,[{kind:"moth-worker"}]),obs(0,0,4,[]),{action:"LOOK"},"unknown"]
];
const outcomes=cases.map(([name,before,after,intent,expected])=>({name,result:evaluate(before,after,intent),expected}));
const passed=outcomes.filter(x=>x.result.status===x.expected).length;
const report={schema:"ender-mlm-outcomes-test/v1",passed,total:cases.length,outcomes};
console.log(JSON.stringify(report,null,2));
if(passed!==cases.length)process.exitCode=1;
