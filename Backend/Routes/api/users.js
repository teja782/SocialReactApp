import express from 'express';
import bycrypt from 'bcryptjs';
import  passport  from 'passport';


import { generateAvatar } from '../../utils/utils';
import { hashPassword } from '../../utils/utils';
import { comparePassword } from '../../utils/utils';
import { generateToken } from '../../utils/utils';
import User from '../../models/user';
import {registrationValidation} from '../../utils/validation';
import {loginValidation} from '../../utils/validation';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        msg: "Hello Users"
    });
});

// Route Registration Post
router.post('/user/register', (req, res) => {
    const {registrationErrors,isValid} = registrationValidation(req.body);
    
    if(!isValid){
      return res.status(400).json(registrationErrors)
    }
    
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            if (user) {
                res.status(400).json({
                    message: `User with ${req.body.email} already exists`
                });
            } else {
                const avatar = generateAvatar(req.body.email);
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    date: req.body.date,
                })

                // Generating hash for the password using byscrypt.    
                let pass = newUser.password
                hashPassword(pass)
                    .then(hash => {
                        newUser.password = hash;
                        newUser.save()
                            .then((user) => {
                                if (user) {
                                    res.status(200).json(user.name)
                                }
                            })
                            .catch(err => {
                                res.status(400).json({ "msg": err })
                            })
                    })
                    .catch(err => { console.log(`This is Promise error ${err}`) });

            }
        })
})

//Route for user login
router.post('/login', (req, res) => {
    const {loginErrors,isValid} = loginValidation(req.body)
    if(!isValid){
         return res.status(400).json(loginErrors);
     }
    User.findOne({ email: req.body.email })
        .then(user => {
            // checking user password
            comparePassword(req.body.password, user.password)
                .then(isMatch => {
                  // Generating token for a user login  
                  const token =  generateToken(user.id, user.name)
                    res.status(200).json({ "token": `Bearer ${token}` })
                })
                .catch(err => {
                    res.status(400).json({ "msg": "Error is login" })
                })
        })
});

router.get('/current', passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        name:req.user.email        
    });
})

export default router;