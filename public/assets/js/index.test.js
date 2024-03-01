const request = require('supertest');
const app = require('../../../../server');

describe('HTML Routes', () => {
    test('GET /notes route returns notes.html file', async () => {
        const res = await request(app).get('/notes');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/text\/html/);
    });

    test('GET * route returns index.html file', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/text\/html/);
    });
});

describe('API Routes', () => {
    test('GET /api/notes returns all saved notes', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Array));
    });

    test('POST /api/notes saves a new note and returns it', async () => {
        const newNote = { title: 'Test Note', text: 'This is a test note' };
        const res = await request(app)
            .post('/api/notes')
            .send(newNote);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newNote.title);
        expect(res.body.text).toBe(newNote.text);
    });
});
