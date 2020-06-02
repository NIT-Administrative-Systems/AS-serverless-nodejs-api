class User {
  // @TODO: Add stuff for your app's user!
  constructor(netid, permissions) {
    this.netid = netid;
    this.permissions = permissions || {access_users: true};
  }
}

module.exports = { User };
