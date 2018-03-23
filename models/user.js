const bcrypt = require('bcryptjs');
const db = require('../db/index.js');
const userModelObject = {};

// Note that this is NOT middleware!
userModelObject.create = function create(user) {
    // This is where we obtain the hash of the user's password.
    const passwordDigest = bcrypt.hashSync(user.password, 1);
    const location = (user.city+","+user.state)
    // Generally we try to avoid passing promises around, but here 
    // LocalStrategy's interface means we can't just rely on next() 
    // to glide us to the next thing we want to do. So we'll return the callback.
    // To see how it's used, see passport.use('local-strategy', ...) in services/auth.js
    // Anyway, here we make an entry in the database for the new user.
    // We do NOT store the password in the database!
    // Instead we store the password digest, which is a salted hash of the password.
    // If someone grabs the password digest it won't tell them what the password is,
    // but we can use the password digest to verify if a submitted password is correct.
    // This is the magic of hashes.
    return db.oneOrNone(
        'INSERT INTO users (fname, lname, email, password_digest, favorite_source, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [user.fname, user.lname, user.email, passwordDigest, user.favorite_source, location]
    );
};

// Here's a tricky part.
// We need both a middleware _and_ a nonmiddleware version 
// (nonmiddleware for use in services/auth.js).

// Again, LocalStrategy's interface means it's easiest to return a promise here.
userModelObject.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

userModelObject.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    console.log('in findByEmailMiddleware');
    const email = req.user.email;
    userModelObject
        .findByEmail(email) // here we're using the nonmiddleware version above, getting back a promise
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};


userModelObject.update = function accountUpdate(req, res, next) {

    console.log(req.body)

    const passwordDigest = bcrypt.hashSync(req.body.passwordDigest, 1);
    const location = `${req.body.city}, ${req.body.state}`

    db
        .one(
            "UPDATE users SET fname = $1, lname = $2, password_digest = $3, favorite_source = $4, location = $5 WHERE id = $6 RETURNING *;",
            [
                req.body.fname,
                req.body.lname,
                passwordDigest,
                req.body.favorite_source,
                location,
                req.body.id
            ]
        )
        .then(data => {
            res.locals.updatedUserData = data;
            next();
        })
        .catch(error => {
            console.log("error encountered in userModelObject.update. Error:", error);
            next(error);
        });
};

userModelObject.destroy = (req, res, next) => {
    db
        .one('DELETE FROM users WHERE id = $1', [req.user.id])
        .then(() => {
            next();
        })
        .catch(error => {
            console.log('error encountered in userModelObject.destroy. error:', error);
            next(error);
        });
};

module.exports = userModelObject;