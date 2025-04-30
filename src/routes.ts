import { Router } from "express";
import multer from "multer";

import { AuthAdminController } from "./controllers/Admin/AuthAdminController";

import uploadConfig from "./config/multer";

import { AuthUserController } from "./controllers/User/AuthUserController";
import { CreateUserController } from "./controllers/Admin/Users/CreateUserController";
import { EditUserController } from "./controllers/User/EditUserController";

import { AuthCollaboratorController } from "./controllers/Collaborator/AuthCollaboratorController";
import { CreateCollaboratorController } from "./controllers/Admin/Collaborators/CreateCollaboratorController";
import { EditCollaboratorController } from "./controllers/Collaborator/EditCollaboratorController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateServiceController } from "./controllers/Service/CreateServiceController";
import { EditServiceController } from "./controllers/Service/EditServiceController";
import { DeleteServiceController } from "./controllers/Service/DeleteServiceController";

import { CreateDocOrderController } from "./controllers/Order/CreateDocOrderController";
import { DeleteDocOrderController } from "./controllers/Order/DeleteDocOrderController";
import { ListOrdersController } from "./controllers/Order/ListOrdersController";
import { GetOrderController } from "./controllers/Order/GetOrderController";
import { CancelOrderController } from "./controllers/Order/CancelOrderController";
import { CreateOrderController } from "./controllers/Order/CreateOrderController";
import { AcceptOrderController } from "./controllers/Order/AcceptOrdersController";
import { StatusOrderController } from "./controllers/Order/StatusOrdersController";
import { ListOpenOrdersController } from "./controllers/Order/ListOpenOrdersController";

import { EditAdminUserController } from "./controllers/Admin/Users/EditAdminUserController";
import { EditAdminCollaboratorController } from "./controllers/Admin/Collaborators/EditAdminCollaboratorController";
import { ListUsersController } from "./controllers/Admin/Users/ListUsersController";
import { ListCollaboratorsController } from "./controllers/Admin/Collaborators/ListCollaboratorsController";
import { DeleteUserController } from "./controllers/Admin/Users/DeleteUserController";
import { DeleteCollaboratorController } from "./controllers/Admin/Collaborators/DeleteCollaboratorController";
import { GetUserAdminController } from "./controllers/Admin/Users/GetUserController";
import { GetCollaboratorAdminController } from "./controllers/Admin/Collaborators/GetCollaboratorAdminController";
import { ListAdminOrdersController } from "./controllers/Admin/ListAdminOrdersController";

import { ListBannersPublicController } from "./controllers/Admin/Banners/ListBannersPublicController";
import { ListBannersController } from "./controllers/Admin/Banners/ListBannersController";
import { CreateBannerController } from "./controllers/Admin/Banners/CreateBannerController";
import { EditBannerController } from "./controllers/Admin/Banners/EditBannerController";
import { DeleteBannerController } from "./controllers/Admin/Banners/DeleteBannerController";

import { ListCoursesController } from "./controllers/Admin/Courses/ListCoursesController";
import { CreateCourseController } from "./controllers/Admin/Courses/CreateCourseController";
import { EditCourseController } from "./controllers/Admin/Courses/EditCourseController";
import { DeleteCourseController } from "./controllers/Admin/Courses/DeleteCourseController";
import { ListLessonsController } from "./controllers/Admin/Lessons/ListLessonsController";
import { CreateLessonController } from "./controllers/Admin/Lessons/CreateLessonController";
import { EditLessonController } from "./controllers/Admin/Lessons/EditLessonController";
import { DeleteLessonController } from "./controllers/Admin/Lessons/DeleteLessonController";
import { ListCoursesPublicController } from "./controllers/Admin/Courses/ListCoursesPublicController";
import { GetLessonController } from "./controllers/Admin/Lessons/GetLessonController";
import { GetCoursePublicController } from "./controllers/Admin/Courses/GetCoursePublicController";
import { GetContractController } from "./controllers/Contract/GetContractController";
import { ListContractsController } from "./controllers/Contract/ListContractsController";
import { AdminListContractsController } from "./controllers/Contract/AdminListContractController";
import { CreateContractController } from "./controllers/Contract/CreateContractController";
import { SignatureContractController } from "./controllers/Contract/SignatureContractController";
import { RefusalContractController } from "./controllers/Contract/RefusalContractController";
import { PasswordForgotController } from "./controllers/User/PasswordForgotController";
import { PasswordResetController } from "./controllers/User/PasswordResetController";
import { PasswordVerifyResetController } from "./controllers/User/PasswordVerifyResetController";
import { RecusedOrderController } from "./controllers/Order/RecusedOrdersController";
import { ListCredentialsController } from "./controllers/Credential/ListCredentialsController";
import { AdminListCredentialsController } from "./controllers/Credential/AdminListOrdersController";
import { AdminCreateCredentialController } from "./controllers/Credential/AdminCreateCredentialController";
import { AdminEditCredentialController } from "./controllers/Credential/AdminEditCredentialController";
import { CreateCredentialController } from "./controllers/Credential/CreateCredentialController";
import { GetCredentialController } from "./controllers/Credential/GetCredentialController";
import { DeleteCredentialController } from "./controllers/Credential/DeleteCredentialController";
import { EditCredentialController } from "./controllers/Credential/EditCredentialController";
import { AuthCredentialController } from "./controllers/Credential/AuthCredentialController";
import { PublicEditCredentialController } from "./controllers/Credential/PublicEditCredentialController";
import { DeleteContractController } from "./controllers/Contract/DeleteCredentialController";
import { GetCollaboratorController } from "./controllers/Collaborator/GetCollaboratorController";
import { GetUserController } from "./controllers/User/GetUserController";
import { ConfirmOrderController } from "./controllers/Order/ConfirmOrderController";
import { HandlerOrderController } from "./controllers/Order/HandlerOrderController";
import { GetCourseController } from "./controllers/Admin/Courses/GetCourseControlle";
import { ListAdminOrdersPeriodoController } from "./controllers/Admin/ListAdminOrdersPeriodoController";
import { ListUsersCollaboratorController } from "./controllers/Admin/Collaborators/ListUsersCollaboratorController";
import { ServiceOSUserController } from "./controllers/Admin/Users/ServiceOSUserController";
import { GetCompanyController } from "./controllers/Company/GetCompanyController";
import { ListCompaniesController } from "./controllers/Company/ListCompaniesController";
import { ListCompaniesConfirmController } from "./controllers/Company/ListCompaniesConfirmController";
import { CreateCompanyController } from "./controllers/Company/CreateCompanyController";
import { DeleteCompanyController } from "./controllers/Company/DeleteCompanyController";
import { ConfirmCompanyController } from "./controllers/Company/ConfirmCompanyController";
import { HandlerCompanyController } from "./controllers/Company/HandlerCompanyController";
import { DeleteImageCompanyController } from "./controllers/Company/DeleteImageCompanyController";
import { CreateImageCompanyController } from "./controllers/Company/CreateImageCompanyController";
import { EditCompanyController } from "./controllers/Company/EditCompanyController";
import { RecusedDocOrderController } from "./controllers/Order/RecusedDocOrderController";
import { CreateRenewalController } from "./controllers/CompanyRenewal/CreateRenewalController";
import { ListRenewalsController } from "./controllers/CompanyRenewal/ListRenewalsController";
import { EditRenewalController } from "./controllers/CompanyRenewal/EditRenewalController";
import { DeleteRenewalController } from "./controllers/CompanyRenewal/DeleteRenewalController";
import { CheckRenewalController } from "./controllers/CompanyRenewal/CheckRenewalController";
import { CreateTimelineController } from "./controllers/CompanyTimeline/CreateTimelineController";
import { ListTimelinesController } from "./controllers/CompanyTimeline/ListTimelinesController";
import { EditTimelineController } from "./controllers/CompanyTimeline/EditTimelineController";
import { DeleteTimelineController } from "./controllers/CompanyTimeline/DeleteTimelineController";
import { CheckTimelineController } from "./controllers/CompanyTimeline/CheckTimelineController";
import { GetTimelineController } from "./controllers/CompanyTimeline/GetTimelineController";
import { DeleteAllRenewalController } from "./controllers/CompanyRenewal/DeleteAllRenewalController";
import { EditAllRenewalsController } from "./controllers/CompanyRenewal/EditAllRenewalsController";
import { ListServicesAdminController } from "./controllers/Service/ListServicesAdminController";
import { ListServicesClientController } from "./controllers/Service/ListServicesClientController";
import { DeleteEmployeController } from "./controllers/Company/DeleteEmployeController";
import { ListLeadsClientController } from "./controllers/Lead/ListLeadsClientController";
import { CreateLeadController } from "./controllers/Lead/CreateLeadController";
import { CreateLeadWebController } from "./controllers/Lead/CreateLeadWebController";
import { EditLeadController } from "./controllers/Lead/EditLeadController";
import { StatusLeadController } from "./controllers/Lead/StatusLeadController";
import { GetLeadController } from "./controllers/Lead/GetLeadController";
import { ListLeadsController } from "./controllers/Lead/ListLeadsController";
import { DeleteLeadController } from "./controllers/Lead/DeleteLeadController";
import { SendLeadController } from "./controllers/Lead/SendLeadController";
import { CreateLeadMasterController } from "./controllers/Lead/CreateLeadMasterController";
import { DeleteLeadMasterController } from "./controllers/Lead/DeleteLeadMasterController";
import { EditLeadMasterController } from "./controllers/Lead/EditLeadMasterController";
import { ListAdminLeadsClientController } from "./controllers/Lead/ListAdminLeadsClientController";
import { EditContractController } from "./controllers/Contract/EditContractController";
import { NegotiationContractController } from "./controllers/Contract/NegotiationContractController";
import { EndNegotiationContractController } from "./controllers/Contract/EndNegotiationContractController";
import { ListMyLeadsController } from "./controllers/Lead/ListMyLeadsController";
import { ListRemindersController } from "./controllers/Reminder/ListRemindersController";
import { CreateReminderController } from "./controllers/Reminder/CreateReminderController";
import { EditReminderController } from "./controllers/Reminder/EditReminderController";
import { DeleteReminderController } from "./controllers/Reminder/DeleteReminderController";
import { ConfirmReminderController } from "./controllers/Reminder/ConfirmReminderController";
import { ResetLeadController } from "./controllers/Lead/ResetLeadController";
import { ListLeadsCloseController } from "./controllers/Lead/ListLeadsCloseController";
import { CreateStatementController } from "./controllers/Statement/CreateStatementController";
import { ListStatementsController } from "./controllers/Statement/ListStatementsController";
import { EditStatementController } from "./controllers/Statement/EditStatementController";
import { DeleteStatementController } from "./controllers/Statement/DeleteStatementController";
import { ConfirmStatementController } from "./controllers/Statement/ConfirmStatementController";
import { ListStatementsUserController } from "./controllers/Statement/ListStatementsUserController";
import { GetStatementController } from "./controllers/Statement/GetStatementController";
import { CreatePaymentController } from "./controllers/Payment/CreatePaymentController";
import { ConfirmPaymentController } from "./controllers/Payment/ConfirmPaymentController";
import { ListPaymentsController } from "./controllers/Payment/ListPaymentsController";
import { ListAdminPaymentsController } from "./controllers/Payment/ListAdminPaymentsController";
import { CreateCustomerController } from "./controllers/Payment/CreateCustomerController";
import { CreateCouponController } from "./controllers/Coupon/CreateCouponController";
import { ListCouponsController } from "./controllers/Coupon/ListCouponsController";
import { EditCouponController } from "./controllers/Coupon/EditCouponController";
import { DeleteCouponController } from "./controllers/Coupon/DeleteCouponController";
import { GetCouponController } from "./controllers/Coupon/GetCouponController";

const upload = multer(uploadConfig);

const router = Router();

// Routes Publics

router.post("/lead/web", new CreateLeadWebController().handle);
router.put("/all-renewal", new EditAllRenewalsController().handle);
router.post("/session", new AuthUserController().handle);
router.post("/credential-session", new AuthCredentialController().handle);
router.get("/banners-public", new ListBannersPublicController().handle);
router.get("/contract/:id", new GetContractController().handle);
router.put("/signature-contract/:id", new SignatureContractController().handle);
router.put("/refusal-contract/:id", new RefusalContractController().handle);
router.post("/asaas/webhook", new ConfirmPaymentController().handle);
router.put(
  "/negotiation-contract/:id",
  new NegotiationContractController().handle
);
router.post("/password-forgot", new PasswordForgotController().handle);
router.post("/password-reset/:code", new PasswordResetController().handle);
router.get(
  "/password-verify-reset/:code",
  new PasswordVerifyResetController().handle
);

router.get("/list-credentials", new ListCredentialsController().handle);
router.post(
  "/credential",
  upload.single("file"),
  new CreateCredentialController().handle
);
router.get("/credential/:id", new GetCredentialController().handle);
router.put(
  "/completed/:id",
  upload.single("file"),
  new PublicEditCredentialController().handle
);

router.get("/company/:company_id", new GetCompanyController().handle);
router.put("/company/:company_id", new ConfirmCompanyController().handle);

router.use(isAuthenticated);

router.get("/services", new ListServicesAdminController().handle);
router.get("/payments", new ListPaymentsController().handle);
router.get("/services-client", new ListServicesClientController().handle);

// Credential

router.put(
  "/credential",
  upload.single("file"),
  new EditCredentialController().handle
);
router.delete("/credential/:id", new DeleteCredentialController().handle);
router.post(
  "/admin/credential",
  upload.single("file"),
  new AdminCreateCredentialController().handle
);
router.put(
  "/admin/credential/:id",
  upload.single("file"),
  new AdminEditCredentialController().handle
);

// Users and Colaborators

router.get("/course/:course_id", new GetCoursePublicController().handle);
router.get("/courses-user", new ListCoursesPublicController().handle);
router.put("/user", upload.single("file"), new EditUserController().handle);
router.put(
  "/collaborator",
  upload.single("file"),
  new EditCollaboratorController().handle
);

// Routes Clientes e Técnicos

router.put(
  "/doc-recused-order/:order_id",
  new RecusedDocOrderController().handle
);

router.post("/get/coupon", new GetCouponController().handle);
router.get("/orders-open", new ListOpenOrdersController().handle);
router.get("/orders/:type", new ListOrdersController().handle);
router.get("/order/:id", new GetOrderController().handle);
router.put("/confirm-order/:id", new ConfirmOrderController().handle);
router.post("/order/payment/:id", new CreatePaymentController().handle);
router.post("/customer", new CreateCustomerController().handle);
router.put("/alteracao-order", new HandlerOrderController().handle);
router.post("/order", new CreateOrderController().handle);
router.put("/accept-order/:id", new AcceptOrderController().handle);
router.put("/recused-order/:id", new RecusedOrderController().handle);
router.put("/status/:id", new StatusOrderController().handle);
router.put("/order-cancel/:id", new CancelOrderController().handle);
router.post(
  "/doc/:id",
  upload.single("file"),
  new CreateDocOrderController().handle
);
router.delete(
  "/doc/:id",
  upload.single("file"),
  new DeleteDocOrderController().handle
);

router.get("/user", new GetUserController().handle);
router.get("/collaborator", new GetCollaboratorController().handle);

// Routes Admin

router.post("/list-orders", new ListAdminOrdersPeriodoController().handle);
router.get(
  "/admin/list-credentials",
  new AdminListCredentialsController().handle
);
router.get("/admin/payments", new ListAdminPaymentsController().handle);
router.post("/credential", new AdminCreateCredentialController().handle);
router.put("/credential", new AdminEditCredentialController().handle);

router.get("/users/:type", new ListUsersController().handle);
router.post("/user", upload.single("file"), new CreateUserController().handle);
router.put(
  "/user/:id",
  upload.single("file"),
  new EditAdminUserController().handle
);
router.delete("/user/:id", new DeleteUserController().handle);

router.get("/collaborators", new ListCollaboratorsController().handle);
router.post(
  "/collaborator",
  upload.single("file"),
  new CreateCollaboratorController().handle
);
router.put(
  "/collaborator/:id",
  upload.single("file"),
  new EditAdminCollaboratorController().handle
);
router.delete("/collaborator/:id", new DeleteCollaboratorController().handle);

router.get("/banners", new ListBannersController().handle);
router.post(
  "/banner",
  upload.single("file"),
  new CreateBannerController().handle
);
router.put(
  "/banner/:id",
  upload.single("file"),
  new EditBannerController().handle
);
router.delete("/banner/:id", new DeleteBannerController().handle);

router.get("/admin-course/:course_id", new GetCourseController().handle);
router.get("/courses", new ListCoursesController().handle);
router.post(
  "/course",
  upload.single("file"),
  new CreateCourseController().handle
);
router.put(
  "/course/:id",
  upload.single("file"),
  new EditCourseController().handle
);
router.delete("/course/:id", new DeleteCourseController().handle);

router.get("/lesson/:id", new GetLessonController().handle);
router.get("/lessons/:course_id", new ListLessonsController().handle);
router.post(
  "/lesson",
  upload.single("file"),
  new CreateLessonController().handle
);
router.put(
  "/lesson/:id",
  upload.single("file"),
  new EditLessonController().handle
);
router.delete("/lesson/:id", new DeleteLessonController().handle);

router.get("/user/:id", new GetUserAdminController().handle);
router.get(
  "/users-collaborator/:collaborator_id",
  new ListUsersCollaboratorController().handle
);
router.get("/collaborator/:id", new GetCollaboratorAdminController().handle);
router.get("/orders/:type/:id", new ListAdminOrdersController().handle);

// Services

router.post("/service", new CreateServiceController().handle);
router.put("/service/:id", new EditServiceController().handle);
router.delete("/service/:id", new DeleteServiceController().handle);

// Contracts

router.get("/contracts", new ListContractsController().handle);
router.get("/contracts/:user_id", new AdminListContractsController().handle);
router.post("/contract", new CreateContractController().handle);
router.put("/contract/:id", new EditContractController().handle);
router.put(
  "/end-negotiation-contract/:id",
  new EndNegotiationContractController().handle
);
router.delete("/contract/:id", new DeleteContractController().handle);

// CRM

router.get("/lead/:id", new GetLeadController().handle);
router.get("/leads/me", new ListLeadsClientController().handle);
router.get("/leads/:userId", new ListAdminLeadsClientController().handle);
router.get("/leads", new ListLeadsController().handle);
router.get("/my-leads", new ListMyLeadsController().handle);
router.get("/leads-close", new ListLeadsCloseController().handle);
router.post("/lead", new CreateLeadController().handle);
router.post("/lead/master", new CreateLeadMasterController().handle);
router.put("/lead/send", new SendLeadController().handle);
router.put("/lead/:id", new EditLeadController().handle);
router.put("/lead/master/:id", new EditLeadMasterController().handle);
router.put("/lead/status/:id", new StatusLeadController().handle);
router.put("/reset-lead/:id", new ResetLeadController().handle);
router.delete("/lead/:id", new DeleteLeadController().handle);
router.delete("/lead/master/:id", new DeleteLeadMasterController().handle);

// Companies

router.get("/companies", new ListCompaniesController().handle);
router.get("/companies-confirm", new ListCompaniesConfirmController().handle);
router.post("/company", new CreateCompanyController().handle);
router.delete("/company/:company_id", new DeleteCompanyController().handle);
router.post(
  "/company-image/:company_id",
  upload.single("file"),
  new CreateImageCompanyController().handle
);
router.delete("/company-image/:id", new DeleteImageCompanyController().handle);
router.put(
  "/company-handler/:company_id",
  new HandlerCompanyController().handle
);
router.put("/company-edit/:company_id", new EditCompanyController().handle);
router.delete("/employe/:employe_id", new DeleteEmployeController().handle);

router.post("/service-os/:id", new ServiceOSUserController().handle);

router.post("/company-renewal", new CreateRenewalController().handle);
router.get("/companies-renewal", new ListRenewalsController().handle);
router.put("/company-renewal/:id", new EditRenewalController().handle);
router.delete("/company-renewal/:id", new DeleteRenewalController().handle);
router.delete("/all-renewal", new DeleteAllRenewalController().handle);
router.put("/renewal/:id", new CheckRenewalController().handle);

router.post("/reminder/:lead_id", new CreateReminderController().handle);
router.get("/reminders", new ListRemindersController().handle);
router.put("/reminder/:id", new EditReminderController().handle);
router.delete("/reminder/:id", new DeleteReminderController().handle);
router.put("/confirm-reminder/:id", new ConfirmReminderController().handle);

router.get("/statement/:id", new GetStatementController().handle);
router.post("/statement", new CreateStatementController().handle);
router.get("/statements", new ListStatementsController().handle);
router.get("/statements-user", new ListStatementsUserController().handle);
router.put("/statement/:id", new EditStatementController().handle);
router.delete("/statement/:id", new DeleteStatementController().handle);
router.put("/confirm-statement/:id", new ConfirmStatementController().handle);

router.post("/company-timeline", new CreateTimelineController().handle);
router.get("/companies-timeline", new ListTimelinesController().handle);
router.put("/company-timeline/:id", new EditTimelineController().handle);
router.delete("/company-timeline/:id", new DeleteTimelineController().handle);
router.put("/timeline/:id", new CheckTimelineController().handle);
router.get("/timeline/:id", new GetTimelineController().handle);

router.post("/coupon", new CreateCouponController().handle);
router.get("/coupons", new ListCouponsController().handle);
router.put("/coupon/:id", new EditCouponController().handle);
router.delete("/coupon/:id", new DeleteCouponController().handle);

export { router };
