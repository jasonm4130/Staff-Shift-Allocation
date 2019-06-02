const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Shift {
        _id: ID!
        day: String!
        description: String!
        hours: Float!
        assignedStaffMember: StaffMember
    }

    type StaffMember {
        _id: ID!
        name: String!
        maxHours: Int!
        assignedShifts: [Shift!]
    }

    input ShiftInput {
        day: String!
        description: String!
        hours: Float!
    }

    input StaffMemberInput {
        name: String!
        maxHours: Int!
    }

    type RootQuery {
        shifts: [Shift!]!
        staffMembers: [StaffMember!]!
    }

    type RootMutation {
        createShift(shiftInput: ShiftInput): Shift
        createStaffMember(staffMemberInput: StaffMemberInput): StaffMember
        assignShift(staffMemberID: ID!, shiftID: ID!): Shift
        unassignShift(shiftID: ID!): Shift
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);