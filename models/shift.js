const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    day: {
        type: String,
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    assignedStaff: {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    }
});

module.exports = mongoose.model('Shift', shiftSchema);