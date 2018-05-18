import jwtStrategy from 'passport-jwt';

import User from '../Backend/models/user';

const strategy = jwtStrategy.Strategy,
      extractJwt =jwtStrategy.ExtractJwt;
const opts = {}            

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

export function passport() {
     passport.use(
         new jwtStrategy(opts, (jwt_payload,done)=>{
             User.findById(jwt_payload.id,)
                    .then(user=>{
                        if(user){
                            return done(null,user)
                        }
                        return done(null,false)
                    })
                    .catch(err=>{console.log(err)})
         })
     )
}
