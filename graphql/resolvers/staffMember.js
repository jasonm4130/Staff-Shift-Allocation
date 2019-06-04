const StaffMember = require('../../models/staffMember');

module.exports = {
    staffMembers: async () => {
        try {
            const staffMembers = await StaffMember.find().populate('assignedShifts');
            return staffMembers.map(staffMember => {
                return {
                    ...staffMember._doc
                };
            });
        } catch (error) {
            throw error; 
        }
    },

    createStaffMember: async (args) => {
        const staffMember = new StaffMember({
            name: args.staffMemberInput.name,
            maxHours: +args.staffMemberInput.maxHours,
            daysUnavailable: args.staffMemberInput.daysUnavailable,
            validRoles: args.staffMemberInput.validRoles
        });

        try {
            const result = await staffMember.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteStaffMember: async (args) => {
        return await StaffMember.findByIdAndRemove({ _id: args.ID });
    }
}