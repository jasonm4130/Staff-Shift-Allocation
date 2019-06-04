const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Shift {
        _id: ID!
        day: String!
        description: String!
        hours: Float!
        requiredRole: String!
        assignedStaffMember: StaffMember
    }

    type StaffMember {
        _id: ID!
        name: String!
        maxHours: Int!
        daysUnavailable: [String!]
        validRoles: [String!]!
        assignedShifts: [Shift!]
    }

    input ShiftInput {
        day: String!
        description: String!
        hours: Float!
        requiredRole: String!
    }

    input StaffMemberInput {
        name: String!
        maxHours: Int!
        daysUnavailable: [String!]
        validRoles: [String!]!
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
        deleteStaffMember(ID: ID!): StaffMember
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);