import { isSameDay } from "date-fns";
import prismaClient from "../../prisma";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";

class EmailReminderService {
  async execute() {
    const franqueados = await prismaClient.user.findMany({
      where: {
        visible: true,
      },
    });

    const resend = new Resend(process.env.RESEND_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(today.getDate() + 15);
    fifteenDaysFromNow.setHours(0, 0, 0, 0);

    franqueados.map(async (item) => {
      const listReminders = await prismaClient.leadReminders.findMany({
        where: {
          confirm: false,
          lead: {
            is: {
              user_id: item.id,
            },
          },
        },
      });

      const remindersExpire = listReminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);

        return reminderDate < today;
      });

      const remindersExpireToday = listReminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);

        return isSameDay(reminderDate, today);
      });

      const remindersWithinRange = listReminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0, 0, 0, 0);

        return reminderDate > today && reminderDate <= fifteenDaysFromNow;
      });

      if (
        remindersExpire.length ||
        remindersExpireToday.length ||
        remindersWithinRange.length
      ) {
        const path = resolve(__dirname, "..", "..", "views", "reminders.hbs");

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
          name: item.name,
          remindersExpire: remindersExpire.length,
          remindersExpireToday: remindersExpireToday.length,
          remindersWithinRange: remindersWithinRange.length,
          totalReminders:
            remindersExpire.length +
            remindersExpireToday.length +
            remindersWithinRange.length,
        });

        await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: item.email,
          subject: "[Guruseg] Alerta de Lembretes",
          html: templateHTML,
        });
      }
    });
    return "Email finalizado";
  }
}

export { EmailReminderService };
