import dotenv from 'dotenv'
import {resolve} from 'path'
import server from './server'
import mongodbI from './infrastructure/mongodb'
import hashI from './infrastructure/hash'
import emailI from './infrastructure/email'
import serverFactory from './serverFactory'

dotenv.config({ path: resolve(__dirname, "../.env") });


export const mainF = serverFactory(mongodbI(), emailI(), hashI());

server();