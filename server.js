require ('dotenv').config()
const express=require('express')
const mysql=require('mysql2')
const myconn=require('express-myconnection')
const routes=require('./routes')
const cors=require('cors')

const app=express()

app.use(cors())

app.set('port',process.env.PORT_SERVER || 9003)

const dbOptions={
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'niwd3',
    password: process.env.DB_PWD || 'N369@edwin.777',
    database: process.env.DB_NAME || 'libreria'
}

// Middelwares ----------

app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json()) /// Formato de entrega

// Rutes
app.get('/',(req,res)=>{
    res.send('Welcome dear to my app')
})

app.use('/api',routes)

// Con Alt + Fn + 96(en el teclado numerico azul, en el latitude salen las Backtis --->  (``))
app.listen(app.get('port'),()=>{
    console.log(`Server runing on port: ${app.get('port')}`)
})