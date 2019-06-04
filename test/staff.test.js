const chai = require('chai');

const url = `http://localhost:3000`;
const request = require('supertest')(url);

let userId;

describe('Staff Member', () => {
    it('Creates then returns staff member with name = test', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
                createStaffMember(staffMemberInput:{
                    name:"test",
                    maxHours:40,
                    daysUnavailable:["MON"],
                    validRoles:["Manager"]
                })
                {
                _id
                name
                }
            }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.createStaffMember._id);
            userId = res.body.data.createStaffMember._id;
            done();
        })
    })

    it('Get list of staff members', (done) => {
        request
        .post('/api')
        .send({ query: `query {
            staffMembers{
              _id
              name
              maxHours
              validRoles
            } 
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.staffMembers[0]._id);
            done();
        })
    })

    it('Delete staff member by _id', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            deleteStaffMember(ID: "${userId}"){
              _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.expect(res.body.data.deleteStaffMember._id).to.equal(userId);
            done();
        })
    })
});