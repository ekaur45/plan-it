const request = require("supertest");
const {faker} = require("@faker-js/faker");
const signupData = {...{
        firstName:faker.person.firstName(),
        lastName:faker.person.lastName(),
        email:faker.internet.email(),
        username:faker.word.verb({length:10}),
        password:"fakepassword",
        userType:1
}}
const app = require("../src/app");
const mongoUtil = require("../src/utils/mongo-db.util");
const dbConstants = require("../src/models/db.constants");
describe('Test App Runs',()=>{
    // let token = "";
    // beforeAll(async()=>{
    //     const postData = {email,password} = signupData;
    //     postData["email"] = "Antonetta29@hotmail.com";
    //     const resp = await request(app)
    //     .post("/api/auth/login")
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .send(postData);
    //     expect(resp.statusCode).toBe(200);
    //     expect(JSON.parse(resp.text).status).toEqual(200);
    //     token =JSON.parse(resp.text).data.access_token; 
    //     console.log({token});
    // });
    test("It should response the GET method",()=>{
        return request(app).get("/").expect(200)
    })
    // test('It should create user in database',async ()=>{
    //     const postData = {firstName,lastName,email,username,password,userType} = signupData;
    //     const resp = await request(app)
    //     .post("/api/auth/signup")
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .send(postData);
    //     expect(resp.statusCode).toBe(200);
    //     expect(JSON.parse(resp.text).status).toEqual(200);
    //     return JSON.parse(resp.text);        
    // });
    // test('It should login user to system',async ()=>{
    //     const postData = {email,password} = signupData;
    //     postData["email"] = "Antonetta29@hotmail.com";
    //     const resp = await request(app)
    //     .post("/api/auth/login")
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .send(postData);
    //     expect(resp.statusCode).toBe(200);
    //     expect(JSON.parse(resp.text).status).toEqual(200);
    //     return JSON.parse(resp.text);        
    // });
});

describe("Authorized endpoints normal user",()=>{
    let token = "";
    beforeAll(async()=>{
        const postData = {email,password} = signupData;
        postData["email"] = "Antonetta29@hotmail.com";
        const resp = await request(app)
        .post("/api/auth/login")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(postData);
        expect(resp.statusCode).toBe(200);
        expect(JSON.parse(resp.text).status).toEqual(200);
        token =JSON.parse(resp.text).data.access_token; 
        console.log({token});
    });  
    test('Profile',async ()=>{
        const resp = await request(app).get("/api/auth/me").set("authorization",token).send();
        expect(resp.statusCode).toBe(200);
        expect(JSON.parse(resp.text).status).toEqual(200);
        console.log(resp.text);
    });
})