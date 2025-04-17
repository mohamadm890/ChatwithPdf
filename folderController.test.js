const request = require('supertest');
const app = require('./app.cjs');  // Path to your Express app file

describe('Folder API', () => {
    
    // Test for creating a folder (POST /folders)
    it('should create a folder', async () => {
        const response = await request(app)
            .post('/folders')  // Your POST route
            .send({ fileName: 'MyTestFoldernow' })
            .set('Content-Type', 'application/json');
         console.log(response.body);  // Log the response body to inspect it

        // Assertions to verify the response
        expect(response.status).toBe(201);  // Status should be 201 (Created)
        expect(response.body.message).toBe('Folder created successfully');  // Check the success message
        expect(response.body.folder.name).toBe('MyTestFoldernow');  // Folder name should match
    });

    // Test for getting all folders (GET /folders)

});
