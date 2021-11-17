module.exports = {
  publicUserResponse(u) {
    let data = u.toObject({virtuals: true});

    delete data.salt;
    delete data.passwordHash;
    delete data.hasPassword;
    delete data.password;
    delete data.auth;

    return data;
  },

  privateUserResponse(u) {
    let data = u.toObject({virtuals: true});

    delete data.salt;
    delete data.passwordHash;
    return data;
  },
};
