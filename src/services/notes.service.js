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

//update note
export const updateNotesById = async (_id, body) => {
    const data = await Notes.findOneAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete note
export const deleteNotesById = async (id) => {
    await Notes.findByIdAndDelete(id);
    return '';
  };

  //Archive note
export const archiveNote = async (_id, body) => {
    var body = {isArchive:true};
    const data = await Notes.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

//trash a note
export const trashNote = async (_id, body) => {
    var body = {isTrash:true};
    const data = await Notes.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };