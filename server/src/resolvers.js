const users = require('./models/User');
const organizations = require('./models/Organization');

module.exports = {
    Query: {
        users: () => {
            return users;
        },
        user: (_, { id }) => {
            const filtered = users.filter(user => user.id === id);
            return filtered.length > 0 ? filtered[0] : null;
        },
        organizations: () => {
            return organizations;
        },
        organization: (_, { id }) => {
            const filtered = organizations.filter(organization => organization.id === id);
            return filtered.length > 0 ? filtered[0] : null;
        }
    },
    Organization: {
        users: organization => users.filter(user => organization.userIds.includes(user.id))
    },
    User: {
        organizations: user => organizations.filter(organization => organization.userIds.includes(user.id))
    }

}