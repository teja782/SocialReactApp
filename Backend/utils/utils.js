import gravatar from 'gravatar';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import key from '../../config/config';

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

export function comparePassword(password, userPassword) {
    return new Promise((resolve, reject) => {
        bycrypt.compare(password, userPassword)
            .then(isMatch => {
                if (isMatch) {
                    console.log(isMatch)
                    resolve(isMatch)
                }
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function generateToken(id, name) {
  return jwt.sign({ id: id, name: name }, key.secret);
}
