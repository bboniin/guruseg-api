"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _multer2 = _interopRequireDefault(require("./config/multer"));
var _isAuthenticated = require("./middlewares/isAuthenticated");
var _isAdmin = require("./middlewares/isAdmin");
var _AuthUserController = require("./controllers/User/AuthUserController");
var _AuthCredentialController = require("./controllers/Credential/AuthCredentialController");
var _PasswordForgotController = require("./controllers/User/PasswordForgotController");
var _PasswordResetController = require("./controllers/User/PasswordResetController");
var _PasswordVerifyResetController = require("./controllers/User/PasswordVerifyResetController");
var _GetRisksController = require("./controllers/IA/GetRisksController");
var _GetRisksImagesController = require("./controllers/IA/GetRisksImagesController");
var _GetFunctionController = require("./controllers/IA/GetFunctionController");
var _GetRiskDetailsController = require("./controllers/IA/GetRiskDetailsController");
var _GetAssistentController = require("./controllers/IA/GetAssistentController");
var _GetUserController = require("./controllers/User/GetUserController");
var _EditUserController = require("./controllers/User/EditUserController");
var _CreateUserController = require("./controllers/Admin/Users/CreateUserController");
var _EditAdminUserController = require("./controllers/Admin/Users/EditAdminUserController");
var _ListUsersController = require("./controllers/Admin/Users/ListUsersController");
var _DeleteUserController = require("./controllers/Admin/Users/DeleteUserController");
var _GetUserController2 = require("./controllers/Admin/Users/GetUserController");
var _RankingUsersController = require("./controllers/Admin/Users/RankingUsersController");
var _ServiceOSUserController = require("./controllers/Admin/Users/ServiceOSUserController");
var _ListUsersCollaboratorController = require("./controllers/Admin/Collaborators/ListUsersCollaboratorController");
var _CreateUserMatrizController = require("./controllers/Admin/UserMatriz/CreateUserMatrizController");
var _EditAdminUserMatrizController = require("./controllers/Admin/UserMatriz/EditAdminUserMatrizController");
var _ListUsersMatrizController = require("./controllers/Admin/UserMatriz/ListUsersMatrizController");
var _DeleteUserMatrizController = require("./controllers/Admin/UserMatriz/DeleteUserMatrizController");
var _GetUserMatrizController = require("./controllers/Admin/UserMatriz/GetUserMatrizController");
var _RankingUsersMatrizController = require("./controllers/Admin/UserMatriz/RankingUsersMatrizController");
var _ServiceOSUserMatrizController = require("./controllers/Admin/UserMatriz/ServiceOSUserMatrizController");
var _GetCollaboratorController = require("./controllers/Collaborator/GetCollaboratorController");
var _EditCollaboratorController = require("./controllers/Collaborator/EditCollaboratorController");
var _CreateCollaboratorController = require("./controllers/Admin/Collaborators/CreateCollaboratorController");
var _EditAdminCollaboratorController = require("./controllers/Admin/Collaborators/EditAdminCollaboratorController");
var _ListCollaboratorsController = require("./controllers/Admin/Collaborators/ListCollaboratorsController");
var _DeleteCollaboratorController = require("./controllers/Admin/Collaborators/DeleteCollaboratorController");
var _GetCollaboratorAdminController = require("./controllers/Admin/Collaborators/GetCollaboratorAdminController");
var _ListAdminsController = require("./controllers/Admin/Admins/ListAdminsController");
var _CreateAdminController = require("./controllers/Admin/Admins/CreateAdminController");
var _EditAdminController = require("./controllers/Admin/Admins/EditAdminController");
var _DeleteAdminController = require("./controllers/Admin/Admins/DeleteAdminController");
var _ListAttendantsController = require("./controllers/Admin/Attendants/ListAttendantsController");
var _CreateAttendantController = require("./controllers/Admin/Attendants/CreateAttendantController");
var _EditAttendantController = require("./controllers/Admin/Attendants/EditAttendantController");
var _DeleteAttendantController = require("./controllers/Admin/Attendants/DeleteAttendantController");
var _CreateAssociateWebController = require("./controllers/Admin/Associates/CreateAssociateWebController");
var _GetAssociateController = require("./controllers/Associate/GetAssociateController");
var _EditAssociateController = require("./controllers/Associate/EditAssociateController");
var _ResumeAssociateController = require("./controllers/Associate/ResumeAssociateController");
var _ListAssociateLeadsController = require("./controllers/Associate/ListAssociateLeadsController");
var _ListAssociateComissionsController = require("./controllers/Associate/ListAssociateComissionsController");
var _ListAssociatesController = require("./controllers/Admin/Associates/ListAssociatesController");
var _CreateAssociateController = require("./controllers/Admin/Associates/CreateAssociateController");
var _EditAdminAssociateController = require("./controllers/Admin/Associates/EditAdminAssociateController");
var _GetAdminAssociateController = require("./controllers/Admin/Associates/GetAdminAssociateController");
var _DeleteAssociateController = require("./controllers/Admin/Associates/DeleteAssociateController");
var _ListAdminAssociateLeadsController = require("./controllers/Admin/Associates/ListAdminAssociateLeadsController");
var _ResumeAdminAssociateController = require("./controllers/Admin/Associates/ResumeAdminAssociateController");
var _ListAdminAssociatePaymentsComissionController = require("./controllers/Admin/Associates/ListAdminAssociatePaymentsComissionController");
var _CreatePaymentComissionAssociateController = require("./controllers/Admin/Associates/CreatePaymentComissionAssociateController");
var _CreateEnterpriseController = require("./controllers/Enterprise/CreateEnterpriseController");
var _CreateEnterpriseAdminController = require("./controllers/Enterprise/CreateEnterpriseAdminController");
var _ListEnterpriseController = require("./controllers/Enterprise/ListEnterpriseController");
var _ListEnterpriseAdminController = require("./controllers/Enterprise/ListEnterpriseAdminController");
var _EditEnterpriseController = require("./controllers/Enterprise/EditEnterpriseController");
var _EditEnterpriseAdminController = require("./controllers/Enterprise/EditEnterpriseAdminController");
var _DeleteEnterpriseAdminController = require("./controllers/Enterprise/DeleteEnterpriseAdminController");
var _CreateServiceController = require("./controllers/Service/CreateServiceController");
var _EditServiceController = require("./controllers/Service/EditServiceController");
var _DeleteServiceController = require("./controllers/Service/DeleteServiceController");
var _ListServicesAdminController = require("./controllers/Service/ListServicesAdminController");
var _ListServicesClientController = require("./controllers/Service/ListServicesClientController");
var _CreateOrderController = require("./controllers/Order/CreateOrderController");
var _ListOrdersController = require("./controllers/Order/ListOrdersController");
var _GetOrderController = require("./controllers/Order/GetOrderController");
var _EditOrderController = require("./controllers/Order/EditOrderController");
var _CancelOrderController = require("./controllers/Order/CancelOrderController");
var _AcceptOrdersController = require("./controllers/Order/AcceptOrdersController");
var _RecusedOrdersController = require("./controllers/Order/RecusedOrdersController");
var _StatusOrdersController = require("./controllers/Order/StatusOrdersController");
var _ListOpenOrdersController = require("./controllers/Order/ListOpenOrdersController");
var _CreateDocOrderController = require("./controllers/Order/CreateDocOrderController");
var _DeleteDocOrderController = require("./controllers/Order/DeleteDocOrderController");
var _RecusedDocOrderController = require("./controllers/Order/RecusedDocOrderController");
var _EditCollaboratorOrderController = require("./controllers/Order/EditCollaboratorOrderController");
var _ListAdminOrdersController = require("./controllers/Admin/ListAdminOrdersController");
var _ListAdminOrdersPeriodoController = require("./controllers/Admin/ListAdminOrdersPeriodoController");
var _GetCompanyController = require("./controllers/Company/GetCompanyController");
var _ListCompaniesController = require("./controllers/Company/ListCompaniesController");
var _ListCompaniesConfirmController = require("./controllers/Company/ListCompaniesConfirmController");
var _CreateCompanyController = require("./controllers/Company/CreateCompanyController");
var _EditCompanyController = require("./controllers/Company/EditCompanyController");
var _DeleteCompanyController = require("./controllers/Company/DeleteCompanyController");
var _ConfirmCompanyController = require("./controllers/Company/ConfirmCompanyController");
var _HandlerCompanyController = require("./controllers/Company/HandlerCompanyController");
var _CreateImageCompanyController = require("./controllers/Company/CreateImageCompanyController");
var _DeleteImageCompanyController = require("./controllers/Company/DeleteImageCompanyController");
var _SggCompanyController = require("./controllers/Company/SggCompanyController");
var _SggSectorController = require("./controllers/Company/SggSectorController");
var _EditRiskCompanyController = require("./controllers/Company/EditRiskCompanyController");
var _DeleteEmployeController = require("./controllers/Company/DeleteEmployeController");
var _CreatePreliminaryCompanyController = require("./controllers/PreliminaryCompany/CreatePreliminaryCompanyController");
var _ListPreliminaryCompaniesController = require("./controllers/PreliminaryCompany/ListPreliminaryCompaniesController");
var _GetPreliminaryCompanyController = require("./controllers/PreliminaryCompany/GetPreliminaryCompanyController");
var _EditPreliminaryCompanyController = require("./controllers/PreliminaryCompany/EditPreliminaryCompanyController");
var _DeletePreliminaryCompanyController = require("./controllers/PreliminaryCompany/DeletePreliminaryCompanyController");
var _ConvertPreliminaryToSurveyController = require("./controllers/PreliminaryCompany/ConvertPreliminaryToSurveyController");
var _CreateSSTDiagnosticController = require("./controllers/SSTDiagnostic/CreateSSTDiagnosticController");
var _ListSSTDiagnosticsController = require("./controllers/SSTDiagnostic/ListSSTDiagnosticsController");
var _GetSSTDiagnosticController = require("./controllers/SSTDiagnostic/GetSSTDiagnosticController");
var _DeleteSSTDiagnosticController = require("./controllers/SSTDiagnostic/DeleteSSTDiagnosticController");
var _CreateRenewalController = require("./controllers/CompanyRenewal/CreateRenewalController");
var _ListRenewalsController = require("./controllers/CompanyRenewal/ListRenewalsController");
var _EditRenewalController = require("./controllers/CompanyRenewal/EditRenewalController");
var _DeleteRenewalController = require("./controllers/CompanyRenewal/DeleteRenewalController");
var _DeleteAllRenewalController = require("./controllers/CompanyRenewal/DeleteAllRenewalController");
var _EditAllRenewalsController = require("./controllers/CompanyRenewal/EditAllRenewalsController");
var _CheckRenewalController = require("./controllers/CompanyRenewal/CheckRenewalController");
var _CreateTimelineController = require("./controllers/CompanyTimeline/CreateTimelineController");
var _ListTimelinesController = require("./controllers/CompanyTimeline/ListTimelinesController");
var _EditTimelineController = require("./controllers/CompanyTimeline/EditTimelineController");
var _DeleteTimelineController = require("./controllers/CompanyTimeline/DeleteTimelineController");
var _CheckTimelineController = require("./controllers/CompanyTimeline/CheckTimelineController");
var _GetTimelineController = require("./controllers/CompanyTimeline/GetTimelineController");
var _IntegrationCompanyController = require("./controllers/SGG/IntegrationCompanyController");
var _IntegrationSectorController = require("./controllers/SGG/IntegrationSectorController");
var _IntegrationJobController = require("./controllers/SGG/IntegrationJobController");
var _IntegrationRisksController = require("./controllers/SGG/IntegrationRisksController");
var _CreateLeadController = require("./controllers/Lead/CreateLeadController");
var _CreateLeadWebController = require("./controllers/Lead/CreateLeadWebController");
var _CreateLeadMasterController = require("./controllers/Lead/CreateLeadMasterController");
var _EditLeadController = require("./controllers/Lead/EditLeadController");
var _EditLeadMasterController = require("./controllers/Lead/EditLeadMasterController");
var _GetLeadController = require("./controllers/Lead/GetLeadController");
var _GetLeadMasterController = require("./controllers/Lead/GetLeadMasterController");
var _ListLeadsClientController = require("./controllers/Lead/ListLeadsClientController");
var _ListLeadsBuyController = require("./controllers/Lead/ListLeadsBuyController");
var _ListLeadsSendController = require("./controllers/Lead/ListLeadsSendController");
var _ListMyLeadsController = require("./controllers/Lead/ListMyLeadsController");
var _ListLeadsAdminController = require("./controllers/Lead/ListLeadsAdminController");
var _ListAdminLeadsClientController = require("./controllers/Lead/ListAdminLeadsClientController");
var _StatusLeadController = require("./controllers/Lead/StatusLeadController");
var _ResetLeadController = require("./controllers/Lead/ResetLeadController");
var _SendLeadController = require("./controllers/Lead/SendLeadController");
var _BuyLeadController = require("./controllers/Lead/BuyLeadController");
var _DeleteLeadController = require("./controllers/Lead/DeleteLeadController");
var _DeleteLeadMasterController = require("./controllers/Lead/DeleteLeadMasterController");
var _DeleteManyLeadsMasterController = require("./controllers/Lead/DeleteManyLeadsMasterController");
var _CreateLeadMatrizController = require("./controllers/LeadMatriz/CreateLeadMatrizController");
var _ListLeadMatrizController = require("./controllers/LeadMatriz/ListLeadMatrizController");
var _EditLeadMatrizController = require("./controllers/LeadMatriz/EditLeadMatrizController");
var _MoveLeadMatrizController = require("./controllers/LeadMatriz/MoveLeadMatrizController");
var _DeleteLeadMatrizController = require("./controllers/LeadMatriz/DeleteLeadMatrizController");
var _GetContractController = require("./controllers/Contract/GetContractController");
var _ListContractsController = require("./controllers/Contract/ListContractsController");
var _AdminListContractController = require("./controllers/Contract/AdminListContractController");
var _CreateContractController = require("./controllers/Contract/CreateContractController");
var _EditContractController = require("./controllers/Contract/EditContractController");
var _SignatureContractController = require("./controllers/Contract/SignatureContractController");
var _RefusalContractController = require("./controllers/Contract/RefusalContractController");
var _NegotiationContractController = require("./controllers/Contract/NegotiationContractController");
var _EndNegotiationContractController = require("./controllers/Contract/EndNegotiationContractController");
var _DeleteCredentialController = require("./controllers/Contract/DeleteCredentialController");
var _CreateReminderController = require("./controllers/Reminder/CreateReminderController");
var _ListRemindersController = require("./controllers/Reminder/ListRemindersController");
var _EditReminderController = require("./controllers/Reminder/EditReminderController");
var _DeleteReminderController = require("./controllers/Reminder/DeleteReminderController");
var _ConfirmReminderController = require("./controllers/Reminder/ConfirmReminderController");
var _CreateStatementController = require("./controllers/Statement/CreateStatementController");
var _ListStatementsController = require("./controllers/Statement/ListStatementsController");
var _ListStatementsUserController = require("./controllers/Statement/ListStatementsUserController");
var _LastStatementsUserController = require("./controllers/Statement/LastStatementsUserController");
var _GetStatementController = require("./controllers/Statement/GetStatementController");
var _EditStatementController = require("./controllers/Statement/EditStatementController");
var _DeleteStatementController = require("./controllers/Statement/DeleteStatementController");
var _ConfirmStatementController = require("./controllers/Statement/ConfirmStatementController");
var _ConfirmPaymentController = require("./controllers/Payment/ConfirmPaymentController");
var _ListPaymentsController = require("./controllers/Payment/ListPaymentsController");
var _ListAdminPaymentsController = require("./controllers/Payment/ListAdminPaymentsController");
var _GetPaymentController = require("./controllers/Payment/GetPaymentController");
var _GetPaymentUserController = require("./controllers/Payment/GetPaymentUserController");
var _CreateCustomerController = require("./controllers/Payment/CreateCustomerController");
var _CreateCouponController = require("./controllers/Coupon/CreateCouponController");
var _ListCouponsController = require("./controllers/Coupon/ListCouponsController");
var _EditCouponController = require("./controllers/Coupon/EditCouponController");
var _DeleteCouponController = require("./controllers/Coupon/DeleteCouponController");
var _GetCouponController = require("./controllers/Coupon/GetCouponController");
var _CreateDepositController = require("./controllers/Deposit/CreateDepositController");
var _GetDepositsController = require("./controllers/Deposit/GetDepositsController");
var _ListDepositsController = require("./controllers/Deposit/ListDepositsController");
var _CreateDepositAdminController = require("./controllers/Deposit/CreateDepositAdminController");
var _ListDepositsAdminController = require("./controllers/Deposit/ListDepositsAdminController");
var _CreatePackageController = require("./controllers/Deposit/CreatePackageController");
var _ListPackagesController = require("./controllers/Deposit/ListPackagesController");
var _EditPackageController = require("./controllers/Deposit/EditPackageController");
var _DeletePackageController = require("./controllers/Deposit/DeletePackageController");
var _ListCoursesController = require("./controllers/Admin/Courses/ListCoursesController");
var _ListCoursesPublicController = require("./controllers/Admin/Courses/ListCoursesPublicController");
var _CreateCourseController = require("./controllers/Admin/Courses/CreateCourseController");
var _EditCourseController = require("./controllers/Admin/Courses/EditCourseController");
var _DeleteCourseController = require("./controllers/Admin/Courses/DeleteCourseController");
var _GetCourseControlle = require("./controllers/Admin/Courses/GetCourseControlle");
var _GetCoursePublicController = require("./controllers/Admin/Courses/GetCoursePublicController");
var _CreateModuleController = require("./controllers/Admin/Courses/CreateModuleController");
var _EditModuleController = require("./controllers/Admin/Courses/EditModuleController");
var _DeleteModuleController = require("./controllers/Admin/Courses/DeleteModuleController");
var _ListLessonsController = require("./controllers/Admin/Lessons/ListLessonsController");
var _CreateLessonController = require("./controllers/Admin/Lessons/CreateLessonController");
var _EditLessonController = require("./controllers/Admin/Lessons/EditLessonController");
var _DeleteLessonController = require("./controllers/Admin/Lessons/DeleteLessonController");
var _GetLessonController = require("./controllers/Admin/Lessons/GetLessonController");
var _ConfirmLessonController = require("./controllers/Admin/Lessons/ConfirmLessonController");
var _ListBannersPublicController = require("./controllers/Admin/Banners/ListBannersPublicController");
var _ListBannersController = require("./controllers/Admin/Banners/ListBannersController");
var _CreateBannerController = require("./controllers/Admin/Banners/CreateBannerController");
var _EditBannerController = require("./controllers/Admin/Banners/EditBannerController");
var _DeleteBannerController = require("./controllers/Admin/Banners/DeleteBannerController");
var _ListCredentialsController = require("./controllers/Credential/ListCredentialsController");
var _CreateCredentialController = require("./controllers/Credential/CreateCredentialController");
var _GetCredentialController = require("./controllers/Credential/GetCredentialController");
var _EditCredentialController = require("./controllers/Credential/EditCredentialController");
var _DeleteCredentialController2 = require("./controllers/Credential/DeleteCredentialController");
var _PublicEditCredentialController = require("./controllers/Credential/PublicEditCredentialController");
var _AdminListOrdersController = require("./controllers/Credential/AdminListOrdersController");
var _AdminCreateCredentialController = require("./controllers/Credential/AdminCreateCredentialController");
var _AdminEditCredentialController = require("./controllers/Credential/AdminEditCredentialController");
var _CreateTicketController = require("./controllers/Tickets/CreateTicketController");
var _OpenTicketController = require("./controllers/Tickets/OpenTicketController");
var _GetTicketController = require("./controllers/Tickets/GetTicketController");
var _ListTicketsController = require("./controllers/Tickets/ListTicketsController");
var _ListAttendantTicketsController = require("./controllers/Tickets/ListAttendantTicketsController");
var _ListAdminTicketsController = require("./controllers/Tickets/ListAdminTicketsController");
var _SendMessageTicketController = require("./controllers/Tickets/SendMessageTicketController");
var _ListTicketsOpenController = require("./controllers/Tickets/ListTicketsOpenController");
var _GetAdminResumeController = require("./controllers/Resume/GetAdminResumeController");
var _GetUserResumeController = require("./controllers/Resume/GetUserResumeController");
var _GetCollaboratorResumeController = require("./controllers/Resume/GetCollaboratorResumeController");
var _ListEsocialController = require("./controllers/Enterprise/ListEsocialController");
var _ListEsocialAdminController = require("./controllers/Enterprise/ListEsocialAdminController");
var _ListAssociatesClientController = require("./controllers/Associate/ListAssociatesClientController");
var _ListEnterpriseTecnicoController = require("./controllers/Enterprise/ListEnterpriseTecnicoController");
var _EditEnterpriseTecnicoController = require("./controllers/Enterprise/EditEnterpriseTecnicoController");
var _CreateEnterpriseTecnicoController = require("./controllers/Enterprise/CreateEnterpriseTecnicoController");
var _DeleteEnterpriseTecnicoController = require("./controllers/Enterprise/DeleteEnterpriseTecnicoController");
var _AddUrgentOrderController = require("./controllers/Order/AddUrgentOrderController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Middlewares

// Auth & Password Controllers

// IA Controllers

// User Controllers

// User Matriz Controllers

// Collaborator Controllers

// Admin Management Controllers

// Attendant Controllers

// Associate Controllers

// Enterprise Controllers

// Service Controllers

// Order Controllers

// Company & SGG Controllers

// Preliminary Company Controllers

// SST Diagnostic Controllers

// Company Renewal & Timeline Controllers

// SGG Integration Controllers

// Lead (CRM) Controllers

// Lead Matriz Controllers

// Contract Controllers

// Reminder Controllers

// Statement Controllers

// Payment & Coupon & Deposit Controllers

// Course, Module & Lesson Controllers

// Banner Controllers

// Credential Controllers

// Ticket Controllers

// Resume Controllers

const upload = (0, _multer.default)(_multer2.default);
const router = exports.router = (0, _express.Router)();

/* ==========================================================================
   1. ROTAS PÚBLICAS (Sem necessidade de autenticação prévia)
   ========================================================================== */

// Autenticação & Recuperação de Senha
router.post("/session", new _AuthUserController.AuthUserController().handle);
router.post("/credential-session", new _AuthCredentialController.AuthCredentialController().handle);
router.post("/password-forgot", new _PasswordForgotController.PasswordForgotController().handle);
router.post("/password-reset/:code", new _PasswordResetController.PasswordResetController().handle);
router.get("/password-verify-reset/:code", new _PasswordVerifyResetController.PasswordVerifyResetController().handle);

// Webhooks
router.post("/asaas/webhook", new _ConfirmPaymentController.ConfirmPaymentController().handle);

// Inteligência Artificial (IA)
router.get("/ia/risks", new _GetRisksController.GetRisksController().handle);
router.get("/ia/risks/images", new _GetRisksImagesController.GetRisksImagesController().handle);
router.get("/ia/occupation", new _GetFunctionController.GetOccupationalController().handle);
router.get("/ia/risk", new _GetRiskDetailsController.GetRiskDetailsController().handle);
router.get("/ia/assistent", new _GetAssistentController.GetAssistentController().handle);

// Captura de Leads e Associados Públicos (Formulários Web)
router.post("/lead/web", new _CreateLeadWebController.CreateLeadWebController().handle);
router.post("/associate/web", new _CreateAssociateWebController.CreateAssociateWebController().handle);

// Credenciados Públicos
router.get("/list-credentials", new _ListCredentialsController.ListCredentialsController().handle);
router.post("/credential", upload.single("file"), new _CreateCredentialController.CreateCredentialController().handle);
router.get("/credential/:id", new _GetCredentialController.GetCredentialController().handle);
router.put("/completed/:id", upload.single("file"), new _PublicEditCredentialController.PublicEditCredentialController().handle);

// Banners Públicos
router.get("/banners-public", new _ListBannersPublicController.ListBannersPublicController().handle);

// Contratos Públicos (Visualização, Assinatura e Negociação)
router.get("/contract/:id", new _GetContractController.GetContractController().handle);
router.put("/signature-contract/:id", new _SignatureContractController.SignatureContractController().handle);
router.put("/refusal-contract/:id", new _RefusalContractController.RefusalContractController().handle);
router.put("/negotiation-contract/:id", new _NegotiationContractController.NegotiationContractController().handle);

// Empresa Pública
router.get("/company/:company_id", new _GetCompanyController.GetCompanyController().handle);
router.put("/company/:company_id", new _EditCompanyController.EditCompanyController().handle);

// Formulário Preliminar Público
router.get("/preliminary-company/:company_id", new _GetPreliminaryCompanyController.GetPreliminaryCompanyController().handle);
router.put("/preliminary-company/:company_id", new _EditPreliminaryCompanyController.EditPreliminaryCompanyController().handle);
router.post("/preliminary-company", new _CreatePreliminaryCompanyController.CreatePreliminaryCompanyController().handle);
router.post("/preliminary-company/:company_id/convert", new _ConvertPreliminaryToSurveyController.ConvertPreliminaryToSurveyController().handle);

// Diagnóstico SST Público
router.get("/public/sst-diagnostic/:id", new _GetSSTDiagnosticController.GetSSTDiagnosticController().handle);

// Pagamento Usuário / Utilitários Públicos
router.get("/payments/user", new _GetPaymentUserController.GetPaymentUserController().handle);
router.delete("/all/leads", new _DeleteManyLeadsMasterController.DeleteManyLeadsMasterController().handle);
router.put("/all-renewal", new _EditAllRenewalsController.EditAllRenewalsController().handle);

/* ==========================================================================
   2. MIDDLEWARE DE AUTENTICAÇÃO BASE (Requer login do usuário)
   ========================================================================== */
router.use(_isAuthenticated.isAuthenticated);

/* ==========================================================================
   3. ROTAS AUTENTICADAS (Franqueado, Cliente, Técnico, Atendente)
   ========================================================================== */

// Dashboard & Resumos do Usuário
router.post("/cliente/resume", new _GetUserResumeController.GetUserResumeController().handle);
router.post("/tecnico/resume", new _GetCollaboratorResumeController.GetCollaboratorResumeController().handle);

// Perfil de Usuário e Colaborador Logado
router.get("/user/me", new _GetUserController.GetUserController().handle);
router.put("/user", upload.single("file"), new _EditUserController.EditUserController().handle);
router.get("/collaborator", new _GetCollaboratorController.GetCollaboratorController().handle);
router.put("/collaborator", upload.single("file"), new _EditCollaboratorController.EditCollaboratorController().handle);

// Gestão de Empresas (Enterprise - Franqueado)
router.post("/enterprise", new _CreateEnterpriseController.CreateEnterpriseController().handle);
router.get("/enterprises", new _ListEnterpriseController.ListEnterpriseController().handle);
router.get("/esocial", new _ListEsocialController.ListEsocialController().handle);
router.put("/enterprise/:id", new _EditEnterpriseController.EditEnterpriseController().handle);

// Gestão de Empresas (Enterprise - Técnico)
router.post("/tecnico/enterprise", new _CreateEnterpriseTecnicoController.CreateEnterpriseTecnicoController().handle);
router.get("/tecnico/enterprises", new _ListEnterpriseTecnicoController.ListEnterpriseTecnicoController().handle);
router.put("/tecnico/enterprise/:id", new _EditEnterpriseTecnicoController.EditEnterpriseTecnicoController().handle);
router.delete("/tecnico/enterprise/:id", new _DeleteEnterpriseTecnicoController.DeleteEnterpriseTecnicoController().handle);

// Ordens de Serviço (OS / Orders - Franqueado & Técnico)
router.get("/orders-open", new _ListOpenOrdersController.ListOpenOrdersController().handle);
router.get("/orders/:type", new _ListOrdersController.ListOrdersController().handle);
router.get("/order/:id", new _GetOrderController.GetOrderController().handle);
router.post("/order", new _CreateOrderController.CreateOrderController().handle);
router.put("/order/:id", new _EditOrderController.EditOrderController().handle);
router.put("/order/edit-tecnico/:id", new _EditCollaboratorOrderController.EditCollaboratorOrderController().handle);
router.put("/accept-order/:id", new _AcceptOrdersController.AcceptOrderController().handle);
router.put("/recused-order/:id", new _RecusedOrdersController.RecusedOrderController().handle);
router.put("/status/:id", new _StatusOrdersController.StatusOrderController().handle);
router.put("/order-cancel/:id", new _CancelOrderController.CancelOrderController().handle);
router.put("/order-urgent/:id", new _AddUrgentOrderController.AddUrgentOrderController().handle);
router.post("/doc/:id", upload.single("file"), new _CreateDocOrderController.CreateDocOrderController().handle);
router.delete("/doc/:id", upload.single("file"), new _DeleteDocOrderController.DeleteDocOrderController().handle);
router.put("/doc-recused-order/:order_id", new _RecusedDocOrderController.RecusedDocOrderController().handle);
router.post("/customer", new _CreateCustomerController.CreateCustomerController().handle);
router.post("/service-os/:id", new _ServiceOSUserController.ServiceOSUserController().handle);

// Empresas Clientes & Integração SGG (Empresas, Setores, Riscos, Imagens)
router.get("/companies", new _ListCompaniesController.ListCompaniesController().handle);
router.get("/companies-confirm", new _ListCompaniesConfirmController.ListCompaniesConfirmController().handle);
router.post("/company", new _CreateCompanyController.CreateCompanyController().handle);
router.delete("/company/:company_id", new _DeleteCompanyController.DeleteCompanyController().handle);

// Formulários Preliminares (Franqueado)
router.get("/preliminary-companies", new _ListPreliminaryCompaniesController.ListPreliminaryCompaniesController().handle);
router.post("/preliminary-company", new _CreatePreliminaryCompanyController.CreatePreliminaryCompanyController().handle);
router.post("/preliminary-company/:company_id/convert", new _ConvertPreliminaryToSurveyController.ConvertPreliminaryToSurveyController().handle);
router.delete("/preliminary-company/:company_id", new _DeletePreliminaryCompanyController.DeletePreliminaryCompanyController().handle);

// Diagnóstico SST (Franqueado)
router.post("/sst-diagnostic", new _CreateSSTDiagnosticController.CreateSSTDiagnosticController().handle);
router.get("/sst-diagnostics", new _ListSSTDiagnosticsController.ListSSTDiagnosticsController().handle);
router.get("/sst-diagnostic/:id", new _GetSSTDiagnosticController.GetSSTDiagnosticController().handle);
router.delete("/sst-diagnostic/:id", new _DeleteSSTDiagnosticController.DeleteSSTDiagnosticController().handle);
router.put("/confirm-company/:company_id", new _ConfirmCompanyController.ConfirmCompanyController().handle);
router.put("/company-handler/:company_id", new _HandlerCompanyController.HandlerCompanyController().handle);
router.post("/company-image/:company_id", upload.single("file"), new _CreateImageCompanyController.CreateImageCompanyController().handle);
router.delete("/company-image/:id", new _DeleteImageCompanyController.DeleteImageCompanyController().handle);
router.put("/sgg/company/:company_id", new _SggCompanyController.SggCompanyController().handle);
router.put("/sgg/sector/:sector_id", new _SggSectorController.SggSectorController().handle);
router.put("/risk-company/:risk_id", new _EditRiskCompanyController.EditRiskCompanyController().handle);
router.delete("/employe/:employe_id", new _DeleteEmployeController.DeleteEmployeController().handle);
router.post("/sgg-company/:id", new _IntegrationCompanyController.IntegrationCompanyController().handle);
router.post("/sgg-sector/:id", new _IntegrationSectorController.IntegrationSectorController().handle);
router.post("/sgg-employee/:id", new _IntegrationJobController.IntegrationJobController().handle);
router.post("/sgg-risks/:id", new _IntegrationRisksController.IntegrationRisksController().handle);

// Renovações & Timelines de Empresas Clientes
router.post("/company-renewal", new _CreateRenewalController.CreateRenewalController().handle);
router.get("/companies-renewal", new _ListRenewalsController.ListRenewalsController().handle);
router.put("/company-renewal/:id", new _EditRenewalController.EditRenewalController().handle);
router.delete("/company-renewal/:id", new _DeleteRenewalController.DeleteRenewalController().handle);
router.delete("/all-renewal", new _DeleteAllRenewalController.DeleteAllRenewalController().handle);
router.put("/renewal/:id", new _CheckRenewalController.CheckRenewalController().handle);
router.post("/company-timeline", new _CreateTimelineController.CreateTimelineController().handle);
router.get("/companies-timeline", new _ListTimelinesController.ListTimelinesController().handle);
router.put("/company-timeline/:id", new _EditTimelineController.EditTimelineController().handle);
router.delete("/company-timeline/:id", new _DeleteTimelineController.DeleteTimelineController().handle);
router.put("/timeline/:id", new _CheckTimelineController.CheckTimelineController().handle);
router.get("/timeline/:id", new _GetTimelineController.GetTimelineController().handle);

// CRM & Leads (Franqueado)
router.get("/leads/me", new _ListLeadsClientController.ListLeadsClientController().handle);
router.get("/my-leads", new _ListMyLeadsController.ListMyLeadsController().handle);
router.get("/leads-buy", new _ListLeadsBuyController.ListLeadsBuyController().handle);
router.get("/leads-send", new _ListLeadsSendController.ListLeadsSendController().handle);
router.get("/lead/:id", new _GetLeadController.GetLeadController().handle);
router.get("/leadmaster/:id", new _GetLeadMasterController.GetLeadMasterController().handle);
router.post("/lead", new _CreateLeadController.CreateLeadController().handle);
router.post("/lead/master", new _CreateLeadMasterController.CreateLeadMasterController().handle);
router.put("/lead/:id", new _EditLeadController.EditLeadController().handle);
router.put("/lead/master/:id", new _EditLeadMasterController.EditLeadMasterController().handle);
router.put("/lead/status/:id", new _StatusLeadController.StatusLeadController().handle);
router.put("/lead/send", new _SendLeadController.SendLeadController().handle);
router.put("/buy-lead/:id", new _BuyLeadController.BuyLeadController().handle);
router.put("/reset-lead/:id", new _ResetLeadController.ResetLeadController().handle);
router.delete("/lead/:id", new _DeleteLeadController.DeleteLeadController().handle);
router.delete("/lead/master/:id", new _DeleteLeadMasterController.DeleteLeadMasterController().handle);

// CRM & Leads Matriz
router.post("/lead-matriz", new _CreateLeadMatrizController.CreateLeadMatrizController().handle);
router.get("/leads-matriz", new _ListLeadMatrizController.ListLeadMatrizController().handle);
router.put("/lead-matriz/:id", new _EditLeadMatrizController.EditLeadMatrizController().handle);
router.put("/lead-matriz/move/:id", new _MoveLeadMatrizController.MoveLeadMatrizController().handle);
router.delete("/lead-matriz/:id", new _DeleteLeadMatrizController.DeleteLeadMatrizController().handle);

// Contratos (Franqueado)
router.get("/contracts", new _ListContractsController.ListContractsController().handle);
router.post("/contract", new _CreateContractController.CreateContractController().handle);
router.put("/contract/:id", new _EditContractController.EditContractController().handle);
router.put("/end-negotiation-contract/:id", new _EndNegotiationContractController.EndNegotiationContractController().handle);
router.delete("/contract/:id", new _DeleteCredentialController.DeleteContractController().handle);

// Serviços (Visão Franqueado/Cliente)
router.get("/services-client", new _ListServicesClientController.ListServicesClientController().handle);

// Cupons, Depósitos e Pagamentos (Franqueado)
router.post("/get/coupon", new _GetCouponController.GetCouponController().handle);
router.get("/payments", new _ListPaymentsController.ListPaymentsController().handle);
router.get("/payment/:id", new _GetPaymentController.GetPaymentController().handle);
router.post("/deposit", new _CreateDepositController.CreateDepositController().handle);
router.get("/deposit/:id", new _GetDepositsController.GetDepositsController().handle);
router.get("/deposits", new _ListDepositsController.ListDepositsController().handle);
router.get("/packages", new _ListPackagesController.ListPackagesController().handle);

// Lembretes (Reminders)
router.post("/reminder", new _CreateReminderController.CreateReminderController().handle);
router.get("/reminders", new _ListRemindersController.ListRemindersController().handle);
router.put("/reminder/:id", new _EditReminderController.EditReminderController().handle);
router.delete("/reminder/:id", new _DeleteReminderController.DeleteReminderController().handle);
router.put("/confirm-reminder/:id", new _ConfirmReminderController.ConfirmReminderController().handle);

// Comunicados (Statements - Leitura e Confirmação)
router.get("/statements-user", new _ListStatementsUserController.ListStatementsUserController().handle);
router.get("/statements-last", new _LastStatementsUserController.LastStatementsUserController().handle);
router.get("/statement/:id", new _GetStatementController.GetStatementController().handle);
router.put("/confirm-statement/:id", new _ConfirmStatementController.ConfirmStatementController().handle);

// Associado (Visão Própria)
router.get("/associates", new _ListAssociatesClientController.ListAssociatesClientController().handle);
router.get("/associate", new _GetAssociateController.GetAssociateController().handle);
router.get("/resume/associate", new _ResumeAssociateController.ResumeAssociateController().handle);
router.get("/leads/associate", new _ListAssociateLeadsController.ListAssociateLeadsController().handle);
router.get("/payments/associate", new _ListAssociateComissionsController.ListAssociateComissionsController().handle);
router.put("/associate", upload.single("file"), new _EditAssociateController.EditAssociateController().handle);

// Suporte e Tickets (Usuário, Técnico e Atendente)
router.post("/ticket", new _OpenTicketController.OpenTicketController().handle);
router.post("/ticket/:ticket_id", new _CreateTicketController.CreateTicketController().handle);
router.post("/message/:ticket_id", new _SendMessageTicketController.SendMessageTicketController().handle);
router.get("/ticket/:ticket_id", new _GetTicketController.GetTicketController().handle);
router.get("/tickets", new _ListTicketsController.ListTicketsController().handle);
router.get("/tickets/open", new _ListTicketsOpenController.ListTicketsOpenController().handle);
router.get("/attendant/tickets", new _ListAttendantTicketsController.ListAttendantTicketsController().handle);
router.put("/accept-ticket/:ticket_id", new _EditAllRenewalsController.EditAllRenewalsController().handle);

// Cursos e Aulas (Visão Aluno/User)
router.get("/courses-user", new _ListCoursesPublicController.ListCoursesPublicController().handle);
router.get("/course/:course_id", new _GetCoursePublicController.GetCoursePublicController().handle);
router.get("/lessons/:course_id", new _ListLessonsController.ListLessonsController().handle);
router.get("/lesson/:id", new _GetLessonController.GetLessonController().handle);
router.post("/confirm-lesson/:id", new _ConfirmLessonController.ConfirmLessonController().handle);

// Credenciados (Edição e Exclusão pelo Próprio Usuário Logado)
router.put("/credential", upload.single("file"), new _EditCredentialController.EditCredentialController().handle);
router.delete("/credential/:id", new _DeleteCredentialController2.DeleteCredentialController().handle);

// Gestão Admin & Técnico de Empresas Franqueado (Enterprise)
router.post("/admin/enterprise", new _CreateEnterpriseAdminController.CreateEnterpriseAdminController().handle);
router.get("/admin/enterprises", new _ListEnterpriseAdminController.ListEnterpriseAdminController().handle);
router.get("/admin/esocial", new _ListEsocialAdminController.ListEsocialAdminController().handle);
router.put("/admin/enterprise/:id", new _EditEnterpriseAdminController.EditEnterpriseAdminController().handle);
router.delete("/admin/enterprise/:id", new _DeleteEnterpriseAdminController.DeleteEnterpriseAdminController().handle);

/* ==========================================================================
   4. MIDDLEWARE DE AUTENTICAÇÃO ADMIN (Apenas Administradores)
   ========================================================================== */

// IS ADMIN HIBRIDO

router.get("/users", new _ListUsersController.ListUsersController().handle);
router.get("/collaborators", new _ListCollaboratorsController.ListCollaboratorsController().handle);
router.use(_isAdmin.isAdmin);

/* ==========================================================================
   5. ROTAS RESTRITAS AO ADMIN (`isAdmin`)
   ========================================================================== */

// Dashboard / Resume Admin
router.post("/admin/resume", new _GetAdminResumeController.GetAdminResumeController().handle);

// Gestão Admin de Usuários (Franqueados / Clientes)
router.get("/user/:id", new _GetUserController2.GetUserAdminController().handle);
router.post("/user", upload.single("file"), new _CreateUserController.CreateUserController().handle);
router.put("/user/:id", upload.single("file"), new _EditAdminUserController.EditAdminUserController().handle);
router.delete("/user/:id", new _DeleteUserController.DeleteUserController().handle);
router.get("/admin/users/ranking", new _RankingUsersController.RankingUsersController().handle);

// Gestão Admin de Usuários Matriz
router.get("/users-matriz", new _ListUsersMatrizController.ListUsersMatrizController().handle);
router.get("/user-matriz/:id", new _GetUserMatrizController.GetUserMatrizController().handle);
router.post("/user-matriz", upload.single("file"), new _CreateUserMatrizController.CreateUserMatrizController().handle);
router.put("/user-matriz/:id", upload.single("file"), new _EditAdminUserMatrizController.EditAdminUserMatrizController().handle);
router.delete("/user-matriz/:id", new _DeleteUserMatrizController.DeleteUserMatrizController().handle);
router.get("/admin/users-matriz/ranking", new _RankingUsersMatrizController.RankingUsersMatrizController().handle);
router.post("/service-os-matriz/:id", new _ServiceOSUserMatrizController.ServiceOSUserMatrizController().handle);

// Gestão Admin de Colaboradores
router.get("/collaborator/:id", new _GetCollaboratorAdminController.GetCollaboratorAdminController().handle);
router.post("/collaborator", upload.single("file"), new _CreateCollaboratorController.CreateCollaboratorController().handle);
router.put("/collaborator/:id", upload.single("file"), new _EditAdminCollaboratorController.EditAdminCollaboratorController().handle);
router.delete("/collaborator/:id", new _DeleteCollaboratorController.DeleteCollaboratorController().handle);
router.get("/users-collaborator/:collaborator_id", new _ListUsersCollaboratorController.ListUsersCollaboratorController().handle);

// Gestão Admin de Administradores
router.get("/admins", new _ListAdminsController.ListAdminsController().handle);
router.post("/admin", upload.single("file"), new _CreateAdminController.CreateAdminController().handle);
router.put("/admin/:id", upload.single("file"), new _EditAdminController.EditAdminController().handle);
router.delete("/admin/:id", new _DeleteAdminController.DeleteAdminController().handle);

// Gestão Admin de Atendentes
router.get("/attendants", new _ListAttendantsController.ListAttendantsController().handle);
router.post("/attendant", upload.single("file"), new _CreateAttendantController.CreateAttendantController().handle);
router.put("/attendant/:id", upload.single("file"), new _EditAttendantController.EditAttendantController().handle);
router.delete("/attendant/:id", new _DeleteAttendantController.DeleteAttendantController().handle);

// Gestão Admin de Associados & Comissões
router.get("/admin/associates", new _ListAssociatesController.ListAssociatesController().handle);
router.get("/associate/:associate_id", new _GetAdminAssociateController.GetAdminAssociateController().handle);
router.post("/associate", upload.single("file"), new _CreateAssociateController.CreateAssociateController().handle);
router.put("/associate/:id", upload.single("file"), new _EditAdminAssociateController.EditAdminAssociateController().handle);
router.delete("/associate/:id", new _DeleteAssociateController.DeleteAssociateController().handle);
router.get("/resume/associate/:associate_id", new _ResumeAdminAssociateController.ResumeAdminAssociateController().handle);
router.get("/leads/associate/:associate_id", new _ListAdminAssociateLeadsController.ListAdminAssociateLeadsController().handle);
router.get("/payments/associate/:associate_id", new _ListAdminAssociatePaymentsComissionController.ListAdminAssociatePaymentsComissionController().handle);
router.post("/payment/associate", new _CreatePaymentComissionAssociateController.CreatePaymentComissionAssociateController().handle);

// Gestão Admin de Banners
router.get("/banners", new _ListBannersController.ListBannersController().handle);
router.post("/banner", upload.single("file"), new _CreateBannerController.CreateBannerController().handle);
router.put("/banner/:id", upload.single("file"), new _EditBannerController.EditBannerController().handle);
router.delete("/banner/:id", new _DeleteBannerController.DeleteBannerController().handle);

// Gestão Admin de Cursos, Módulos e Aulas
router.get("/admin-course/:course_id", new _GetCourseControlle.GetCourseController().handle);
router.get("/courses", new _ListCoursesController.ListCoursesController().handle);
router.post("/course", upload.single("file"), new _CreateCourseController.CreateCourseController().handle);
router.put("/course/:id", upload.single("file"), new _EditCourseController.EditCourseController().handle);
router.delete("/course/:id", new _DeleteCourseController.DeleteCourseController().handle);
router.post("/module", new _CreateModuleController.CreateModuleController().handle);
router.put("/module/:id", new _EditModuleController.EditModuleController().handle);
router.delete("/module/:id", new _DeleteModuleController.DeleteModuleController().handle);
router.post("/lesson", upload.single("file"), new _CreateLessonController.CreateLessonController().handle);
router.put("/lesson/:id", upload.single("file"), new _EditLessonController.EditLessonController().handle);
router.delete("/lesson/:id", new _DeleteLessonController.DeleteLessonController().handle);

// Gestão Admin de Serviços do Sistema
router.get("/services", new _ListServicesAdminController.ListServicesAdminController().handle);
router.post("/service", new _CreateServiceController.CreateServiceController().handle);
router.put("/service/:id", new _EditServiceController.EditServiceController().handle);
router.delete("/service/:id", new _DeleteServiceController.DeleteServiceController().handle);

// Gestão Admin de Ordens de Serviço (OS)
router.get("/orders-admin", new _ListAdminOrdersController.ListAdminOrdersController().handle);
router.post("/list-orders", new _ListAdminOrdersPeriodoController.ListAdminOrdersPeriodoController().handle);
router.get("/orders/:id", new _ListAdminOrdersController.ListAdminOrdersController().handle);

// Gestão Admin de CRM & Leads
router.get("/leads", new _ListLeadsAdminController.ListLeadsAdminController().handle);
router.get("/leads/:userId", new _ListAdminLeadsClientController.ListAdminLeadsClientController().handle);

// Gestão Admin de Contratos por Usuário
router.get("/contracts/:user_id", new _AdminListContractController.AdminListContractsController().handle);

// Gestão Admin Financeira (Pagamentos, Depósitos e Pacotes)
router.get("/admin/payments", new _ListAdminPaymentsController.ListAdminPaymentsController().handle);
router.post("/admin/deposit", new _CreateDepositAdminController.CreateDepositAdminController().handle);
router.get("/admin/deposits", new _ListDepositsAdminController.ListDepositsAdminController().handle);
router.post("/package", new _CreatePackageController.CreatePackageController().handle);
router.put("/package/:id", new _EditPackageController.EditPackageController().handle);
router.delete("/package/:id", new _DeletePackageController.DeletePackageController().handle);

// Gestão Admin de Credenciados
router.get("/admin/list-credentials", new _AdminListOrdersController.AdminListCredentialsController().handle);
router.post("/admin/credential", upload.single("file"), new _AdminCreateCredentialController.AdminCreateCredentialController().handle);
router.put("/admin/credential/:id", upload.single("file"), new _AdminEditCredentialController.AdminEditCredentialController().handle);

// Gestão Admin de Cupons
router.get("/coupons", new _ListCouponsController.ListCouponsController().handle);
router.post("/coupon", new _CreateCouponController.CreateCouponController().handle);
router.put("/coupon/:id", new _EditCouponController.EditCouponController().handle);
router.delete("/coupon/:id", new _DeleteCouponController.DeleteCouponController().handle);

// Gestão Admin de Comunicados (Statements)
router.get("/statements", new _ListStatementsController.ListStatementsController().handle);
router.post("/statement", new _CreateStatementController.CreateStatementController().handle);
router.put("/statement/:id", new _EditStatementController.EditStatementController().handle);
router.delete("/statement/:id", new _DeleteStatementController.DeleteStatementController().handle);

// Gestão Admin de Tickets
router.get("/admin/tickets", new _ListAdminTicketsController.ListAdminTicketsController().handle);