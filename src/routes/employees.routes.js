import {Router} from 'express'
import {getEmployees, createEmployee, deleteEmployee, patchEmployee, putEmployee, getEmployee} from '../controllers/employees.controller.js'
const router = Router()


router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)


router.post('/employees', createEmployee)


router.delete('/employees/:id',deleteEmployee)

router.put('/employees/:id', putEmployee)

router.patch('/employees/:id', patchEmployee)

export default router