const express = require('express')
const res = require('express/lib/response')
const path = require('path')
const todo = require('./router/todoRouter')
const index = require('./router/indexRouter')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/public', express.static(path.join(__dirname,'./public')))
app.use('/todo', todo)
app.use('/', index)

app.listen(3000)