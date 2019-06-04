const chai = require('chai');

const url = `http://localhost:3000`;
const request = require('supertest')(url);

let shiftId;

describe('Shifts', () => {
    it('Creates then returns shift on day = monday', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            createShift(shiftInput: {
                day:"MON",
                description:"test shift",
                hours:5,
                requiredRole:"Manager"
            }) {
              _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.createShift._id);
            shiftId = res.body.data.createShift._id;
            done();
        })
    })

    it('Get list of shifts', (done) => {
        request
        .post('/api')
        .send({ query: `query {
            shifts {
                _id
                day
                hours
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.shifts[0]._id);
            done();
        })
    })

    it('Delete staff member by _id', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            deleteShift(ID: "${shiftId}"){
              _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.expect(res.body.data.deleteShift._id).to.equal(shiftId);
            done();
        })
    })
});