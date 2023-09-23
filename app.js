import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express'

import { corsMiddleware } from './src/middlewares/cors.js'
import { usersRouter } from './src/routes/users.js'
import { campusesRouter } from './src/routes/campuses.js'
import { classroomsRouter } from './src/routes/classrooms.js'
import { programsRouter } from './src/routes/programs.js'
import config from './config.js'
import { deviceTypesRouter } from './src/routes/deviceTypes.js'
import { devicesRouter } from './src/routes/devices.js'
import { requestsRouter } from './src/routes/requests.js'
import {isAuth} from './src/middlewares/auth.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json(
    {
      title: 'API for Startup',
      endpoints: {
        users: '/users',
        campuses: '/campuses',
        classrooms: '/classrooms',
        programs: '/programs',
        devicetypes: '/devicetypes',
        devices: '/devices',
        requests: '/requests',
        auth: '/auth'
      }
    })
})


app.use('/users', usersRouter)
app.use('/campuses', campusesRouter)
app.use('/classrooms', classroomsRouter)
app.use('/programs', programsRouter)
app.use('/devicetypes', deviceTypesRouter)
app.use('/devices', devicesRouter)
app.use('/requests', requestsRouter)
app.get('/auth', isAuth, (req, res)=>{
  res.status(200).send({message: 'Tienes acceso'})
})

app.set('port', config.app.port)

app.listen(app.get('port'), () => {
  console.log(`Server listening on port http://localhost:${app.get('port')}`)
})
