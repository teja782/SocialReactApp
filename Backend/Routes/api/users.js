import express from 'express';
import User from '../../models/user';
import bycrypt from 'bcryptjs';
import {
    generateAvatar
} from '../../utils/utils';
import {
    hashPassword
} from '../../utils/utils';
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        msg: "Hello Users"
    });
});

// Route Registration Post
router.post('/user/register', (req, res) => {
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

             const hashpassword = hashPassword(newUser.password);
             console.log(hashPassword);
             newUser.password = hashpassword;
             newUser.save()
                      .then((user)=>{
                          if(user){
                              res.json(user.name)
                          }
                      })
                      .catch((err)=>{
                          res.status(400).json({msg:err})
                      });

                //  bycrypt.genSalt(10,(err,salt)=>{
                //     bycrypt.hash(newUser.password,salt,(err,hash)=>{
                //         newUser.password = hash;
                //         newUser.save()
                //            .then((user)=>{
                //                if(user){
                //                    res.json(user)
                //                }
                //            })
                //     })
                // })
            }
        })
})

export default router;