import express from 'express'
import {getAll, getSpecific, createOne, updateOne,deleteOne} from '../controllers/voie.controller.js'
import Autentification from '../middlewares/Authentification.middleware.js'
const VoieRouter = express.Router()

VoieRouter.get('/voies',Autentification, getAll)
VoieRouter.get('/voie/:id',  Autentification, getSpecific)
VoieRouter.post('/voie/',  Autentification, createOne)
VoieRouter.put('/voie/:id',  Autentification, updateOne)
VoieRouter.delete('/voie/:id',  Autentification, deleteOne)

export default VoieRouter