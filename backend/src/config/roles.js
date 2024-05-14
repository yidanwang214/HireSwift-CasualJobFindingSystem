const allRoles = {
  employee: ['applyJobs'],
  employer: ['manageJobs'],
  admin: ['applyJobs', 'manageJobs', 'manageUsers', 'getUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
