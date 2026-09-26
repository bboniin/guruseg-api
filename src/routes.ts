import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";

// Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

// Auth & Password Controllers
import { AuthUserController } from "./controllers/User/AuthUserController";
import { AuthCredentialController } from "./controllers/Credential/AuthCredentialController";
import { PasswordForgotController } from "./controllers/User/PasswordForgotController";
import { PasswordResetController } from "./controllers/User/PasswordResetController";
import { PasswordVerifyResetController } from "./controllers/User/PasswordVerifyResetController";

// IA Controllers
import { GetRisksController } from "./controllers/IA/GetRisksController";
import { GetRisksImagesController } from "./controllers/IA/GetRisksImagesController";
import { GetOccupationalController } from "./controllers/IA/GetFunctionController";
import { GetRiskDetailsController } from "./controllers/IA/GetRiskDetailsController";
import { GetAssistentController } from "./controllers/IA/GetAssistentController";

// User Controllers
import { GetUserController } from "./controllers/User/GetUserController";
import { EditUserController } from "./controllers/User/EditUserController";
import { CreateUserController } from "./controllers/Admin/Users/CreateUserController";
import { EditAdminUserController } from "./controllers/Admin/Users/EditAdminUserController";
import { ListUsersController } from "./controllers/Admin/Users/ListUsersController";
import { DeleteUserController } from "./controllers/Admin/Users/DeleteUserController";
import { GetUserAdminController } from "./controllers/Admin/Users/GetUserController";
import { RankingUsersController } from "./controllers/Admin/Users/RankingUsersController";
import { ServiceOSUserController } from "./controllers/Admin/Users/ServiceOSUserController";
import { ListUsersCollaboratorController } from "./controllers/Admin/Collaborators/ListUsersCollaboratorController";

// User Matriz Controllers
import { CreateUserMatrizController } from "./controllers/Admin/UserMatriz/CreateUserMatrizController";
import { EditAdminUserMatrizController } from "./controllers/Admin/UserMatriz/EditAdminUserMatrizController";
import { ListUsersMatrizController } from "./controllers/Admin/UserMatriz/ListUsersMatrizController";
import { DeleteUserMatrizController } from "./controllers/Admin/UserMatriz/DeleteUserMatrizController";
import { GetUserMatrizController } from "./controllers/Admin/UserMatriz/GetUserMatrizController";
import { RankingUsersMatrizController } from "./controllers/Admin/UserMatriz/RankingUsersMatrizController";
import { ServiceOSUserMatrizController } from "./controllers/Admin/UserMatriz/ServiceOSUserMatrizController";

// Collaborator Controllers
import { GetCollaboratorController } from "./controllers/Collaborator/GetCollaboratorController";
import { EditCollaboratorController } from "./controllers/Collaborator/EditCollaboratorController";
import { CreateCollaboratorController } from "./controllers/Admin/Collaborators/CreateCollaboratorController";
import { EditAdminCollaboratorController } from "./controllers/Admin/Collaborators/EditAdminCollaboratorController";
import { ListCollaboratorsController } from "./controllers/Admin/Collaborators/ListCollaboratorsController";
import { DeleteCollaboratorController } from "./controllers/Admin/Collaborators/DeleteCollaboratorController";
import { GetCollaboratorAdminController } from "./controllers/Admin/Collaborators/GetCollaboratorAdminController";

// Admin Management Controllers
import { ListAdminsController } from "./controllers/Admin/Admins/ListAdminsController";
import { CreateAdminController } from "./controllers/Admin/Admins/CreateAdminController";
import { EditAdminController } from "./controllers/Admin/Admins/EditAdminController";
import { DeleteAdminController } from "./controllers/Admin/Admins/DeleteAdminController";

// Attendant Controllers
import { ListAttendantsController } from "./controllers/Admin/Attendants/ListAttendantsController";
import { CreateAttendantController } from "./controllers/Admin/Attendants/CreateAttendantController";
import { EditAttendantController } from "./controllers/Admin/Attendants/EditAttendantController";
import { DeleteAttendantController } from "./controllers/Admin/Attendants/DeleteAttendantController";

// Associate Controllers
import { CreateAssociateWebController } from "./controllers/Admin/Associates/CreateAssociateWebController";
import { GetAssociateController } from "./controllers/Associate/GetAssociateController";
import { EditAssociateController } from "./controllers/Associate/EditAssociateController";
import { ResumeAssociateController } from "./controllers/Associate/ResumeAssociateController";
import { ListAssociateLeadsController } from "./controllers/Associate/ListAssociateLeadsController";
import { ListAssociateComissionsController } from "./controllers/Associate/ListAssociateComissionsController";
import { ListAssociatesController } from "./controllers/Admin/Associates/ListAssociatesController";
import { CreateAssociateController } from "./controllers/Admin/Associates/CreateAssociateController";
import { EditAdminAssociateController } from "./controllers/Admin/Associates/EditAdminAssociateController";
import { GetAdminAssociateController } from "./controllers/Admin/Associates/GetAdminAssociateController";
import { DeleteAssociateController } from "./controllers/Admin/Associates/DeleteAssociateController";
import { ListAdminAssociateLeadsController } from "./controllers/Admin/Associates/ListAdminAssociateLeadsController";
import { ResumeAdminAssociateController } from "./controllers/Admin/Associates/ResumeAdminAssociateController";
import { ListAdminAssociatePaymentsComissionController } from "./controllers/Admin/Associates/ListAdminAssociatePaymentsComissionController";
import { CreatePaymentComissionAssociateController } from "./controllers/Admin/Associates/CreatePaymentComissionAssociateController";

// Enterprise Controllers
import { CreateEnterpriseController } from "./controllers/Enterprise/CreateEnterpriseController";
import { CreateEnterpriseAdminController } from "./controllers/Enterprise/CreateEnterpriseAdminController";
import { ListEnterpriseController } from "./controllers/Enterprise/ListEnterpriseController";
import { ListEnterpriseAdminController } from "./controllers/Enterprise/ListEnterpriseAdminController";
import { EditEnterpriseController } from "./controllers/Enterprise/EditEnterpriseController";
import { EditEnterpriseAdminController } from "./controllers/Enterprise/EditEnterpriseAdminController";
import { DeleteEnterpriseAdminController } from "./controllers/Enterprise/DeleteEnterpriseAdminController";

// Service Controllers
import { CreateServiceController } from "./controllers/Service/CreateServiceController";
import { EditServiceController } from "./controllers/Service/EditServiceController";
import { DeleteServiceController } from "./controllers/Service/DeleteServiceController";
import { ListServicesAdminController } from "./controllers/Service/ListServicesAdminController";
import { ListServicesClientController } from "./controllers/Service/ListServicesClientController";

// Order Controllers
import { CreateOrderController } from "./controllers/Order/CreateOrderController";
import { ListOrdersController } from "./controllers/Order/ListOrdersController";
import { GetOrderController } from "./controllers/Order/GetOrderController";
import { EditOrderController } from "./controllers/Order/EditOrderController";
import { CancelOrderController } from "./controllers/Order/CancelOrderController";
import { AcceptOrderController } from "./controllers/Order/AcceptOrdersController";
import { RecusedOrderController } from "./controllers/Order/RecusedOrdersController";
import { StatusOrderController } from "./controllers/Order/StatusOrdersController";
import { ListOpenOrdersController } from "./controllers/Order/ListOpenOrdersController";
import { CreateDocOrderController } from "./controllers/Order/CreateDocOrderController";
import { DeleteDocOrderController } from "./controllers/Order/DeleteDocOrderController";
import { RecusedDocOrderController } from "./controllers/Order/RecusedDocOrderController";
import { EditCollaboratorOrderController } from "./controllers/Order/EditCollaboratorOrderController";
import { SendOrderUrgentController } from "./controllers/Order/SendOrderUrgentController";
import { ListAdminOrdersController } from "./controllers/Admin/ListAdminOrdersController";
import { ListAdminOrdersUrgentController } from "./controllers/Admin/ListAdminOrdersUrgentController";
import { ListAdminOrdersPeriodoController } from "./controllers/Admin/ListAdminOrdersPeriodoController";

// Company & SGG Controllers
import { GetCompanyController } from "./controllers/Company/GetCompanyController";
import { ListCompaniesController } from "./controllers/Company/ListCompaniesController";
import { ListCompaniesConfirmController } from "./controllers/Company/ListCompaniesConfirmController";
import { CreateCompanyController } from "./controllers/Company/CreateCompanyController";
import { EditCompanyController } from "./controllers/Company/EditCompanyController";
import { DeleteCompanyController } from "./controllers/Company/DeleteCompanyController";
import { ConfirmCompanyController } from "./controllers/Company/ConfirmCompanyController";
import { HandlerCompanyController } from "./controllers/Company/HandlerCompanyController";
import { CreateImageCompanyController } from "./controllers/Company/CreateImageCompanyController";
import { DeleteImageCompanyController } from "./controllers/Company/DeleteImageCompanyController";
import { SggCompanyController } from "./controllers/Company/SggCompanyController";
import { SggSectorController } from "./controllers/Company/SggSectorController";
import { EditRiskCompanyController } from "./controllers/Company/EditRiskCompanyController";
import { DeleteEmployeController } from "./controllers/Company/DeleteEmployeController";

// Company Renewal & Timeline Controllers
import { CreateRenewalController } from "./controllers/CompanyRenewal/CreateRenewalController";
import { ListRenewalsController } from "./controllers/CompanyRenewal/ListRenewalsController";
import { EditRenewalController } from "./controllers/CompanyRenewal/EditRenewalController";
import { DeleteRenewalController } from "./controllers/CompanyRenewal/DeleteRenewalController";
import { DeleteAllRenewalController } from "./controllers/CompanyRenewal/DeleteAllRenewalController";
import { EditAllRenewalsController } from "./controllers/CompanyRenewal/EditAllRenewalsController";
import { CheckRenewalController } from "./controllers/CompanyRenewal/CheckRenewalController";
import { CreateTimelineController } from "./controllers/CompanyTimeline/CreateTimelineController";
import { ListTimelinesController } from "./controllers/CompanyTimeline/ListTimelinesController";
import { EditTimelineController } from "./controllers/CompanyTimeline/EditTimelineController";
import { DeleteTimelineController } from "./controllers/CompanyTimeline/DeleteTimelineController";
import { CheckTimelineController } from "./controllers/CompanyTimeline/CheckTimelineController";
import { GetTimelineController } from "./controllers/CompanyTimeline/GetTimelineController";

// SGG Integration Controllers
import { IntegrationCompanyController } from "./controllers/SGG/IntegrationCompanyController";
import { IntegrationSectorController } from "./controllers/SGG/IntegrationSectorController";
import { IntegrationJobController } from "./controllers/SGG/IntegrationJobController";
import { IntegrationRisksController } from "./controllers/SGG/IntegrationRisksController";

// Lead (CRM) Controllers
import { CreateLeadController } from "./controllers/Lead/CreateLeadController";
import { CreateLeadWebController } from "./controllers/Lead/CreateLeadWebController";
import { CreateLeadMasterController } from "./controllers/Lead/CreateLeadMasterController";
import { EditLeadController } from "./controllers/Lead/EditLeadController";
import { EditLeadMasterController } from "./controllers/Lead/EditLeadMasterController";
import { GetLeadController } from "./controllers/Lead/GetLeadController";
import { GetLeadMasterController } from "./controllers/Lead/GetLeadMasterController";
import { ListLeadsClientController } from "./controllers/Lead/ListLeadsClientController";
import { ListLeadsBuyController } from "./controllers/Lead/ListLeadsBuyController";
import { ListLeadsSendController } from "./controllers/Lead/ListLeadsSendController";
import { ListMyLeadsController } from "./controllers/Lead/ListMyLeadsController";
import { ListLeadsAdminController } from "./controllers/Lead/ListLeadsAdminController";
import { ListAdminLeadsClientController } from "./controllers/Lead/ListAdminLeadsClientController";
import { StatusLeadController } from "./controllers/Lead/StatusLeadController";
import { ResetLeadController } from "./controllers/Lead/ResetLeadController";
import { SendLeadController } from "./controllers/Lead/SendLeadController";
import { BuyLeadController } from "./controllers/Lead/BuyLeadController";
import { DeleteLeadController } from "./controllers/Lead/DeleteLeadController";
import { DeleteLeadMasterController } from "./controllers/Lead/DeleteLeadMasterController";
import { DeleteManyLeadsMasterController } from "./controllers/Lead/DeleteManyLeadsMasterController";

// Lead Matriz Controllers
import { CreateLeadMatrizController } from "./controllers/LeadMatriz/CreateLeadMatrizController";
import { ListLeadMatrizController } from "./controllers/LeadMatriz/ListLeadMatrizController";
import { EditLeadMatrizController } from "./controllers/LeadMatriz/EditLeadMatrizController";
import { MoveLeadMatrizController } from "./controllers/LeadMatriz/MoveLeadMatrizController";
import { DeleteLeadMatrizController } from "./controllers/LeadMatriz/DeleteLeadMatrizController";

// Contract Controllers
import { GetContractController } from "./controllers/Contract/GetContractController";
import { ListContractsController } from "./controllers/Contract/ListContractsController";
import { AdminListContractsController } from "./controllers/Contract/AdminListContractController";
import { CreateContractController } from "./controllers/Contract/CreateContractController";
import { EditContractController } from "./controllers/Contract/EditContractController";
import { SignatureContractController } from "./controllers/Contract/SignatureContractController";
import { RefusalContractController } from "./controllers/Contract/RefusalContractController";
import { NegotiationContractController } from "./controllers/Contract/NegotiationContractController";
import { EndNegotiationContractController } from "./controllers/Contract/EndNegotiationContractController";
import { DeleteContractController } from "./controllers/Contract/DeleteCredentialController";

// Reminder Controllers
import { CreateReminderController } from "./controllers/Reminder/CreateReminderController";
import { ListRemindersController } from "./controllers/Reminder/ListRemindersController";
import { EditReminderController } from "./controllers/Reminder/EditReminderController";
import { DeleteReminderController } from "./controllers/Reminder/DeleteReminderController";
import { ConfirmReminderController } from "./controllers/Reminder/ConfirmReminderController";

// Statement Controllers
import { CreateStatementController } from "./controllers/Statement/CreateStatementController";
import { ListStatementsController } from "./controllers/Statement/ListStatementsController";
import { ListStatementsUserController } from "./controllers/Statement/ListStatementsUserController";
import { LastStatementsUserController } from "./controllers/Statement/LastStatementsUserController";
import { GetStatementController } from "./controllers/Statement/GetStatementController";
import { EditStatementController } from "./controllers/Statement/EditStatementController";
import { DeleteStatementController } from "./controllers/Statement/DeleteStatementController";
import { ConfirmStatementController } from "./controllers/Statement/ConfirmStatementController";

// Payment & Coupon & Deposit Controllers
import { ConfirmPaymentController } from "./controllers/Payment/ConfirmPaymentController";
import { ListPaymentsController } from "./controllers/Payment/ListPaymentsController";
import { ListAdminPaymentsController } from "./controllers/Payment/ListAdminPaymentsController";
import { GetPaymentController } from "./controllers/Payment/GetPaymentController";
import { GetPaymentUserController } from "./controllers/Payment/GetPaymentUserController";
import { CreateCustomerController } from "./controllers/Payment/CreateCustomerController";
import { CreateCouponController } from "./controllers/Coupon/CreateCouponController";
import { ListCouponsController } from "./controllers/Coupon/ListCouponsController";
import { EditCouponController } from "./controllers/Coupon/EditCouponController";
import { DeleteCouponController } from "./controllers/Coupon/DeleteCouponController";
import { GetCouponController } from "./controllers/Coupon/GetCouponController";
import { CreateDepositController } from "./controllers/Deposit/CreateDepositController";
import { GetDepositsController } from "./controllers/Deposit/GetDepositsController";
import { ListDepositsController } from "./controllers/Deposit/ListDepositsController";
import { CreateDepositAdminController } from "./controllers/Deposit/CreateDepositAdminController";
import { ListDepositsAdminController } from "./controllers/Deposit/ListDepositsAdminController";
import { CreatePackageController } from "./controllers/Deposit/CreatePackageController";
import { ListPackagesController } from "./controllers/Deposit/ListPackagesController";
import { EditPackageController } from "./controllers/Deposit/EditPackageController";
import { DeletePackageController } from "./controllers/Deposit/DeletePackageController";

// Course, Module & Lesson Controllers
import { ListCoursesController } from "./controllers/Admin/Courses/ListCoursesController";
import { ListCoursesPublicController } from "./controllers/Admin/Courses/ListCoursesPublicController";
import { CreateCourseController } from "./controllers/Admin/Courses/CreateCourseController";
import { EditCourseController } from "./controllers/Admin/Courses/EditCourseController";
import { DeleteCourseController } from "./controllers/Admin/Courses/DeleteCourseController";
import { GetCourseController } from "./controllers/Admin/Courses/GetCourseControlle";
import { GetCoursePublicController } from "./controllers/Admin/Courses/GetCoursePublicController";
import { CreateModuleController } from "./controllers/Admin/Courses/CreateModuleController";
import { EditModuleController } from "./controllers/Admin/Courses/EditModuleController";
import { DeleteModuleController } from "./controllers/Admin/Courses/DeleteModuleController";
import { ListLessonsController } from "./controllers/Admin/Lessons/ListLessonsController";
import { CreateLessonController } from "./controllers/Admin/Lessons/CreateLessonController";
import { EditLessonController } from "./controllers/Admin/Lessons/EditLessonController";
import { DeleteLessonController } from "./controllers/Admin/Lessons/DeleteLessonController";
import { GetLessonController } from "./controllers/Admin/Lessons/GetLessonController";
import { ConfirmLessonController } from "./controllers/Admin/Lessons/ConfirmLessonController";

// Banner Controllers
import { ListBannersPublicController } from "./controllers/Admin/Banners/ListBannersPublicController";
import { ListBannersController } from "./controllers/Admin/Banners/ListBannersController";
import { CreateBannerController } from "./controllers/Admin/Banners/CreateBannerController";
import { EditBannerController } from "./controllers/Admin/Banners/EditBannerController";
import { DeleteBannerController } from "./controllers/Admin/Banners/DeleteBannerController";

// Credential Controllers
import { ListCredentialsController } from "./controllers/Credential/ListCredentialsController";
import { CreateCredentialController } from "./controllers/Credential/CreateCredentialController";
import { GetCredentialController } from "./controllers/Credential/GetCredentialController";
import { EditCredentialController } from "./controllers/Credential/EditCredentialController";
import { DeleteCredentialController } from "./controllers/Credential/DeleteCredentialController";
import { PublicEditCredentialController } from "./controllers/Credential/PublicEditCredentialController";
import { AdminListCredentialsController } from "./controllers/Credential/AdminListOrdersController";
import { AdminCreateCredentialController } from "./controllers/Credential/AdminCreateCredentialController";
import { AdminEditCredentialController } from "./controllers/Credential/AdminEditCredentialController";

// Ticket Controllers
import { CreateTicketController } from "./controllers/Tickets/CreateTicketController";
import { OpenTicketController } from "./controllers/Tickets/OpenTicketController";
import { GetTicketController } from "./controllers/Tickets/GetTicketController";
import { ListTicketsController } from "./controllers/Tickets/ListTicketsController";
import { ListAttendantTicketsController } from "./controllers/Tickets/ListAttendantTicketsController";
import { ListAdminTicketsController } from "./controllers/Tickets/ListAdminTicketsController";
import { SendMessageTicketController } from "./controllers/Tickets/SendMessageTicketController";
import { ListTicketsOpenController } from "./controllers/Tickets/ListTicketsOpenController";

// Resume Controllers
import { GetAdminResumeController } from "./controllers/Resume/GetAdminResumeController";
import { GetUserResumeController } from "./controllers/Resume/GetUserResumeController";
import { GetCollaboratorResumeController } from "./controllers/Resume/GetCollaboratorResumeController";
import { ListEsocialController } from "./controllers/Enterprise/ListEsocialController";
import { ListEsocialAdminController } from "./controllers/Enterprise/ListEsocialAdminController";
import { ListAssociatesClientController } from "./controllers/Associate/ListAssociatesClientController";
import { ListEnterpriseTecnicoController } from "./controllers/Enterprise/ListEnterpriseTecnicoController";
import { EditEnterpriseTecnicoController } from "./controllers/Enterprise/EditEnterpriseTecnicoController";
import { CreateEnterpriseTecnicoController } from "./controllers/Enterprise/CreateEnterpriseTecnicoController";
import { DeleteEnterpriseTecnicoController } from "./controllers/Enterprise/DeleteEnterpriseTecnicoController";

const upload = multer(uploadConfig);
const router = Router();

/* ==========================================================================
   1. ROTAS PÚBLICAS (Sem necessidade de autenticação prévia)
   ========================================================================== */

// Autenticação & Recuperação de Senha
router.post("/session", new AuthUserController().handle);
router.post("/credential-session", new AuthCredentialController().handle);
router.post("/password-forgot", new PasswordForgotController().handle);
router.post("/password-reset/:code", new PasswordResetController().handle);
router.get(
  "/password-verify-reset/:code",
  new PasswordVerifyResetController().handle,
);

// Webhooks
router.post("/asaas/webhook", new ConfirmPaymentController().handle);

// Inteligência Artificial (IA)
router.get("/ia/risks", new GetRisksController().handle);
router.get("/ia/risks/images", new GetRisksImagesController().handle);
router.get("/ia/occupation", new GetOccupationalController().handle);
router.get("/ia/risk", new GetRiskDetailsController().handle);
router.get("/ia/assistent", new GetAssistentController().handle);

// Captura de Leads e Associados Públicos (Formulários Web)
router.post("/lead/web", new CreateLeadWebController().handle);
router.post("/associate/web", new CreateAssociateWebController().handle);

// Credenciados Públicos
router.get("/list-credentials", new ListCredentialsController().handle);
router.post(
  "/credential",
  upload.single("file"),
  new CreateCredentialController().handle,
);
router.get("/credential/:id", new GetCredentialController().handle);
router.put(
  "/completed/:id",
  upload.single("file"),
  new PublicEditCredentialController().handle,
);

// Banners Públicos
router.get("/banners-public", new ListBannersPublicController().handle);

// Contratos Públicos (Visualização, Assinatura e Negociação)
router.get("/contract/:id", new GetContractController().handle);
router.put("/signature-contract/:id", new SignatureContractController().handle);
router.put("/refusal-contract/:id", new RefusalContractController().handle);
router.put(
  "/negotiation-contract/:id",
  new NegotiationContractController().handle,
);

// Empresa Pública
router.get("/company/:company_id", new GetCompanyController().handle);
router.put("/company/:company_id", new EditCompanyController().handle);

// Pagamento Usuário / Utilitários Públicos
router.get("/payments/user", new GetPaymentUserController().handle);
router.delete("/all/leads", new DeleteManyLeadsMasterController().handle);
router.put("/all-renewal", new EditAllRenewalsController().handle);

/* ==========================================================================
   2. MIDDLEWARE DE AUTENTICAÇÃO BASE (Requer login do usuário)
   ========================================================================== */
router.use(isAuthenticated);

/* ==========================================================================
   3. ROTAS AUTENTICADAS (Franqueado, Cliente, Técnico, Atendente)
   ========================================================================== */

// Dashboard & Resumos do Usuário
router.post("/cliente/resume", new GetUserResumeController().handle);
router.post("/tecnico/resume", new GetCollaboratorResumeController().handle);

// Perfil de Usuário e Colaborador Logado
router.get("/user/me", new GetUserController().handle);
router.put("/user", upload.single("file"), new EditUserController().handle);
router.get("/collaborator", new GetCollaboratorController().handle);
router.put(
  "/collaborator",
  upload.single("file"),
  new EditCollaboratorController().handle,
);

// Gestão de Empresas (Enterprise - Franqueado)
router.post("/enterprise", new CreateEnterpriseController().handle);
router.get("/enterprises", new ListEnterpriseController().handle);
router.get("/esocial", new ListEsocialController().handle);
router.put("/enterprise/:id", new EditEnterpriseController().handle);

// Gestão de Empresas (Enterprise - Técnico)
router.post(
  "/tecnico/enterprise",
  new CreateEnterpriseTecnicoController().handle,
);
router.get(
  "/tecnico/enterprises",
  new ListEnterpriseTecnicoController().handle,
);
router.put(
  "/tecnico/enterprise/:id",
  new EditEnterpriseTecnicoController().handle,
);
router.delete(
  "/tecnico/enterprise/:id",
  new DeleteEnterpriseTecnicoController().handle,
);

// Ordens de Serviço (OS / Orders - Franqueado & Técnico)
router.get("/orders-open", new ListOpenOrdersController().handle);
router.get("/orders/:type", new ListOrdersController().handle);
router.get("/order/:id", new GetOrderController().handle);
router.post("/order", new CreateOrderController().handle);
router.put("/order/:id", new EditOrderController().handle);
router.put(
  "/order/edit-tecnico/:id",
  new EditCollaboratorOrderController().handle,
);
router.put("/accept-order/:id", new AcceptOrderController().handle);
router.put("/recused-order/:id", new RecusedOrderController().handle);
router.put("/status/:id", new StatusOrderController().handle);
router.put("/order-cancel/:id", new CancelOrderController().handle);
router.put("/send-order/:id", new SendOrderUrgentController().handle);
router.post(
  "/doc/:id",
  upload.single("file"),
  new CreateDocOrderController().handle,
);
router.delete(
  "/doc/:id",
  upload.single("file"),
  new DeleteDocOrderController().handle,
);
router.put(
  "/doc-recused-order/:order_id",
  new RecusedDocOrderController().handle,
);
router.post("/customer", new CreateCustomerController().handle);
router.post("/service-os/:id", new ServiceOSUserController().handle);

// Empresas Clientes & Integração SGG (Empresas, Setores, Riscos, Imagens)
router.get("/companies", new ListCompaniesController().handle);
router.get("/companies-confirm", new ListCompaniesConfirmController().handle);
router.post("/company", new CreateCompanyController().handle);
router.delete("/company/:company_id", new DeleteCompanyController().handle);
router.put(
  "/confirm-company/:company_id",
  new ConfirmCompanyController().handle,
);
router.put(
  "/company-handler/:company_id",
  new HandlerCompanyController().handle,
);
router.post(
  "/company-image/:company_id",
  upload.single("file"),
  new CreateImageCompanyController().handle,
);
router.delete("/company-image/:id", new DeleteImageCompanyController().handle);
router.put("/sgg/company/:company_id", new SggCompanyController().handle);
router.put("/sgg/sector/:sector_id", new SggSectorController().handle);
router.put("/risk-company/:risk_id", new EditRiskCompanyController().handle);
router.delete("/employe/:employe_id", new DeleteEmployeController().handle);
router.post("/sgg-company/:id", new IntegrationCompanyController().handle);
router.post("/sgg-sector/:id", new IntegrationSectorController().handle);
router.post("/sgg-employee/:id", new IntegrationJobController().handle);
router.post("/sgg-risks/:id", new IntegrationRisksController().handle);

// Renovações & Timelines de Empresas Clientes
router.post("/company-renewal", new CreateRenewalController().handle);
router.get("/companies-renewal", new ListRenewalsController().handle);
router.put("/company-renewal/:id", new EditRenewalController().handle);
router.delete("/company-renewal/:id", new DeleteRenewalController().handle);
router.delete("/all-renewal", new DeleteAllRenewalController().handle);
router.put("/renewal/:id", new CheckRenewalController().handle);

router.post("/company-timeline", new CreateTimelineController().handle);
router.get("/companies-timeline", new ListTimelinesController().handle);
router.put("/company-timeline/:id", new EditTimelineController().handle);
router.delete("/company-timeline/:id", new DeleteTimelineController().handle);
router.put("/timeline/:id", new CheckTimelineController().handle);
router.get("/timeline/:id", new GetTimelineController().handle);

// CRM & Leads (Franqueado)
router.get("/leads/me", new ListLeadsClientController().handle);
router.get("/my-leads", new ListMyLeadsController().handle);
router.get("/leads-buy", new ListLeadsBuyController().handle);
router.get("/leads-send", new ListLeadsSendController().handle);
router.get("/lead/:id", new GetLeadController().handle);
router.get("/leadmaster/:id", new GetLeadMasterController().handle);
router.post("/lead", new CreateLeadController().handle);
router.post("/lead/master", new CreateLeadMasterController().handle);
router.put("/lead/:id", new EditLeadController().handle);
router.put("/lead/master/:id", new EditLeadMasterController().handle);
router.put("/lead/status/:id", new StatusLeadController().handle);
router.put("/lead/send", new SendLeadController().handle);
router.put("/buy-lead/:id", new BuyLeadController().handle);
router.put("/reset-lead/:id", new ResetLeadController().handle);
router.delete("/lead/:id", new DeleteLeadController().handle);
router.delete("/lead/master/:id", new DeleteLeadMasterController().handle);

// CRM & Leads Matriz
router.post("/lead-matriz", new CreateLeadMatrizController().handle);
router.get("/leads-matriz", new ListLeadMatrizController().handle);
router.put("/lead-matriz/:id", new EditLeadMatrizController().handle);
router.put("/lead-matriz/move/:id", new MoveLeadMatrizController().handle);
router.delete("/lead-matriz/:id", new DeleteLeadMatrizController().handle);

// Contratos (Franqueado)
router.get("/contracts", new ListContractsController().handle);
router.post("/contract", new CreateContractController().handle);
router.put("/contract/:id", new EditContractController().handle);
router.put(
  "/end-negotiation-contract/:id",
  new EndNegotiationContractController().handle,
);
router.delete("/contract/:id", new DeleteContractController().handle);

// Serviços (Visão Franqueado/Cliente)
router.get("/services-client", new ListServicesClientController().handle);

// Cupons, Depósitos e Pagamentos (Franqueado)
router.post("/get/coupon", new GetCouponController().handle);
router.get("/payments", new ListPaymentsController().handle);
router.get("/payment/:id", new GetPaymentController().handle);
router.post("/deposit", new CreateDepositController().handle);
router.get("/deposit/:id", new GetDepositsController().handle);
router.get("/deposits", new ListDepositsController().handle);
router.get("/packages", new ListPackagesController().handle);

// Lembretes (Reminders)
router.post("/reminder", new CreateReminderController().handle);
router.get("/reminders", new ListRemindersController().handle);
router.put("/reminder/:id", new EditReminderController().handle);
router.delete("/reminder/:id", new DeleteReminderController().handle);
router.put("/confirm-reminder/:id", new ConfirmReminderController().handle);

// Comunicados (Statements - Leitura e Confirmação)
router.get("/statements-user", new ListStatementsUserController().handle);
router.get("/statements-last", new LastStatementsUserController().handle);
router.get("/statement/:id", new GetStatementController().handle);
router.put("/confirm-statement/:id", new ConfirmStatementController().handle);

// Associado (Visão Própria)
router.get("/associates", new ListAssociatesClientController().handle);
router.get("/associate", new GetAssociateController().handle);
router.get("/resume/associate", new ResumeAssociateController().handle);
router.get("/leads/associate", new ListAssociateLeadsController().handle);
router.get(
  "/payments/associate",
  new ListAssociateComissionsController().handle,
);
router.put(
  "/associate",
  upload.single("file"),
  new EditAssociateController().handle,
);

// Suporte e Tickets (Usuário, Técnico e Atendente)
router.post("/ticket", new OpenTicketController().handle);
router.post("/ticket/:ticket_id", new CreateTicketController().handle);
router.post("/message/:ticket_id", new SendMessageTicketController().handle);
router.get("/ticket/:ticket_id", new GetTicketController().handle);
router.get("/tickets", new ListTicketsController().handle);
router.get("/tickets/open", new ListTicketsOpenController().handle);
router.get("/attendant/tickets", new ListAttendantTicketsController().handle);
router.put("/accept-ticket/:ticket_id", new EditAllRenewalsController().handle);

// Cursos e Aulas (Visão Aluno/User)
router.get("/courses-user", new ListCoursesPublicController().handle);
router.get("/course/:course_id", new GetCoursePublicController().handle);
router.get("/lessons/:course_id", new ListLessonsController().handle);
router.get("/lesson/:id", new GetLessonController().handle);
router.post("/confirm-lesson/:id", new ConfirmLessonController().handle);

// Credenciados (Edição e Exclusão pelo Próprio Usuário Logado)
router.put(
  "/credential",
  upload.single("file"),
  new EditCredentialController().handle,
);
router.delete("/credential/:id", new DeleteCredentialController().handle);

// Gestão Admin & Técnico de Empresas Franqueado (Enterprise)
router.post("/admin/enterprise", new CreateEnterpriseAdminController().handle);
router.get("/admin/enterprises", new ListEnterpriseAdminController().handle);
router.get("/admin/esocial", new ListEsocialAdminController().handle);
router.put("/admin/enterprise/:id", new EditEnterpriseAdminController().handle);
router.delete(
  "/admin/enterprise/:id",
  new DeleteEnterpriseAdminController().handle,
);

/* ==========================================================================
   4. MIDDLEWARE DE AUTENTICAÇÃO ADMIN (Apenas Administradores)
   ========================================================================== */

// IS ADMIN HIBRIDO

router.get("/users", new ListUsersController().handle);
router.get("/collaborators", new ListCollaboratorsController().handle);

router.use(isAdmin);

/* ==========================================================================
   5. ROTAS RESTRITAS AO ADMIN (`isAdmin`)
   ========================================================================== */

// Dashboard / Resume Admin
router.post("/admin/resume", new GetAdminResumeController().handle);

// Gestão Admin de Usuários (Franqueados / Clientes)
router.get("/user/:id", new GetUserAdminController().handle);
router.post("/user", upload.single("file"), new CreateUserController().handle);
router.put(
  "/user/:id",
  upload.single("file"),
  new EditAdminUserController().handle,
);
router.delete("/user/:id", new DeleteUserController().handle);
router.get("/admin/users/ranking", new RankingUsersController().handle);

// Gestão Admin de Usuários Matriz
router.get("/users-matriz", new ListUsersMatrizController().handle);
router.get("/user-matriz/:id", new GetUserMatrizController().handle);
router.post(
  "/user-matriz",
  upload.single("file"),
  new CreateUserMatrizController().handle,
);
router.put(
  "/user-matriz/:id",
  upload.single("file"),
  new EditAdminUserMatrizController().handle,
);
router.delete("/user-matriz/:id", new DeleteUserMatrizController().handle);
router.get(
  "/admin/users-matriz/ranking",
  new RankingUsersMatrizController().handle,
);
router.post(
  "/service-os-matriz/:id",
  new ServiceOSUserMatrizController().handle,
);

// Gestão Admin de Colaboradores
router.get("/collaborator/:id", new GetCollaboratorAdminController().handle);
router.post(
  "/collaborator",
  upload.single("file"),
  new CreateCollaboratorController().handle,
);
router.put(
  "/collaborator/:id",
  upload.single("file"),
  new EditAdminCollaboratorController().handle,
);
router.delete("/collaborator/:id", new DeleteCollaboratorController().handle);
router.get(
  "/users-collaborator/:collaborator_id",
  new ListUsersCollaboratorController().handle,
);

// Gestão Admin de Administradores
router.get("/admins", new ListAdminsController().handle);
router.post(
  "/admin",
  upload.single("file"),
  new CreateAdminController().handle,
);
router.put(
  "/admin/:id",
  upload.single("file"),
  new EditAdminController().handle,
);
router.delete("/admin/:id", new DeleteAdminController().handle);

// Gestão Admin de Atendentes
router.get("/attendants", new ListAttendantsController().handle);
router.post(
  "/attendant",
  upload.single("file"),
  new CreateAttendantController().handle,
);
router.put(
  "/attendant/:id",
  upload.single("file"),
  new EditAttendantController().handle,
);
router.delete("/attendant/:id", new DeleteAttendantController().handle);

// Gestão Admin de Associados & Comissões
router.get("/associates", new ListAssociatesController().handle);
router.get(
  "/associate/:associate_id",
  new GetAdminAssociateController().handle,
);
router.post(
  "/associate",
  upload.single("file"),
  new CreateAssociateController().handle,
);
router.put(
  "/associate/:id",
  upload.single("file"),
  new EditAdminAssociateController().handle,
);
router.delete("/associate/:id", new DeleteAssociateController().handle);
router.get(
  "/resume/associate/:associate_id",
  new ResumeAdminAssociateController().handle,
);
router.get(
  "/leads/associate/:associate_id",
  new ListAdminAssociateLeadsController().handle,
);
router.get(
  "/payments/associate/:associate_id",
  new ListAdminAssociatePaymentsComissionController().handle,
);
router.post(
  "/payment/associate",
  new CreatePaymentComissionAssociateController().handle,
);

// Gestão Admin de Banners
router.get("/banners", new ListBannersController().handle);
router.post(
  "/banner",
  upload.single("file"),
  new CreateBannerController().handle,
);
router.put(
  "/banner/:id",
  upload.single("file"),
  new EditBannerController().handle,
);
router.delete("/banner/:id", new DeleteBannerController().handle);

// Gestão Admin de Cursos, Módulos e Aulas
router.get("/admin-course/:course_id", new GetCourseController().handle);
router.get("/courses", new ListCoursesController().handle);
router.post(
  "/course",
  upload.single("file"),
  new CreateCourseController().handle,
);
router.put(
  "/course/:id",
  upload.single("file"),
  new EditCourseController().handle,
);
router.delete("/course/:id", new DeleteCourseController().handle);
router.post("/module", new CreateModuleController().handle);
router.put("/module/:id", new EditModuleController().handle);
router.delete("/module/:id", new DeleteModuleController().handle);
router.post(
  "/lesson",
  upload.single("file"),
  new CreateLessonController().handle,
);
router.put(
  "/lesson/:id",
  upload.single("file"),
  new EditLessonController().handle,
);
router.delete("/lesson/:id", new DeleteLessonController().handle);

// Gestão Admin de Serviços do Sistema
router.get("/services", new ListServicesAdminController().handle);
router.post("/service", new CreateServiceController().handle);
router.put("/service/:id", new EditServiceController().handle);
router.delete("/service/:id", new DeleteServiceController().handle);

// Gestão Admin de Ordens de Serviço (OS)
router.get("/orders-admin", new ListAdminOrdersController().handle);
router.get("/orders-urgente", new ListAdminOrdersUrgentController().handle);
router.post("/list-orders", new ListAdminOrdersPeriodoController().handle);
router.get("/orders/:id", new ListAdminOrdersController().handle);

// Gestão Admin de CRM & Leads
router.get("/leads", new ListLeadsAdminController().handle);
router.get("/leads/:userId", new ListAdminLeadsClientController().handle);

// Gestão Admin de Contratos por Usuário
router.get("/contracts/:user_id", new AdminListContractsController().handle);

// Gestão Admin Financeira (Pagamentos, Depósitos e Pacotes)
router.get("/admin/payments", new ListAdminPaymentsController().handle);
router.post("/admin/deposit", new CreateDepositAdminController().handle);
router.get("/admin/deposits", new ListDepositsAdminController().handle);
router.post("/package", new CreatePackageController().handle);
router.put("/package/:id", new EditPackageController().handle);
router.delete("/package/:id", new DeletePackageController().handle);

// Gestão Admin de Credenciados
router.get(
  "/admin/list-credentials",
  new AdminListCredentialsController().handle,
);
router.post(
  "/admin/credential",
  upload.single("file"),
  new AdminCreateCredentialController().handle,
);
router.put(
  "/admin/credential/:id",
  upload.single("file"),
  new AdminEditCredentialController().handle,
);

// Gestão Admin de Cupons
router.get("/coupons", new ListCouponsController().handle);
router.post("/coupon", new CreateCouponController().handle);
router.put("/coupon/:id", new EditCouponController().handle);
router.delete("/coupon/:id", new DeleteCouponController().handle);

// Gestão Admin de Comunicados (Statements)
router.get("/statements", new ListStatementsController().handle);
router.post("/statement", new CreateStatementController().handle);
router.put("/statement/:id", new EditStatementController().handle);
router.delete("/statement/:id", new DeleteStatementController().handle);

// Gestão Admin de Tickets
router.get("/admin/tickets", new ListAdminTicketsController().handle);

export { router };
