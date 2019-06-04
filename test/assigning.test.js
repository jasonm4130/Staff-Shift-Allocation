const chai = require('chai');

const url = `http://localhost:3000`;
const request = require('supertest')(url);

let shiftId,
staffMemberId;

describe('Create, assign, unassign and Delete', () => {
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

    it('Creates then returns staff member with name = test', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
                createStaffMember(staffMemberInput:{
                    name:"test",
                    maxHours:40,
                    daysUnavailable:["TUE"],
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
            staffMemberId = res.body.data.createStaffMember._id;
            done();
        })
    })

    it('Assigns Shift to staff member and returns id', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            assignShift(staffMemberID: "${staffMemberId}", shiftID: "${shiftId}") {
                _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.assignShift._id);
            done();
        })
    })

    it('Un-assigns Shift that was just created', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            unassignShift(shiftID: "${shiftId}") {
                _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.should().exist(res.body.data.unassignShift._id);
            chai.expect(res.body.data.unassignShift._id).to.equal(shiftId);
            done();
        })
    })

    it('Delete staff created to assign shift to', (done) => {
        request
        .post('/api')
        .send({ query: `mutation {
            deleteStaffMember(ID: "${staffMemberId}"){
              _id
            }
          }`
        })
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            chai.expect(res.body.data.deleteStaffMember._id).to.equal(staffMemberId);
            done();
        })
    })

    it('Delete shift created to assign to staff member', (done) => {
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