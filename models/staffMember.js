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
    assignedShifts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shift'
        }
    ]
});

module.exports = mongoose.model('StaffMembers', staffMemberSchema);