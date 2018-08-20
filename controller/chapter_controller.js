import {Router} from 'express'
import { requiredToken } from '../util/requiredToken';
import jwt from 'jsonwebtoken'
const route = Router()

route.get("/chapter",requiredToken,(req,res)=>{
    jwt.verify(req.token,"secret_key",(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json(authData)
        }
    })
})

export default route