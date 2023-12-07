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
import { GetUserAdminController } from './controllers/Admin/Users/GetUserController'
import { GetCollaboratorAdminController } from './controllers/Admin/Collaborators/GetCollaboratorAdminController'
import { ListAdminOrdersController } from './controllers/Admin/ListAdminOrdersController'

import { ListBannersPublicController } from './controllers/Admin/Banners/ListBannersPublicController'
import { ListBannersController } from './controllers/Admin/Banners/ListBannersController'
import { CreateBannerController } from './controllers/Admin/Banners/CreateBannerController'
import { EditBannerController } from './controllers/Admin/Banners/EditBannerController'
import { DeleteBannerController } from './controllers/Admin/Banners/DeleteBannerController'

import uploadConfig from './config/multer'
import { ListCoursesController } from './controllers/Admin/Courses/ListCoursesController'
import { CreateCourseController } from './controllers/Admin/Courses/CreateCourseController'
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
import { PasswordForgotController } from './controllers/User/PasswordForgotController'
import { PasswordResetController } from './controllers/User/PasswordResetController'
import { PasswordVerifyResetController } from './controllers/User/PasswordVerifyResetController'
import { RecusedOrderController } from './controllers/Order/RecusedOrdersController'
import { ListCredentialsController } from './controllers/Credential/ListCredentialsController'
import { AdminListCredentialsController } from './controllers/Credential/AdminListOrdersController'
import { AdminCreateCredentialController } from './controllers/Credential/AdminCreateCredentialController'
import { AdminEditCredentialController } from './controllers/Credential/AdminEditCredentialController'
import { CreateCredentialController } from './controllers/Credential/CreateCredentialController'
import { GetCredentialController } from './controllers/Credential/GetCredentialController'
import { DeleteCredentialController } from './controllers/Credential/DeleteCredentialController'
import { EditCredentialController } from './controllers/Credential/EditCredentialController'
import { AuthCredentialController } from './controllers/Credential/AuthCredentialController'
import { PublicEditCredentialController } from './controllers/Credential/PublicEditCredentialController'
import { DeleteContractController } from './controllers/Contract/DeleteCredentialController'
import { GetCollaboratorController } from './controllers/Collaborator/GetCollaboratorController'
import { GetUserController } from './controllers/User/GetUserController'
import { ConfirmOrderController } from './controllers/Order/ConfirmOrderController'
import { HandlerOrderController } from './controllers/Order/HandlerOrderController'
import { GetCourseController } from './controllers/Admin/Courses/GetCourseControlle'
import { ListAdminOrdersPeriodoController } from './controllers/Admin/ListAdminOrdersPeriodoController'
import { ListUsersCollaboratorController } from './controllers/Admin/Collaborators/ListUsersCollaboratorController'
import { ServiceOSUserController } from './controllers/Admin/Users/ServiceOSUserController'
import { GetCompanyController } from './controllers/Company/GetCompanyController'
import { ListCompaniesController } from './controllers/Company/ListCompaniesController'
import { ListCompaniesConfirmController } from './controllers/Company/ListCompaniesConfirmController'
import { CreateCompanyController } from './controllers/Company/CreateCompanyController'
import { DeleteCompanyController } from './controllers/Company/DeleteCompanyController'
import { ConfirmCompanyController } from './controllers/Company/ConfirmCompanyController'
import { HandlerCompanyController } from './controllers/Company/HandlerCompanyController'
import { DeleteImageCompanyController } from './controllers/Company/DeleteImageCompanyController'
import { CreateImageCompanyController } from './controllers/Company/CreateImageCompanyController'
import { EditCompanyController } from './controllers/Company/EditCompanyController'
import { RecusedDocOrderController } from './controllers/Order/RecusedDocOrderController'


const upload = multer(uploadConfig)

const router = Router()

// Routes Publics

router.post('/user-session', new AuthUserController().handle)
router.post('/admin-session', new AuthAdminController().handle)
router.post('/collaborator-session', new AuthCollaboratorController().handle)
router.post('/credential-session', new AuthCredentialController().handle)
router.get('/services', new ListServicesController().handle)
router.get('/banners-public', new ListBannersPublicController().handle)
router.get('/contract/:id', new GetContractController().handle)
router.put('/signature-contract/:id', new SignatureContractController().handle)
router.put('/refusal-contract/:id', new RefusalContractController().handle)
router.post('/password-forgot', new PasswordForgotController().handle)
router.post('/password-reset/:code', new PasswordResetController().handle)
router.get('/password-verify-reset/:code', new PasswordVerifyResetController().handle)

router.get('/list-credentials', new ListCredentialsController().handle)
router.post('/credential', upload.single("file"), new CreateCredentialController().handle)
router.get('/credential/:id', new GetCredentialController().handle)
router.put('/completed/:id', upload.single("file"), new PublicEditCredentialController().handle)

router.get('/company/:company_id', new GetCompanyController().handle)
router.put('/company/:company_id', new ConfirmCompanyController().handle)

router.use(isAuthenticated)

// Credential

router.put('/credential', upload.single("file"), new EditCredentialController().handle)
router.delete('/credential/:id', new DeleteCredentialController().handle)
router.post('/admin/credential', upload.single("file"), new AdminCreateCredentialController().handle)
router.put('/admin/credential/:id', upload.single("file"), new AdminEditCredentialController().handle)

// Users and Colaborators

router.get('/course/:course_id', new GetCoursePublicController().handle)
router.get('/courses-user', new ListCoursesPublicController().handle)
router.put('/user', upload.single("file"), new EditUserController().handle)
router.put('/collaborator', upload.single("file"), new EditCollaboratorController().handle)

// Routes Clientes e Técnicos

router.put('/doc-recused-order/:order_id', new RecusedDocOrderController().handle)
router.get('/orders-open', new ListOpenOrdersController().handle)
router.get('/orders/:type', new ListOrdersController().handle)
router.get('/order/:id', new GetOrderController().handle)
router.put('/confirm-order/:id', new ConfirmOrderController().handle)
router.put('/alteracao-order', new HandlerOrderController().handle)
router.post('/order', new CreateOrderController().handle)
router.put('/accept-order/:id', new AcceptOrderController().handle)
router.put('/recused-order/:id', new RecusedOrderController().handle)
router.put('/status/:id', new StatusOrderController().handle)
router.put('/order-cancel/:id', new CancelOrderController().handle)
router.post('/doc/:id', upload.single("file"), new CreateDocOrderController().handle)
router.delete('/doc/:id', upload.single("file"), new DeleteDocOrderController().handle)

router.get('/user', new GetUserController().handle)
router.get('/collaborator', new GetCollaboratorController().handle)

// Routes Admin

router.post('/list-orders', new ListAdminOrdersPeriodoController().handle)
router.get('/admin/list-credentials', new AdminListCredentialsController().handle)
router.post('/credential', new AdminCreateCredentialController().handle)
router.put('/credential', new AdminEditCredentialController().handle)

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

router.get('/admin-course/:course_id', new GetCourseController().handle)
router.get('/courses', new ListCoursesController().handle)
router.post('/course', upload.single("file"), new CreateCourseController().handle)
router.put('/course/:id', upload.single("file"), new EditCourseController().handle)
router.delete('/course/:id', new DeleteCourseController().handle)

router.get('/lesson/:id', new GetLessonController().handle)
router.get('/lessons/:course_id', new ListLessonsController().handle)
router.post('/lesson', upload.single("file"), new CreateLessonController().handle)
router.put('/lesson/:id', upload.single("file"), new EditLessonController().handle)
router.delete('/lesson/:id', new DeleteLessonController().handle)

router.get('/user/:id', new GetUserAdminController().handle)
router.get('/users-collaborator/:collaborator_id', new ListUsersCollaboratorController().handle)
router.get('/collaborator/:id', new GetCollaboratorAdminController().handle)
router.get('/orders/:type/:id', new ListAdminOrdersController().handle)

// Services

router.post('/service', new CreateServiceController().handle)
router.put('/service/:id', new EditServiceController().handle)
router.delete('/service/:id', new DeleteServiceController().handle)

// Contracts

router.get('/contracts', new ListContractsController().handle)
router.get('/contracts/:user_id', new AdminListContractsController().handle)
router.post('/contract', new CreateContractController().handle)
router.delete('/contract/:id', new DeleteContractController().handle)

// Companies

router.get('/companies', new ListCompaniesController().handle)
router.get('/companies-confirm', new ListCompaniesConfirmController().handle)
router.post('/company', new CreateCompanyController().handle)
router.delete('/company/:company_id', new DeleteCompanyController().handle)
router.post('/company-image/:company_id', upload.single("file"), new CreateImageCompanyController().handle)
router.delete('/company-image/:id', new DeleteImageCompanyController().handle)
router.put('/company-handler/:company_id', new HandlerCompanyController().handle)
router.put('/company-edit/:company_id', new EditCompanyController().handle)

router.post('/service-os/:id', new ServiceOSUserController().handle)




export { router }