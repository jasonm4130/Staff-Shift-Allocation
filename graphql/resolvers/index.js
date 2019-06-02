const shiftResolvers = require('./shifts');
const staffMemberResolvers = require('./staffMember');

const resolvers = {

    ...shiftResolvers,
    ...staffMemberResolvers

};

module.exports = resolvers;