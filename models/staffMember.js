const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxHours: {
        type: Number,
        required: true
    },
    validRoles: [{
        type: String,
        enum: ["Manager", "Chef", "Dishwasher", "Cook"],
        required: true
    }],
    daysUnavailable: [{
        type: String,
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    }],
    assignedShifts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shift'
        }
    ]
});

module.exports = mongoose.model('StaffMembers', staffMemberSchema);