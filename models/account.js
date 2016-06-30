
var account = {
    username: 'cc',
    password: 'anything'
}

function authenticate(username, password, done) {
    if (!account) {
        return done(new Error('forget set account!'));
    }
    if (!username || username !== account.username) {
        return done(null, false, { type: 'username', message: 'Incorrect username!'});
    }
    if (account.password !== password) {
        return done(null, false, { type: 'password', message: 'Incorrect password!'});
    }
    return done(null, account);
}

function serializeUser(user, done) {
    done(null, user.username);
}

function deserializeUser(username, done) {
    done(null, account);
}

module.exports.authenticate = authenticate;
module.exports.serializeUser = serializeUser;
module.exports.deserializeUser = deserializeUser;