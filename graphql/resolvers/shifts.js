const Shift = require('../../models/shift');
const StaffMember = require('../../models/staffMember');

module.exports = {
    shifts: async () => {
        try {
            const shifts = await Shift.find().populate('assignedStaff');
            return shifts.map(shift => {
                return {
                    ...shift._doc
                };
            });
        } catch (error) {
            throw error; 
        }
    },

    createShift: async (args) => {
        const shift = new Shift({
            day: args.shiftInput.day,
            description: args.shiftInput.description,
            hours: +args.shiftInput.hours,
            requiredRole: args.shiftInput.requiredRole
        });
        
        try {
            const result = await shift.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    assignShift: async (args) => {
        try {
            const staffMember = await StaffMember.findById(args.staffMemberID).populate('assignedShifts');

            if (!staffMember) {
                throw "No staff member found";
            }

            const shift = await Shift.findById(args.shiftID);

            if (!shift) {
                throw "No shift found";
            }

            const currentHours = await getStaffMemberAssignedHours(staffMember._id);

            console.log(currentHours);

            if (currentHours + shift.hours > staffMember.maxHours) {
                throw "Cannot assign staf member to shift, maximum hours reached";
            }

            if (!staffMember.assignedShifts.some(assignedShift => {
                return assignedShift._id === shift._id;
            })) {
                staffMember.assignedShifts.push(shift);
                await staffMember.save();
            } else {
                throw "Staff member already assigned to this shift";
            }

            shift.assignedStaffMember = staffMember;
            await shift.save();

            return shift;
        } catch (error) {
            throw error;
        }
    },

    unassignShift: async (args) => {
        try {
            const shift = await Shift.findById(args.shiftID);

            if (!shift) {
                throw "No shift found";
            }

            let staffMember = await StaffMember.findById(shift.assignedStaffMember._id).populate('assignedShifts');

            if (!staffMember) {
                throw "No staff member assigned to this shift";
            }

            let shiftIndex;

            staffMember.assignedShifts.forEach((assignedShift, key) => {
                if (assignedShift._id.toString() == shift._id.toString()) {
                    shiftIndex = key;
                }
            });

            staffMember.assignedShifts.splice(shiftIndex, 1);
            await staffMember.save();

            shift.assignedStaffMember = null;
            await shift.save();

            return shift;
        } catch (error) {
            throw error;
        }
    },
}

const getStaffMemberAssignedHours = async (staffId) => {
    try {
        const staffMember = await StaffMember.findById(staffId).populate('assignedShifts');

        if (!staffMember) {
            throw "Staff member not found";
        }

        let currentHours = 0;

        staffMember.assignedShifts.forEach(shift => {
            currentHours += shift.hours;
        });

        return currentHours;
    } catch (error) {
        throw error;
    }
}