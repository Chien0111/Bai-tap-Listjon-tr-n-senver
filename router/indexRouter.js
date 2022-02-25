const Router = require('express').Router()
const path = require('path')

Router.get('/home', (req,res) => res.sendFile(path.join(__dirname,'../views/home.html')))
Router.get('/jon', (req,res) => res.sendFile(path.join(__dirname,'../views/todo.html')))

module.exports = Router