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
