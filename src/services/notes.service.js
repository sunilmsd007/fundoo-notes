import Notes from '../models/notes.model';

//create notes
export const createNotes = async (body) => {
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async () => {
    const data = await Notes.find();
    return data;
}

//get notes by id
export const getNotesById = async (id) => {
    const data = await Notes.findById(id);
    return data;
}