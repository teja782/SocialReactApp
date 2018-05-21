import jwtStrategy from 'passport-jwt';
import mongoose from 'mongoose';
import User from '../Backend/models/user';
import key from '../config/config';

const JWTStrategy = jwtStrategy.Strategy,
      extractJwt =jwtStrategy.ExtractJwt;
const opts = {}            

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;

module.exports =  passport => {
     passport.use( new JWTStrategy(opts, (jwt_payload,done)=>{
             User.findById(jwt_payload.id)
                   .then(user=>{
                       if(user){
                       return done(null,user);                          
                       }
                   return done(null,false)                       
                   })
                   .catch(err=>{
                       console.log(err);
                   })
         })
     )
}
