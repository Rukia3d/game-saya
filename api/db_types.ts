export interface DialogueDB {
  id: string;
  background: string;
  linesList: string;
  action: string;
}
export interface LineDB {
  dialogueId: string;
  id: string;
  character: string;
  image: string;
  pos: string;
  text: string;
}
export interface AdventureDB {
  id: string;
  name: string;
  image: string;
  form: string;
  storyGroups: string;
}
export interface StoryGroupDB {
  id: string;
  adventure: string;
  visual: string;
  name: string;
  stories: string;
}
export interface StoryDB {
  group: string;
  id: string;
  name: string;
  image: string;
  type: string;
  enemy: string;
  characters: string;
  actions: string;
}
export interface EnemyDB {
  id: string;
  name: string;
  element: string;
  life: string;
  exp: string;
}
export interface EnemyCardDB {
  id: string;
  name: string;
  strength: string;
  element: string;
  image: string;
  description: string;
}
export interface HeroDB {
  id: string;
  name: string;
  image: string;
}
export interface SpellDB {
  owner: string;
  id: string;
  name: string;
  effect: string;
  trump: string;
  character: string;
  element: string;
  strength: string;
  default: string;
  mana: string;
  image: string;
  type: string;
  description: string;
}
export interface NpcDB {
  id: string;
  name: string;
  image: string;
}
