const server = require("../server")
const request = require("supertest");
const expect = require('chai').expect;
const conn = require("../api/config/db");

describe('post new admin /admin/post', ()=>{
    before((done)=>{
        conn.connect()
            .then(()=>done())
            .catch((err)=> done(err))
    })
    // after((done)=>{
    //     conn.close()
    //         .then(()=>done())
    //         .catch((err)=> done(err))
    // })

    it('Create new Admin SuccessFully', (done)=> {
        request(server).post('/admin/post')
            .send({
                full_name   : "TestAdmin",
                phone       : "06001122332",
                password    : "testPass000"
            })
            .then((res)=>{
                const body = res.body
                expect(body).to.contain.property('_id')
                expect(body).to.contain.property('full_name')
                expect(body).to.contain.property('phone')
                expect(body).to.contain.property('password')
                done()
            })
            .catch((err)=> done(err))
    })

    it('Login Admin SuccessFully', (done)=> {
        request(server).post('/admin/login')
            .send({
                phone       : "06001122332",
                password    : "testPass000"
            })
            .then((res)=>{
                const body = res.body
                expect(body).to.be.equal('_id')
                expect(body).to.contain.property('phone')
                expect(body).to.contain.property('password')
                done()
            })
            .catch((err)=> done(err))
    })

    it('Get All Admins SuccessFully', (done)=> {
        request(server).get('/admin/')
            
        .then((res)=>{
            const body = res.body
            console.log(body);
            done()
        })
        .catch((err)=> done(err))
    })
})