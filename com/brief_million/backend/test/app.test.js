const server = require("../server")
const request = require("supertest")
const conn = require("../api/config/db")

const AdminModel = require("../api/models/Admin.model")
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

before((done)=>{
    conn.connect()
        .then(()=>done())
        .catch((err)=> done(err))
})
after((done)=>{
    conn.close()
        .then(()=>done())
        .catch((err)=> done(err))
})

describe('Admins', ()=>{

    // it("Create new Admin SuccessFully", async()=>{
    //     const adminObj ={
    //         full_name:"TestAdmin",
    //         phone:"06001122332",
    //         password:"testPass000",
    //     };
    //     try {
    //         await request(server).post('/admin/post').send(adminObj)
    //         const newAdmin = await AdminModel.save()
    //         expect(newAdmin).toBe(adminObj);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })

    // it('Create new Admin', function(done) {
    //     request(server).post('/admin/post')
    //       .send({
    //         full_name   : "TestAdmin",
    //         phone       : "06001122332",
    //         password    : "testPass000"
    //       })
    //       .expect(200)
    //       .end(function(err, res) {
    //         done(err);
    //       });
    // });
    
    // it('Create new Admin SuccessFully', (done)=> {
    //     request(server).post('/admin/post')
    //         .send({
                // full_name   : "TestAdmin",
                // phone       : "06001122332",
                // password    : "testPass000"
    //         })
    //         .then((res)=>{
    //             const body = res.body
    //             console.log(body);
    //             expect(body).to.contain.property('_id')
    //             expect(body).to.contain.property('full_name')
    //             expect(body).to.contain.property('phone')
    //             expect(body).to.contain.property('password')
    //             done()
    //         })
    //         .catch((err)=> done(err))
    // })

    it('Get All Admins SuccessFully', (done)=> {
        request(server).get('/admin/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Participants', ()=>{

    it('Get All Participants SuccessFully', (done)=> {
        request(server).get('/participant/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Question', ()=>{

    it('Get All Questions', (done)=> {
        request(server).get('/question/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Question Token', ()=>{

    it('Get All Questions Token', (done)=> {
        request(server).get('/question_token/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Group Members', ()=>{

    it('Get All Group Member', (done)=> {
        request(server).get('/groupMember/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Round', ()=>{

    it('Get All Rounds ', (done)=> {
        request(server).get('/round/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Round score', ()=>{

    it('Get All Round score ', (done)=> {
        request(server).get('/round_score/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Final_winner', ()=>{

    it('Get All final_winner ', (done)=> {
        request(server).get('/final_winner/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})

describe('Gifts', ()=>{

    it('Get All gifts ', (done)=> {
        request(server).get('/gifts/')
            
        .then((res)=>{
            const body = res.body
            done()
        })
        .catch((err)=> done(err))
    })
})