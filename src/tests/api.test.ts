import supertest from "supertest";
import App from "../App";
import { expect, test } from 'vitest'
import { sum } from "../App";


test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})


// describe('GET /users', function() {
//     it('responds with json', async function() {
//       const response = await request(app)
//         .get('/users')
//         .set('Accept', 'application/json')
//       expect(response.headers["Content-Type"]).toMatch(/json/);
//       expect(response.status).toEqual(200);
//       expect(response.body.email).toEqual('foo@bar.com');
//     });
//   });