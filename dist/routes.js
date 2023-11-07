"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _AuthAdminController = require("./controllers/Admin/AuthAdminController");

var _AuthUserController = require("./controllers/User/AuthUserController");

var _CreateUserController = require("./controllers/Admin/Users/CreateUserController");

var _EditUserController = require("./controllers/User/EditUserController");

var _AuthCollaboratorController = require("./controllers/Collaborator/AuthCollaboratorController");

var _CreateCollaboratorController = require("./controllers/Admin/Collaborators/CreateCollaboratorController");

var _EditCollaboratorController = require("./controllers/Collaborator/EditCollaboratorController");

var _isAuthenticated = require("./middlewares/isAuthenticated");

var _CreateServiceController = require("./controllers/Service/CreateServiceController");

var _ListServicesController = require("./controllers/Service/ListServicesController");

var _EditServiceController = require("./controllers/Service/EditServiceController");

var _DeleteServiceController = require("./controllers/Service/DeleteServiceController");

var _CreateDocOrderController = require("./controllers/Order/CreateDocOrderController");

var _DeleteDocOrderController = require("./controllers/Order/DeleteDocOrderController");

var _ListOrdersController = require("./controllers/Order/ListOrdersController");

var _GetOrderController = require("./controllers/Order/GetOrderController");

var _CancelOrderController = require("./controllers/Order/CancelOrderController");

var _CreateOrderController = require("./controllers/Order/CreateOrderController");

var _AcceptOrdersController = require("./controllers/Order/AcceptOrdersController");

var _StatusOrdersController = require("./controllers/Order/StatusOrdersController");

var _ListOpenOrdersController = require("./controllers/Order/ListOpenOrdersController");

var _EditAdminUserController = require("./controllers/Admin/Users/EditAdminUserController");

var _EditAdminCollaboratorController = require("./controllers/Admin/Collaborators/EditAdminCollaboratorController");

var _ListUsersController = require("./controllers/Admin/Users/ListUsersController");

var _ListCollaboratorsController = require("./controllers/Admin/Collaborators/ListCollaboratorsController");

var _DeleteUserController = require("./controllers/Admin/Users/DeleteUserController");

var _DeleteCollaboratorController = require("./controllers/Admin/Collaborators/DeleteCollaboratorController");

var _GetUserController = require("./controllers/Admin/Users/GetUserController");

var _GetCollaboratorAdminController = require("./controllers/Admin/Collaborators/GetCollaboratorAdminController");

var _ListAdminOrdersController = require("./controllers/Admin/ListAdminOrdersController");

var _ListBannersPublicController = require("./controllers/Admin/Banners/ListBannersPublicController");

var _ListBannersController = require("./controllers/Admin/Banners/ListBannersController");

var _CreateBannerController = require("./controllers/Admin/Banners/CreateBannerController");

var _EditBannerController = require("./controllers/Admin/Banners/EditBannerController");

var _DeleteBannerController = require("./controllers/Admin/Banners/DeleteBannerController");

var _multer2 = _interopRequireDefault(require("./config/multer"));

var _ListCoursesController = require("./controllers/Admin/Courses/ListCoursesController");

var _CreateCourseController = require("./controllers/Admin/Courses/CreateCourseController");

var _EditCourseController = require("./controllers/Admin/Courses/EditCourseController");

var _DeleteCourseController = require("./controllers/Admin/Courses/DeleteCourseController");

var _ListLessonsController = require("./controllers/Admin/Lessons/ListLessonsController");

var _CreateLessonController = require("./controllers/Admin/Lessons/CreateLessonController");

var _EditLessonController = require("./controllers/Admin/Lessons/EditLessonController");

var _DeleteLessonController = require("./controllers/Admin/Lessons/DeleteLessonController");

var _ListCoursesPublicController = require("./controllers/Admin/Courses/ListCoursesPublicController");

var _GetLessonController = require("./controllers/Admin/Lessons/GetLessonController");

var _GetCoursePublicController = require("./controllers/Admin/Courses/GetCoursePublicController");

var _GetContractController = require("./controllers/Contract/GetContractController");

var _ListContractsController = require("./controllers/Contract/ListContractsController");

var _AdminListContractController = require("./controllers/Contract/AdminListContractController");

var _CreateContractController = require("./controllers/Contract/CreateContractController");

var _SignatureContractController = require("./controllers/Contract/SignatureContractController");

var _RefusalContractController = require("./controllers/Contract/RefusalContractController");

var _PasswordForgotController = require("./controllers/User/PasswordForgotController");

var _PasswordResetController = require("./controllers/User/PasswordResetController");

var _PasswordVerifyResetController = require("./controllers/User/PasswordVerifyResetController");

var _RecusedOrdersController = require("./controllers/Order/RecusedOrdersController");

var _ListCredentialsController = require("./controllers/Credential/ListCredentialsController");

var _AdminListOrdersController = require("./controllers/Credential/AdminListOrdersController");

var _AdminCreateCredentialController = require("./controllers/Credential/AdminCreateCredentialController");

var _AdminEditCredentialController = require("./controllers/Credential/AdminEditCredentialController");

var _CreateCredentialController = require("./controllers/Credential/CreateCredentialController");

var _GetCredentialController = require("./controllers/Credential/GetCredentialController");

var _DeleteCredentialController = require("./controllers/Credential/DeleteCredentialController");

var _EditCredentialController = require("./controllers/Credential/EditCredentialController");

var _AuthCredentialController = require("./controllers/Credential/AuthCredentialController");

var _PublicEditCredentialController = require("./controllers/Credential/PublicEditCredentialController");

var _DeleteCredentialController2 = require("./controllers/Contract/DeleteCredentialController");

var _GetCollaboratorController = require("./controllers/Collaborator/GetCollaboratorController");

var _GetUserController2 = require("./controllers/User/GetUserController");

var _ConfirmOrderController = require("./controllers/Order/ConfirmOrderController");

var _HandlerOrderController = require("./controllers/Order/HandlerOrderController");

var _GetCourseControlle = require("./controllers/Admin/Courses/GetCourseControlle");

var _ListAdminOrdersPeriodoController = require("./controllers/Admin/ListAdminOrdersPeriodoController");

var _ListUsersCollaboratorController = require("./controllers/Admin/Collaborators/ListUsersCollaboratorController");

var _ServiceOSUserController = require("./controllers/Admin/Users/ServiceOSUserController");

var _GetCompanyController = require("./controllers/Company/GetCompanyController");

var _ListCompaniesController = require("./controllers/Company/ListCompaniesController");

var _ListCompaniesConfirmController = require("./controllers/Company/ListCompaniesConfirmController");

var _CreateCompanyController = require("./controllers/Company/CreateCompanyController");

var _DeleteCompanyController = require("./controllers/Company/DeleteCompanyController");

var _ConfirmCompanyController = require("./controllers/Company/ConfirmCompanyController");

var _HandlerCompanyController = require("./controllers/Company/HandlerCompanyController");

var _DeleteImageCompanyController = require("./controllers/Company/DeleteImageCompanyController");

var _CreateImageCompanyController = require("./controllers/Company/CreateImageCompanyController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_multer2.default);
const router = (0, _express.Router)(); // Routes Publics

exports.router = router;
router.post('/user-session', new _AuthUserController.AuthUserController().handle);
router.post('/admin-session', new _AuthAdminController.AuthAdminController().handle);
router.post('/collaborator-session', new _AuthCollaboratorController.AuthCollaboratorController().handle);
router.post('/credential-session', new _AuthCredentialController.AuthCredentialController().handle);
router.get('/services', new _ListServicesController.ListServicesController().handle);
router.get('/banners-public', new _ListBannersPublicController.ListBannersPublicController().handle);
router.get('/contract/:id', new _GetContractController.GetContractController().handle);
router.put('/signature-contract/:id', new _SignatureContractController.SignatureContractController().handle);
router.put('/refusal-contract/:id', new _RefusalContractController.RefusalContractController().handle);
router.post('/password-forgot', new _PasswordForgotController.PasswordForgotController().handle);
router.post('/password-reset/:code', new _PasswordResetController.PasswordResetController().handle);
router.get('/password-verify-reset/:code', new _PasswordVerifyResetController.PasswordVerifyResetController().handle);
router.get('/list-credentials', new _ListCredentialsController.ListCredentialsController().handle);
router.post('/credential', upload.single("file"), new _CreateCredentialController.CreateCredentialController().handle);
router.get('/credential/:id', new _GetCredentialController.GetCredentialController().handle);
router.put('/completed/:id', upload.single("file"), new _PublicEditCredentialController.PublicEditCredentialController().handle);
router.get('/company/:company_id', new _GetCompanyController.GetCompanyController().handle);
router.put('/company/:company_id', new _ConfirmCompanyController.ConfirmCompanyController().handle);
router.use(_isAuthenticated.isAuthenticated); // Credential

router.put('/credential', upload.single("file"), new _EditCredentialController.EditCredentialController().handle);
router.delete('/credential/:id', new _DeleteCredentialController.DeleteCredentialController().handle);
router.post('/admin/credential', upload.single("file"), new _AdminCreateCredentialController.AdminCreateCredentialController().handle);
router.put('/admin/credential/:id', upload.single("file"), new _AdminEditCredentialController.AdminEditCredentialController().handle); // Users and Colaborators

router.get('/course/:course_id', new _GetCoursePublicController.GetCoursePublicController().handle);
router.get('/courses-user', new _ListCoursesPublicController.ListCoursesPublicController().handle);
router.put('/user', upload.single("file"), new _EditUserController.EditUserController().handle);
router.put('/collaborator', upload.single("file"), new _EditCollaboratorController.EditCollaboratorController().handle); // Routes Clientes e Técnicos

router.get('/orders-open', new _ListOpenOrdersController.ListOpenOrdersController().handle);
router.get('/orders/:type', new _ListOrdersController.ListOrdersController().handle);
router.get('/order/:id', new _GetOrderController.GetOrderController().handle);
router.put('/confirm-order/:id', new _ConfirmOrderController.ConfirmOrderController().handle);
router.put('/alteracao-order', new _HandlerOrderController.HandlerOrderController().handle);
router.post('/order', new _CreateOrderController.CreateOrderController().handle);
router.put('/accept-order/:id', new _AcceptOrdersController.AcceptOrderController().handle);
router.put('/recused-order/:id', new _RecusedOrdersController.RecusedOrderController().handle);
router.put('/status/:id', new _StatusOrdersController.StatusOrderController().handle);
router.put('/order-cancel/:id', new _CancelOrderController.CancelOrderController().handle);
router.post('/doc/:id', upload.single("file"), new _CreateDocOrderController.CreateDocOrderController().handle);
router.delete('/doc/:id', upload.single("file"), new _DeleteDocOrderController.DeleteDocOrderController().handle);
router.get('/user', new _GetUserController2.GetUserController().handle);
router.get('/collaborator', new _GetCollaboratorController.GetCollaboratorController().handle); // Routes Admin

router.post('/list-orders', new _ListAdminOrdersPeriodoController.ListAdminOrdersPeriodoController().handle);
router.get('/admin/list-credentials', new _AdminListOrdersController.AdminListCredentialsController().handle);
router.post('/credential', new _AdminCreateCredentialController.AdminCreateCredentialController().handle);
router.put('/credential', new _AdminEditCredentialController.AdminEditCredentialController().handle);
router.get('/users', new _ListUsersController.ListUsersController().handle);
router.post('/user', upload.single("file"), new _CreateUserController.CreateUserController().handle);
router.put('/user/:id', upload.single("file"), new _EditAdminUserController.EditAdminUserController().handle);
router.delete('/user/:id', new _DeleteUserController.DeleteUserController().handle);
router.get('/collaborators', new _ListCollaboratorsController.ListCollaboratorsController().handle);
router.post('/collaborator', upload.single("file"), new _CreateCollaboratorController.CreateCollaboratorController().handle);
router.put('/collaborator/:id', upload.single("file"), new _EditAdminCollaboratorController.EditAdminCollaboratorController().handle);
router.delete('/collaborator/:id', new _DeleteCollaboratorController.DeleteCollaboratorController().handle);
router.get('/banners', new _ListBannersController.ListBannersController().handle);
router.post('/banner', upload.single("file"), new _CreateBannerController.CreateBannerController().handle);
router.put('/banner/:id', upload.single("file"), new _EditBannerController.EditBannerController().handle);
router.delete('/banner/:id', new _DeleteBannerController.DeleteBannerController().handle);
router.get('/admin-course/:course_id', new _GetCourseControlle.GetCourseController().handle);
router.get('/courses', new _ListCoursesController.ListCoursesController().handle);
router.post('/course', upload.single("file"), new _CreateCourseController.CreateCourseController().handle);
router.put('/course/:id', upload.single("file"), new _EditCourseController.EditCourseController().handle);
router.delete('/course/:id', new _DeleteCourseController.DeleteCourseController().handle);
router.get('/lesson/:id', new _GetLessonController.GetLessonController().handle);
router.get('/lessons/:course_id', new _ListLessonsController.ListLessonsController().handle);
router.post('/lesson', upload.single("file"), new _CreateLessonController.CreateLessonController().handle);
router.put('/lesson/:id', upload.single("file"), new _EditLessonController.EditLessonController().handle);
router.delete('/lesson/:id', new _DeleteLessonController.DeleteLessonController().handle);
router.get('/user/:id', new _GetUserController.GetUserAdminController().handle);
router.get('/users-collaborator/:collaborator_id', new _ListUsersCollaboratorController.ListUsersCollaboratorController().handle);
router.get('/collaborator/:id', new _GetCollaboratorAdminController.GetCollaboratorAdminController().handle);
router.get('/orders/:type/:id', new _ListAdminOrdersController.ListAdminOrdersController().handle); // Services

router.post('/service', new _CreateServiceController.CreateServiceController().handle);
router.put('/service/:id', new _EditServiceController.EditServiceController().handle);
router.delete('/service/:id', new _DeleteServiceController.DeleteServiceController().handle); // Contracts

router.get('/contracts', new _ListContractsController.ListContractsController().handle);
router.get('/contracts/:user_id', new _AdminListContractController.AdminListContractsController().handle);
router.post('/contract', new _CreateContractController.CreateContractController().handle);
router.delete('/contract/:id', new _DeleteCredentialController2.DeleteContractController().handle); // Companies

router.get('/companies', new _ListCompaniesController.ListCompaniesController().handle);
router.get('/companies-confirm', new _ListCompaniesConfirmController.ListCompaniesConfirmController().handle);
router.post('/company', new _CreateCompanyController.CreateCompanyController().handle);
router.delete('/company/:company_id', new _DeleteCompanyController.DeleteCompanyController().handle);
router.post('/company-image/:company_id', upload.single("file"), new _CreateImageCompanyController.CreateImageCompanyController().handle);
router.delete('/company-image/:id', new _DeleteImageCompanyController.DeleteImageCompanyController().handle);
router.put('/company-handler/:company_id', new _HandlerCompanyController.HandlerCompanyController().handle);
router.post('/service-os/:id', new _ServiceOSUserController.ServiceOSUserController().handle);