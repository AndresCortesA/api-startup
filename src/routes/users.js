import { Router } from 'express'
import { UsersController } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', UsersController.getAll)
usersRouter.get('/:id', UsersController.getById)
usersRouter.post('/', UsersController.addUser)
