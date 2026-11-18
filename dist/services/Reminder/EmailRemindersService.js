"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailReminderService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EmailReminderService {
  async execute() {
    const franqueados = await _prisma.default.user.findMany({
      where: {
        visible: true
      }
    });
    const resend = new _resend.Resend(process.env.RESEND_KEY);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(today.getDate() + 15);
    fifteenDaysFromNow.setHours(0, 0, 0, 0);
    franqueados.map(async item => {
      const listReminders = await _prisma.default.reminder.findMany({
        where: {
          confirm: false,
          user_id: item.id
        }
      });
      const remindersExpire = listReminders.filter(reminder => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        return reminderDate < today;
      });
      const remindersExpireToday = listReminders.filter(reminder => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        return (0, _dateFns.isSameDay)(reminderDate, today);
      });
      const remindersWithinRange = listReminders.filter(reminder => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);
        return reminderDate > today && reminderDate <= fifteenDaysFromNow;
      });
      if (remindersExpire.length || remindersExpireToday.length || remindersWithinRange.length) {
        const path = (0, _path.resolve)(__dirname, "..", "..", "views", "reminders.hbs");
        const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
        const templateParse = _handlebars.default.compile(templateFileContent);
        const templateHTML = templateParse({
          name: item.name,
          remindersExpire: remindersExpire.length,
          remindersExpireToday: remindersExpireToday.length,
          remindersWithinRange: remindersWithinRange.length,
          totalReminders: remindersExpire.length + remindersExpireToday.length + remindersWithinRange.length
        });
        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: item.email,
          subject: "[Guruseg] Alerta de Lembretes",
          html: templateHTML
        });
      }
    });
    return "Email finalizado";
  }
}
exports.EmailReminderService = EmailReminderService;