import express from "express";
import { engine } from 'express-handlebars'
import 'dotenv/config.js'
import logger from 'morgan'
import { connect } from "mongoose";
import { __dirname } from "./utils.js";

const server = express()

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/views')

server.use('/public', express.static('public'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())
//server.use('/', router)
//server.use(errorHandler)
//server.use(notFoundHandler)

server.use(logger('dev'))

//database
/* connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/commerce') //requiere min un parametro: link (URI) conexion
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err)) */

export default server