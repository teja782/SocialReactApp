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

 bycrypt.genSalt(10, (err, salt) => {
  return      bycrypt.hash(password, salt, (err, hash) => {
            hash
        })
    })
}