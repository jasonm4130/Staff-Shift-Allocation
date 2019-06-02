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
            maxHours: +args.staffMemberInput.maxHours
        });

        try {
            const result = await staffMember.save();
            return result;
        } catch (error) {
            throw error;
        }
    },
}