import { Router } from 'express'
import multer from 'multer'

import { AuthAdminController } from './controllers/Admin/AuthAdminController'

import { AuthUserController } from './controllers/User/AuthUserController'
import { CreateUserController } from './controllers/Admin/Users/CreateUserController'
import { EditUserController } from './controllers/User/EditUserController'

import { AuthCollaboratorController } from './controllers/Collaborator/AuthCollaboratorController'
import { CreateCollaboratorController } from './controllers/Admin/Collaborators/CreateCollaboratorController'
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

import { EditAdminUserController } from './controllers/Admin/Users/EditAdminUserController'
import { EditAdminCollaboratorController } from './controllers/Admin/Collaborators/EditAdminCollaboratorController'
import { ListUsersController } from './controllers/Admin/Users/ListUsersController'
import { ListCollaboratorsController } from './controllers/Admin/Collaborators/ListCollaboratorsController'
import { DeleteUserController } from './controllers/Admin/Users/DeleteUserController'
import { DeleteCollaboratorController } from './controllers/Admin/Collaborators/DeleteCollaboratorController'
import { GetUserController } from './controllers/Admin/Users/GetUserController'
import { GetCollaboratorController } from './controllers/Admin/Collaborators/GetCollaboratorController'
import { ListAdminOrdersController } from './controllers/Admin/ListAdminOrdersController'

import { ListBannersPublicController } from './controllers/Admin/Banners/ListBannersPublicController'
import { ListBannersController } from './controllers/Admin/Banners/ListBannersController'
import { CreateBannerController } from './controllers/Admin/Banners/CreateBannerController'
import { EditBannerController } from './controllers/Admin/Banners/EditBannerController'
import { DeleteBannerController } from './controllers/Admin/Banners/DeleteBannerController'

import uploadConfig from './config/multer'
import { ListCoursesController } from './controllers/Admin/Courses/ListCoursesController'
import { CreateCourseController } from './controllers/Admin/Courses/CreatecCourseController'
import { EditCourseController } from './controllers/Admin/Courses/EditCourseController'
import { DeleteCourseController } from './controllers/Admin/Courses/DeleteCourseController'
import { ListLessonsController } from './controllers/Admin/Lessons/ListLessonsController'
import { CreateLessonController } from './controllers/Admin/Lessons/CreateLessonController'
import { EditLessonController } from './controllers/Admin/Lessons/EditLessonController'
import { DeleteLessonController } from './controllers/Admin/Lessons/DeleteLessonController'
import { ListCoursesPublicController } from './controllers/Admin/Courses/ListCoursesPublicController'
import { GetLessonController } from './controllers/Admin/Lessons/GetLessonController'
import { GetCoursePublicController } from './controllers/Admin/Courses/GetCoursePublicController'
import { GetContractController } from './controllers/Contract/GetContractController'
import { ListContractsController } from './controllers/Contract/ListContractsController'
import { AdminListContractsController } from './controllers/Contract/AdminListContractController'
import { CreateContractController } from './controllers/Contract/CreateContractController'
import { SignatureContractController } from './controllers/Contract/SignatureContractController'
import { RefusalContractController } from './controllers/Contract/RefusalContractController'


const upload = multer(uploadConfig)

const router = Router()

// Routes Publios

router.post('/user-session', new AuthUserController().handle)
router.post('/admin-session', new AuthAdminController().handle)
router.post('/collaborator-session', new AuthCollaboratorController().handle)
router.get('/services', new ListServicesController().handle)
router.get('/banners-public', new ListBannersPublicController().handle)
router.get('/contract/:id', new GetContractController().handle)

router.use(isAuthenticated)

// Users and Colaborators

router.get('/course/:course_id', new GetCoursePublicController().handle)
router.get('/courses-user', new ListCoursesPublicController().handle)
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

router.get('/user', new GetUserController().handle)
router.get('/collaborator', new GetCollaboratorController().handle)

// Routes Admin

router.get('/users', new ListUsersController().handle)
router.post('/user', upload.single("file"), new CreateUserController().handle)
router.put('/user/:id', upload.single("file"), new EditAdminUserController().handle)
router.delete('/user/:id', new DeleteUserController().handle)

router.get('/collaborators', new ListCollaboratorsController().handle)
router.post('/collaborator', upload.single("file"), new CreateCollaboratorController().handle)
router.put('/collaborator/:id', upload.single("file"), new EditAdminCollaboratorController().handle)
router.delete('/collaborator/:id', new DeleteCollaboratorController().handle)

router.get('/banners', new ListBannersController().handle)
router.post('/banner', upload.single("file"), new CreateBannerController().handle)
router.put('/banner/:id', upload.single("file"), new EditBannerController().handle)
router.delete('/banner/:id', new DeleteBannerController().handle)


router.get('/courses', new ListCoursesController().handle)
router.post('/course', upload.single("file"), new CreateCourseController().handle)
router.put('/course/:id', upload.single("file"), new EditCourseController().handle)
router.delete('/course/:id', new DeleteCourseController().handle)

router.get('/lesson/:id', new GetLessonController().handle)
router.get('/lessons/:course_id', new ListLessonsController().handle)
router.post('/lesson', upload.single("file"), new CreateLessonController().handle)
router.put('/lesson/:id', upload.single("file"), new EditLessonController().handle)
router.delete('/lesson/:id', new DeleteLessonController().handle)

router.get('/user/:id', new GetUserController().handle)
router.get('/collaborator/:id', new GetCollaboratorController().handle)
router.get('/orders/:type/:id', new ListAdminOrdersController().handle)

// Services

router.post('/service', new CreateServiceController().handle)
router.put('/service/:id', new EditServiceController().handle)
router.delete('/service/:id', new DeleteServiceController().handle)

// Contracts

router.get('/contracts', new ListContractsController().handle)
router.get('/contracts/:user_id', new AdminListContractsController().handle)
router.post('/contract', new CreateContractController().handle)
router.put('/signature-contract/:id', new SignatureContractController().handle)
router.put('/refusal-contract/:id', new RefusalContractController().handle)



export { router }