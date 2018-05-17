import gravatar from 'gravatar';
import bycrypt from 'bcryptjs';

export function generateAvatar(email) {
    return gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
}

export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(password, salt, (err, hash) => {
                if (hash) {
                    resolve(hash)
                }
                else {
                    reject("error:generating hash for the password")
                }
            })
        })
    })
}
