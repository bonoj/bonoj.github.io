import {PRIMITIVES} from './primitives.js';
// Five universal effect channels. Every catalog item receives a typed contract.
// These are ABSTRACT semantic contracts, not executable screenplay transactions.
const CHANNEL={physical:'material',social:'relationship',plot:'obligation',dialogue:'knowledge',world:'environment'};
const RULES=[
{words:/^(drop|spill|break|tear|burn|demolish|destroy|collapse|injure|death|dies|stain|lose|missing|lost|failure|fail|sabotage)/,effect:'damage',requires:'asset'},
{words:/^(hide|conceal|withhold|secret|coverup|disguise|mask|forge|counterfeit|lie|mislead|false|unreliable)/,effect:'obscure',requires:'information'},
{words:/^(reveal|discover|find|unearth|expose|confess|admit|testify|publish|recognize|inspect|read|overhear|intercept|record|photograph|verify)/,effect:'disclose',requires:'information'},
{words:/^(promise|agree|commit|propose|accept|sign|pledge|vouch|invite|hire|elect|nominate|grant)/,effect:'bind',requires:'agent'},
{words:/^(betray|refuse|deny|reject|retract|withdraw|breaks|defect|abandon|fire|depose|exclude|revoke)/,effect:'unbind',requires:'agent'},
{words:/^(arrive|enter|return|homecoming|migration|invasion|release|escape|rescue|retrieve|receive|deliver)/,effect:'introduce',requires:'location'},
{words:/^(leave|exit|depart|flee|exile|vanish|evacuate|retreat|remove|discard)/,effect:'remove',requires:'location'},
{words:/^(give|exchange|trade|sell|purchase|buy|steal|borrow|lend|transfer|swap|inherit|inheritance|redistribution)/,effect:'transfer',requires:'asset'},
{words:/^(warn|threaten|ultimatum|deadline|countdown|curfew|blockade|embargo|siege|race|pursuit|chase)/,effect:'pressure',requires:'agent'},
{words:/^(forgive|reconcile|ally|cooperate|comfort|reassure|praise|thank|protect|peace|truce|ceasefire)/,effect:'repair',requires:'relationship'},
{words:/^(accuse|insult|humiliate|mock|blame|rival|conflict|competition|challenge|retaliate|protest|riot)/,effect:'strain',requires:'relationship'},
{words:/^(open|unlock|connect|activate|repair|restore|enable|breakthrough|invention|cure)/,effect:'enable',requires:'access'},
{words:/^(close|lock|block|disable|disconnect|outage|shortage|jam|failure|quarantine|arrest)/,effect:'disable',requires:'access'}
];
const DEFAULT={physical:'alter',social:'negotiate',plot:'complicate',dialogue:'communicate',world:'perturb'};
const REQUIRED={physical:'asset',social:'agent',plot:'obligation',dialogue:'agent',world:'environment'};
export const CONTRACTS=Object.freeze(Object.fromEntries(PRIMITIVES.map(p=>{
const word=p.id.split(':')[1],rule=RULES.find(r=>r.words.test(word));
return [p.id,Object.freeze({id:p.id,kind:p.kind,channel:CHANNEL[p.kind],requires:rule?.requires||REQUIRED[p.kind],effect:rule?.effect||DEFAULT[p.kind],resolution:'abstract-v1'})];
})));
export function contractFor(id){return CONTRACTS[id]??null;}
export function validateContracts(){
for(const p of PRIMITIVES){const c=contractFor(p.id);if(!c||!c.channel||!c.requires||!c.effect)throw Error('missing semantic contract '+p.id);}
return PRIMITIVES.length;
}
