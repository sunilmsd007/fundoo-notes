import Notes from '../models/notes.model';

//create notes
export const createNotes = async (body) => {
  const data = await Notes.create(body);
  return data;
};

