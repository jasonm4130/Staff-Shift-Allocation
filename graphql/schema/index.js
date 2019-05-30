const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Shift {
        _id: ID!
        day: String!
        description: String!
        hours: Float!
        assignedStaff: Staff
    }

    input ShiftInput {
        day: String!
        description: String!
        hours: Float!
    }

    type Staff {
        _id: ID!
        name: String!
        maxHours: Int!
        assignedShifts: [Shift]
    }

    input StaffInput {
        name: String!
        maxHours: Int!
    }

    type RootQuery {
        shifts: [Shift!]!
        staffs: [Staff!]!
    }

    type RootMutation {
        createShift(shiftInput: ShiftInput): Shift
        createStaff(staffInput: StaffInput): Staff
        assignStaff(shiftId: ID!): Shift!
        unassignShift(staffId: ID, shiftId: ID): Staff!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);