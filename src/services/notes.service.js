import Notes from '../models/notes.model';

//create notes
export const createNotes = async (body) => {
    const data = await Notes.create(body);
    return data;
};

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Notes.find({userID:userID});
    return data;
}

//get notes by id
export const getNotesById = async (_id,userID) => {
    const data = await Notes.findOne({_id:_id,userID:userID});
    return data;
}

//update note
export const updateNotesById = async (_id, body) => {
    const data = await Notes.findOneAndUpdate(
        {
            _id: _id,
            userID: body.userID
        },
        body,
        {
            new: true
        }
    );
    return data;
};

//delete note
export const deleteNotesById = async (_id, userID) => {
    await Notes.findOneAndDelete({_id: _id, userID: userID});
    return '';
};

//Archive note
export const archiveNote = async (_id) => {
    const noteData = await Notes.findById(_id);
    let checkStatus = () => {
        if (noteData.isArchive == false) {
            return true
        } else {
            return false
        }
    }
    let status = checkStatus();
    const data = await Notes.findByIdAndUpdate(
        {
            _id
        },
        {isArchive:status},
        {
            new: true
        }
    );
    return data;
};

//trash a note
export const trashNote = async (_id) => {
    const noteData = await Notes.findById(_id);
    let checkStatus = () => {
        if (noteData.isTrash == false) {
            return true
        } else {
            return false
        }
    }
    let status = checkStatus();
    const data = await Notes.findByIdAndUpdate(
        {
            _id
        },
        {isTrash:status},
        {
            new: true
        }
    );
    return data;
};