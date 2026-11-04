// Genre-specific dramatic affordances. The same dramatic function is expressed
// through different physical actions and different social stakes.
const motifs={
romance:{places:['STATION CAFE','PLATFORM','WAITING ROOM'],object:'letter',risk:'missing the last train',verbs:['folds the letter without opening it','leaves the letter beside an untouched cup','reads the postmark against the station clock'],question:'Did you ever intend to come back?',reply:'I did. I just never knew how to arrive.'},
romcom:{places:['BALLROOM','CATERING KITCHEN','COURTYARD'],object:'guest list',risk:'ruining the ceremony',verbs:['crosses out the wrong name again','hides the seating chart behind a flower arrangement','discovers two identical invitations'],question:'Is this part of your plan?',reply:'It was, before the plan met the guests.'},
horror:{places:['LOBBY','DARK CORRIDOR','CELLAR'],object:'room key',risk:'being trapped after dark',verbs:['hears a voice through the locked door','finds a key turning on its own','watches a wet footprint appear on dry tiles'],question:'Who is speaking from that room?',reply:'Nobody who is still checked in.'},
'science-fiction':{places:['OBSERVATION DECK','AIRLOCK','CONTROL ROOM'],object:'transmission',risk:'losing the launch window',verbs:['compares the signal against the ship clock','finds a checksum dated tomorrow','holds the receiver to the silent console'],question:'How can the message arrive before it was sent?',reply:'We have been assuming time is moving in one direction.'},
western:{places:['STABLE','DRY RIVERBED','TOWN HALL'],object:'deed',risk:'losing the settlement',verbs:['brushes dust from the survey mark','lays the deed beside a dry water bucket','counts the empty troughs'],question:'Who gave them the right to this land?',reply:'Someone who never had to live on it.'},
mystery:{places:['READING ROOM','PIER','ARCHIVE'],object:'photograph',risk:'letting a witness disappear',verbs:['holds the photograph against the window','compares the witness statement with the tide table','finds a second date beneath the ink'],question:'What is missing from the account?',reply:'The part everyone agreed not to remember.'},
action:{places:['CHECKPOINT','SERVICE ROAD','BRIDGE'],object:'route map',risk:'losing the convoy',verbs:['marks a blocked road on the map','counts the vehicles through the dust','checks the detonator cable beneath the bridge'],question:'How many people are still behind us?',reply:'Too many to turn around.'},
drama:{places:['KITCHEN','GARDEN','ATTIC'],object:'family photograph',risk:'losing the last shared home',verbs:['lifts a photograph from the wall','opens a box that has been sealed for years','finds an old pencil mark on the doorframe'],question:'Why did you keep this?',reply:'Because I did not know what else to save.'},
comedy:{places:['COUNCIL CHAMBER','BACKSTAGE','LOADING BAY'],object:'ceremonial schedule',risk:'embarrassing the entire council',verbs:['discovers two conflicting schedules','hides the ceremonial scissors in a drawer','rehears the wrong announcement'],question:'Who approved this?',reply:'According to the minutes, everyone.'},
fantasy:{places:['SHRINE','STONE PATH','BELL TOWER'],object:'inscribed stone',risk:'breaking the valley ward',verbs:['traces the inscription beneath the ash','hears the bell toll without a striker','finds a crack opening across the seal'],question:'What happens when the bell stops?',reply:'We find out what it was holding back.'},
crime:{places:['BACK OFFICE','ALLEY','WAREHOUSE'],object:'ledger',risk:'being betrayed by the crew',verbs:['counts the missing entries in the ledger','finds a false name beneath the carbon copy','closes the safe before the footsteps reach the door'],question:'Who moved the money?',reply:'The person who knew we would look elsewhere.'}
};
const stakes=[
'An ordinary task is interrupted by a small physical inconsistency.',
'The first concrete clue makes the existing explanation impossible.',
'A choice is made in private before anyone grants permission.',
'The first search reveals a route that cannot be used openly.',
'An ally risks something tangible to keep the investigation alive.',
'An authority figure imposes a deadline and closes the easy route.',
'The obvious solution fails in front of witnesses.',
'Trust breaks over a decision that cannot be taken back.',
'A second piece of evidence gives the first clue a different meaning.',
'The deadline arrives before the characters are ready.',
'The protagonist stops trying to win permission.',
'The ally returns with a costlier, workable alternative.',
'The characters act publicly while the opposition can still intervene.',
'The immediate danger is addressed, leaving a personal cost.',
'The ordinary task returns, but the characters now see it differently.'
];
export function realizeScene(genre,world,beat,seed){
const m=motifs[genre];if(!m)throw Error('missing genre motif: '+genre);
const place=m.places[(beat+seed)%m.places.length],verb=m.verbs[(beat+seed)%m.verbs.length];
const stakesText=stakes[beat];let action;
switch(beat){
case 0:action=`${world.lead} ${verb}. ${stakesText}`;break;
case 1:action=`${world.lead} ${verb}. Nearby lies ${world.clue}. ${stakesText}`;break;
case 2:action=`${world.lead} pockets the ${m.object} and refuses to walk away. ${stakesText}`;break;
case 5:action=`${world.opponent} announces ${world.deadline}. ${world.lead} studies the ${m.object}; ${m.risk} is no longer hypothetical.`;break;
case 8:action=`${world.lead} ${verb}. The discovery is ${world.discovery}. The original clue must be reconsidered.`;break;
case 9:action=`${world.opponent} moves to enforce ${world.deadline}. ${world.lead} is forced to confront ${m.risk}.`;break;
case 11:action=`${world.ally} returns carrying the ${m.object}. They agree to ${world.resolution}, knowing the cost.`;break;
case 12:action=`${world.lead} and ${world.ally} attempt ${world.resolution} as ${world.opponent} intervenes. The ${m.object} becomes the deciding object.`;break;
case 13:action=`The confrontation ends, but ${m.risk} has changed the relationships among them. The ${m.object} remains as evidence of the choice.`;break;
default:action=`${world.lead} ${verb}. ${stakesText} The ${m.object} is still within reach.`;
}
const speakers=beat===5||beat===9||beat===12?[world.opponent,world.lead]:[world.lead,world.ally];
const first=beat===1?m.question:beat===5?'You have until '+world.deadline+'.':beat===12?'We are doing this now.':m.question;
const second=beat===1?m.reply:beat===5?'Then we had better hurry.':beat===12?'You cannot stop us both.':m.reply;
return {location:place,heading:(['DRY RIVERBED','PIER','GARDEN','COURTYARD','SERVICE ROAD','STONE PATH','ALLEY'].includes(place)?'EXT. ':'INT. ')+place+' - '+(beat>9?'NIGHT':'DAY'),participants:speakers,blocks:[{type:'action',text:action},...speakers.flatMap((speaker,j)=>[{type:'character',text:speaker},{type:'dialogue',text:j?second:first}])]};
}
