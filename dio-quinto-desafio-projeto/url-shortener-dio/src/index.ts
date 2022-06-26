
import { URLController } from './controller/URLcontroller';
import express, { json, NextFunction, Request, Response } from 'express';

const api = express()
api.use(express.json())

const urlController = new URLController()

api.post('/shorten',urlController.shorten)
api.get('/test',(req: Request,res: Response)=>{res.json({success:true})})
api.get("/:hash",urlController.redirect)

api.listen(5000,()=>console.log('Express is listening'))

//api.get('/test',(req: Request,res: Response,next: NextFunction)=>{})