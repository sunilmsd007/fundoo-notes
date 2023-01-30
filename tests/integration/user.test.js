import request from 'supertest';
import app from '../../src/index';
import mongoose from 'mongoose';

describe('User APIs Test', () => {
    beforeAll((done) => {
        const clearCollections = () => {
            for (const collection in mongoose.connection.collections) {
                mongoose.connection.collections[collection].deleteOne(() => { });
            }
        };

        const mongooseConnect = async () => {
            await mongoose.connect(process.env.DATABASE_TEST);
            clearCollections();
        };

        if (mongoose.connection.readyState === 0) {
            mongooseConnect();
        } else {
            clearCollections();
        }

        done();
    });


    //1 - Test case for user registration
    test('1. test user registration', async () => {
        const inputBody = {
            "firstname": "sunil",
            "lastname": "kumar",
            "email": "sunil07@gmail.com",
            "password": "sunil@007"
        }
        const response = await request(app)
            .post('/api/v1/users/register')
            .send(inputBody)
        expect(response.statusCode).toBe(201);
    })

    //2 - Test case for user login
    var token;
    test('2. test user login', async () => {
        const inputBody = {
            "email": "sunil07@gmail.com",
            "password": "sunil@007"
        }
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(inputBody)
        token = response.body.data;
        expect(response.statusCode).toBe(202);
    })

    // 3 - Test case for notes creation
    var noteID;
    test('3. Notes Create', async () => {
        const inputBody = {
            title: "wood",
            description: "sandal"
        }
        const response = await request(app)
            .post('/api/v1/notes/')
            .set('authorization', `Bearer ${token}`)
            .send(inputBody)
        noteID = response.body.data._id;
        expect(response.statusCode).toEqual(201);
    });

    // 4 - Test case to get all notes 
    test('4. Get All Notes', async () => {
        const response = await request(app)
            .get('/api/v1/notes/')
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(202);
    });

    // 5 - Test case to get note by id 
    test('5. Get All Notes', async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${noteID}`)
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(200);
    });

    // 6 - Test case to update note by id 
    test('6. Update Note By ID', async () => {
        const inputBody = {
            colour: "Blue"
        }
        const response = await request(app)
            .put(`/api/v1/notes/${noteID}`)
            .set('authorization', `Bearer ${token}`)
            .send(inputBody)
        expect(response.statusCode).toEqual(202);
    });

    // 7 - Test case to update isArchive status of note
    test('7. isArchive Note', async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteID}/isArchive`)
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(202);
    });

    // 8 - Test case to update isTrash status of note
    test('8. isTrash Note', async () => {
        const response = await request(app)
            .put(`/api/v1/notes/${noteID}/isTrash`)
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(202);
    });

    // 9 - Test case to delete note by id 
    test('9. Delete Note By ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/notes/${noteID}`)
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(200);
    });

    //10 - Test case for invalid user firstname
    test('10. test case for invalid user firstname', async () => {
        const inputBody = {
            "firstname": "sun",
            "lastname": "kumar",
            "email": "sunil07@gmail.com",
            "password": "sunil@007"
        }
        const response = await request(app)
            .post('/api/v1/users/register')
            .send(inputBody)
        expect(response.statusCode).toBe(500);
    })

    //11 - Test case for invalid user lastname
    test('11. test case for invalid user lastname', async () => {
        const inputBody = {
            "firstname": "sunil",
            "lastname": "kum",
            "email": "sunil07@gmail.com",
            "password": "sunil@007"
        }
        const response = await request(app)
            .post('/api/v1/users/register')
            .send(inputBody)
        expect(response.statusCode).toBe(500);
    })

    //12 - Test case for invalid user login
    var token;
    test('12. test case for invalid user email login', async () => {
        const inputBody = {
            "email": "sunil07gmail.com",
            "password": "sunil@007"
        }
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(inputBody)
        token = response.body.data;
        expect(response.statusCode).toBe(500);
    })

    // 13 - Test case for invalid notes creation
    var noteID;
    test('13. test case for invalid notes creation', async () => {
        const inputBody = {
            title: "wood"
        }
        const response = await request(app)
            .post('/api/v1/notes/')
            .set('authorization', `Bearer ${token}`)
            .send(inputBody)
        noteID = response.body.data._id;
        expect(response.statusCode).toEqual(500);
    });

    // 14 - Test case for get all notes without token
    test('14. Get All Notes', async () => {
        const response = await request(app)
            .get('/api/v1/notes/')
        expect(response.statusCode).toEqual(400);
    });

    // 15 - Test case to get note by invalid id  
    var note
    test('15. Get All Notes', async () => {
        const response = await request(app)
            .get(`/api/v1/notes/${note}`)
            .set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toEqual(500);
    });

});