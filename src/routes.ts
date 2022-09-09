import { Router } from 'express'
import multer from 'multer'

import { AuthAdminController } from './controllers/Admin/AuthAdminController'

import { AuthUserController } from './controllers/User/AuthUserController'
import { CreateUserController } from './controllers/Admin/CreateUserController'
import { EditUserController } from './controllers/User/EditUserController'

import { AuthCollaboratorController } from './controllers/Collaborator/AuthCollaboratorController'
import { CreateCollaboratorController } from './controllers/Admin/CreateCollaboratorController'
import { EditCollaboratorController } from './controllers/Collaborator/EditCollaboratorController'

import { isAuthenticated } from './middlewares/isAuthenticated'

import { CreateServiceController } from './controllers/Service/CreateServiceController'
import { ListServicesController } from './controllers/Service/ListServicesController'
import { EditServiceController } from './controllers/Service/EditServiceController'
import { DeleteServiceController } from './controllers/Service/DeleteServiceController'

import { CreateDocOrderController } from './controllers/Order/CreateDocOrderController'
import { DeleteDocOrderController } from './controllers/Order/DeleteDocOrderController'
import { ListOrdersController } from './controllers/Order/ListOrdersController'
import { GetOrderController } from './controllers/Order/GetOrderController'
import { CancelOrderController } from './controllers/Order/CancelOrderController'
import { CreateOrderController } from './controllers/Order/CreateOrderController'
import { AcceptOrderController } from './controllers/Order/AcceptOrdersController'
import { StatusOrderController } from './controllers/Order/StatusOrdersController'
import { ListOpenOrdersController } from './controllers/Order/ListOpenOrdersController'


import uploadConfig from './config/multer'
import { EditAdminUserController } from './controllers/Admin/EditAdminUserController'
import { EditAdminCollaboratorController } from './controllers/Admin/EditAdminCollaboratorController'
import { ListUsersController } from './controllers/Admin/ListUsersController'
import { ListCollaboratorsController } from './controllers/Admin/ListCollaboratorsController'
import { DeleteUserController } from './controllers/Admin/DeleteUserController'
import { DeleteCollaboratorController } from './controllers/Admin/DeleteCollaboratorController'
import { GetUserController } from './controllers/Admin/GetUserController'
import { GetCollaboratorController } from './controllers/Admin/GetCollaboratorController'
import { ListAdminOrdersController } from './controllers/Admin/ListAdminOrdersController'

const upload = multer(uploadConfig)

const router = Router()

// Routes User

router.post('/user-session', new AuthUserController().handle)
router.post('/admin-session', new AuthAdminController().handle)
router.post('/collaborator-session', new AuthCollaboratorController().handle)
router.get('/services', new ListServicesController().handle)

router.use(isAuthenticated)

// Users and Colaborators

router.put('/user', upload.single("file"), new EditUserController().handle)
router.put('/collaborator', upload.single("file"), new EditCollaboratorController().handle)

// Routes Clientes e Técnicos

router.get('/orders-open', new ListOpenOrdersController().handle)
router.get('/orders/:type', new ListOrdersController().handle)
router.get('/order/:id', new GetOrderController().handle)
router.post('/order', new CreateOrderController().handle)
router.put('/accept-order/:id', new AcceptOrderController().handle)
router.put('/status/:id', new StatusOrderController().handle)
router.put('/order-cancel/:id', new CancelOrderController().handle)
router.post('/doc/:id', upload.single("file"), new CreateDocOrderController().handle)
router.delete('/doc/:id', upload.single("file"), new DeleteDocOrderController().handle)

// Routes Admin

router.get('/users', new ListUsersController().handle)
router.post('/user', upload.single("file"), new CreateUserController().handle)
router.put('/user/:id', upload.single("file"), new EditAdminUserController().handle)
router.delete('/user/:id', new DeleteUserController().handle)
router.get('/collaborators', new ListCollaboratorsController().handle)
router.post('/collaborator', upload.single("file"), new CreateCollaboratorController().handle)
router.put('/collaborator/:id', upload.single("file"), new EditAdminCollaboratorController().handle)
router.delete('/collaborator/:id', new DeleteCollaboratorController().handle)
router.get('/user/:id', new GetUserController().handle)
router.get('/collaborator/:id', new GetCollaboratorController().handle)
router.get('/orders/:type/:id', new ListAdminOrdersController().handle)

// Services

router.post('/service', new CreateServiceController().handle)
router.put('/service/:id', new EditServiceController().handle)
router.delete('/service/:id', new DeleteServiceController().handle)


export { router }