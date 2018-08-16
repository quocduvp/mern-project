import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.get('/api',(req,res)=>{
    res.json({error:"OK"})
})
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