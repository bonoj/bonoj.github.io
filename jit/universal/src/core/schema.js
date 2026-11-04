export const VERSION=Object.freeze({engine:1,schema:1,library:1});
export function assert(condition,message){if(!condition)throw new Error(message);}
export function filmIdentity(genre,ordinal){assert(/^[a-z][a-z-]*$/.test(genre),'invalid genre');assert(Number.isSafeInteger(ordinal)&&ordinal>=0,'invalid ordinal');return Object.freeze({id:'u1-'+genre+'-'+ordinal,genre,ordinal,version:VERSION});}
export const eventTypes=Object.freeze(['learnsFact','revealsFact','transfersObject','entersLocation','changesTrust','makesPromise','breaksPromise','incursInjury','spendsResource','changesGoal','opensAccess','closesAccess','dies','discoversEvidence','resolvesThread']);
export function validateEvent(e){assert(e&&eventTypes.includes(e.type),'unknown event type');assert(typeof e.actor==='string'&&e.actor.length>0,'event actor required');assert(typeof e.subject==='string'&&e.subject.length>0,'event subject required');return true;}
