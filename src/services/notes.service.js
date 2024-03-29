import { client } from '../config/redis';
import Notes from '../models/notes.model';
import User from '../models/user.model';

//create notes
export const createNotes = async (body) => {
    await client.del('getAllData');
    const data = await Notes.create(body);
    return data;
};

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Notes.find({ userID: userID });
    await client.set('getAllData', JSON.stringify(data));
    if (data.length != 0) {
        return data;
    } else {
        throw new Error('No note is available with this userID');
    }

}

//get notes by id
export const getNotesById = async (_id, userID) => {
    const data = await Notes.findOne({ _id: _id, userID: userID });
    if (data != null) {
        return data;
    } else {
        throw new Error('noteId is not available with this userID');
    }

}

//update note
export const updateNotesById = async (_id, body) => {
    await client.del('getAllData');
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
    if (data != null) {
        return data;
    } else {
        throw new Error('noteId is not available with this userID');
    }
};

//delete note
export const deleteNotesById = async (_id, userID) => {
    await client.del('getAllData');
    const data = await Notes.findOneAndDelete({ _id: _id, userID: userID });
    if (data != null) {
        return data;
    } else {
        throw new Error('noteId is not available with this userID');
    }
};

//Archive note
export const archiveNote = async (_id, userID) => {
    await client.del('getAllData');
    const noteData = await Notes.findOne({ _id: _id, userID: userID });
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
        { isArchive: status },
        {
            new: true
        }
    );
    return data;
};

//trash a note
export const trashNote = async (_id, userID) => {
    await client.del('getAllData');
    const noteData = await Notes.findOne({ _id: _id, userID: userID });
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
        { isTrash: status },
        {
            new: true
        }
    );
    return data;
};

//trash a note
export const pinNote = async (_id, userID) => {
    await client.del('getAllData');
    const noteData = await Notes.findOne({ _id: _id, userID: userID });
    let checkStatus = () => {
        if (noteData.pinned == false) {
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
        { pinned: status },
        {
            new: true
        }
    );
    return data;
};

//collaborator
export const collabNote = async (_id, body) => {
    await client.del('getAllData');
    const checkCollaborator = await User.findOne({ email: body.collaborator })
    if (checkCollaborator != null) {
        const data = await Notes.findOneAndUpdate(
            {
                _id: _id,
                userID: body.userID
            },
            {
                $addToSet: { collaborator: body.collaborator }
            },
            {
                new: true
            }
        );
        if (data != null) {
            return data;
        } else {
            throw new Error('noteId is not available with this userID');
        }
    } else {
        throw new Error('invalid user email to collaborate');
    }
}

//remove collaborator
export const removeCollabNote = async (_id, body) => {
    await client.del('getAllData');
    const checkCollaboratorInNote = await Notes.findOne({ _id: _id, collaborator: body.collaborator })
    if (checkCollaboratorInNote != null) {
        const data = await Notes.findOneAndUpdate(
            {
                _id: _id,
                userID: body.userID,
                collaborator: body.collaborator
            },
            {
                $pull: { collaborator: body.collaborator }
            },
            {
                new: true
            }
        );
        return data;
    } else {
        throw new Error('this user email is not available in collaborator');
    }
}