import express from 'express'
import colors from 'colors'
import {pool} from './db.js'
import employeesRoutes from './routes/employees.routes.js'
import  './config.js'
const app = express();

app.use(express.json())
app.use('/api',employeesRoutes)


//Not found middleware
app.use((req,res,next)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;