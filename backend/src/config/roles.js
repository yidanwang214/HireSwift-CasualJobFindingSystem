const allRoles = {
  employee: ['applyJobs', 'switchRoles'],
  employer: ['manageJobs', 'switchRoles'],
  admin: ['applyJobs', 'manageJobs', 'manageUsers', 'getUsers', 'switchRoles'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
