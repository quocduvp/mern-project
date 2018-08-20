import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Router} from 'express'
import validator,{isEmpty,isEmail} from 'validator'
import UsersModel from '../model/Users'
import multer from 'multer'
let upload = multer()

const route = Router()

route.post("/register",upload.fields([]),(req,res)=>{
    const { email,password,password2 } = req.body
    UsersModel.findOne({email: email}).then(user=>{
        if(!user){
            if(password.trim() === password2.trim()){
                bcrypt.hash(password, 10, (err,hashpassword)=>{
                    if(err) res.status(300).send(err)
                    new UsersModel({email: email,password: hashpassword}).save().then(r=>{
                        res.status(200).json({success: "Register success."})
                    }).catch(err=>{
                        res.status(400).json({error: "Register fails."})
                    })
                })
            }
        }else{
            res.status(400).json({error: "Account already exists."})
        }
    })   
})

route.post("/login",upload.fields([]),(req,res)=>{
    const { email,password } = req.body
    UsersModel.findOne({email: email},(err,user)=>{
        if(err) res.status(400).json({error: "Error message."})
        if(user){
            if(bcrypt.compareSync(password,user.password)){
                jwt.sign({user: user},"secret_key",{expiresIn:86400},(err,token)=>{
                    res.status(200).json({token:token})
                })
            }else{
                res.status(400).json({error: "Password not exists."})
            }
        }else{
            res.status(401).json({error: "Authentication failed."})
        }
    })
})

export default route