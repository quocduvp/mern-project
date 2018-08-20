import express from 'express'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import session from 'express-session'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import {SESSION_SECRET} from './util/secrect'
import {mongoUrl} from './util/key'

//route
import UsersRoute from './controller/user_controller'
import ChaptersRoute from './controller/chapter_controller'
import { requiredToken } from './util/requiredToken';
const app = express()

mongoose.connect(mongoUrl).then(r=>{
    console.log("connected database")
}).catch(err=>{
    console.log(err)
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "SESSION_SECRET"
}))
app.use(flash())
app.use(cors())
app.use('/api',UsersRoute)
app.use('/api',ChaptersRoute)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('clients/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"clients","build","index.html"))
    })
}

const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server listen port ${port}`)
})