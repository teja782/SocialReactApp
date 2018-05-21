import Validator from 'validator';
import {isEmpty} from './utils';

export function registrationValidation(user){
    let registrationErrors = {}

    user.name = !isEmpty(user.name)?user.name:''
    user.email = !isEmpty(user.email)?user.email:'' 
    user.password = !isEmpty(user.password)?user.password:''    

    if(Validator.isEmpty(user.name)){
        registrationErrors.name = "Name should not be empty"
    }
    
    if(!Validator.isLength(user.name,{min:2,max:30})){
      registrationErrors.name = "Name should have minimum lenghth 2 and maximum length 30"
    }

    if(!Validator.isLength(user.password,{min:8,max:18})){
        registrationErrors.password = "Password should have length"
    }

    if(Validator.isEmpty(user.password)){
        registrationErrors.password = "Password should not be empty"
    }


    if(Validator.isEmpty(user.email)){
        registrationErrors.email = "Email should not be eEmail"
    }

    if(!Validator.isEmail(user.email)){
        registrationErrors.email = "Email provided is not valid"
    }

    return {
        registrationErrors,
        isValid:isEmpty(registrationErrors)
    }
    
}

export function loginValidation(user){
    let loginErrors = {}
    user.email = !isEmpty(user.email)?user.email:''
    user.password = !isEmpty(user.password)?user.password:''

  if(Validator.isEmpty(user.email)){
      loginErrors.email = 'Email should not be empty'
  }

  if(Validator.isEmpty(user.password)){
      loginErrors.password = 'Password should not be empty'
  }

  return {
      loginErrors,
      isValid:isEmpty(loginErrors)
  }
}