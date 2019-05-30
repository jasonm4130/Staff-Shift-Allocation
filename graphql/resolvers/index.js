const Shift = require('../../models/shift');
const Staff = require('../../models/staff');

module.exports = {

    shifts: () => {
        return Shift
            .find()
            .populate('assignedStaff')
            .then(shifts => {
                return shifts.map(shift => {
                    return {
                        ...shift._doc
                    };
                });
            })
            .catch(err => {
                throw err;
            });
    },

    createShift: (args) => {
        const shift = new Shift({
            day: args.shiftInput.day,
            description: args.shiftInput.description,
            hours: +args.shiftInput.hours
        });

        return shift
            .save()
            .then(result => {
                return {...result._doc};
            })
            .catch(err => {
                throw err;
            });
    },

    staff: () => {
        return Staff
            .find()
            .populate('assignedShifts')
            .then(staffs => {
                return staffs.map(staff => {
                    return {...staff._doc};
                });
            })
            .catch(err => {
                throw err;
            });
    },

    createStaff: (args) => {
        const staff = new Staff({
            name: args.staffInput.name,
            maxHours: +args.staffInput.maxHours
        });

        return staff
            .save()
            .then(result => {
                return {...result._doc}
            })
            .catch(err => {
                throw err;
            });
    }

};