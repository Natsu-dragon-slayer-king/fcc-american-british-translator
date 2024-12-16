const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const res = require('express/lib/response.js');
suite('Functional Tests', () => {
    test("Translation with text and locale fields", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            locale:"american-to-british",
            text:"Mangoes are my favorite fruit."
        })
        .end((err, res)=>{
            const expectedResponse = {
                translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.',
                text: 'Mangoes are my favorite fruit.'
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
        
    })
    test("Translation with text and invalid locale field", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            locale:"american-to-french",
            text:"Mangoes are my favorite fruit."
        })
        .end((err, res)=>{
            const expectedResponse = {
                error: 'Invalid value for locale field' 
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
        
    })
    test("Translation with missing text field", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            locale:"american-to-british"
        })
        .end((err, res)=>{
            const expectedResponse = { 
                error: 'Required field(s) missing' 
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
        
    })
    test("Translation with missing locale field", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            text:"Mangoes are my favorite fruit."
        })
        .end((err, res)=>{
            const expectedResponse = {
                error: "Invalid value for locale field"
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
    })
    test("Translation with empty text", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            text:"",
            locale:"american-to-british"
        })
        .end((err, res)=>{
            const expectedResponse = {
                error: "No text to translate"
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
    })
    test("Translation iwht text that needs no translation", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            locale:"american-to-british",
            text:"No translation is needed here thank you!"
        })
        .end((err, res)=>{
            const expectedResponse = {
                text:"No translation is needed here thank you!",
                translation:"Everything looks good to me!"
            }
            err && console.error(err);
            assert.equal(res.status, 200);
            assert.deepStrictEqual(res.body, expectedResponse, "The response object must match expectedResponse object");
            done();
        })
    })
});
