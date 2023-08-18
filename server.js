require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const mongoose = require('mongoose')
const {meuMiddleware, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware')
const helmet = require('helmet')
const csurf = require('csurf')


mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.emit("pronto")
    })
    .catch((e) => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')


const sessionOptions = session({
    secret: 'dfasdfg asdf asdfg asdfg',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
})

app.use(helmet())
app.use(sessionOptions)
app.use(flash())
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'))

app.set('views', './src/views')
app.set('views engine', 'ejs')

app.use(csurf())

app.use(meuMiddleware)
app.use(checkCsrfError)
app.use(csrfMiddleware)

app.use(routes)

app.on("pronto", () => {
    app.listen(3000, () => {
        console.log('Servidor rodando na localhost:3000')
    })
})