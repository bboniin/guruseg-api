"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsBuyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListLeadsBuyService {
  async execute({
    page,
    location,
    userId
  }) {
    const userBalance = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!userBalance) {
      throw new Error("Franqueado não encontrado");
    }
    let filter = {
      leads: {
        none: {}
      },
      price: {
        gt: 0
      }
    };
    if (location) {
      filter["location"] = {
        contains: location,
        mode: "insensitive"
      };
    }
    const listLeadsTotal = await _prisma.default.leadMaster.count({
      where: filter
    });
    const listLeads = await _prisma.default.leadMaster.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
        email: true,
        location: true,
        necessity: true,
        create_at: true,
        price: true
      }
    });
    function maskFullName(name) {
      return name.split(" ").map(part => {
        if (part.length <= 1) return part;
        return part[0] + "*".repeat(part.length - 1);
      }).join(" ");
    }
    function maskEmail(email) {
      const [user, domain] = email.split("@");
      if (!user) return email;
      const maskedUser = user[0] + "*".repeat(user.length - 1);
      return maskedUser + "@" + domain;
    }
    function maskPhone(phone) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 3) return phone;
      const ddd = digits.slice(0, 2);
      const firstDigit = digits[2];
      const masked = "*".repeat(digits.length - 3);
      return `(${ddd}) ${firstDigit}${masked}`;
    }
    listLeads.map(item => {
      item.name = maskFullName(item.name);
      item.email = maskEmail(item.email);
      item.phone_number = maskPhone(item.phone_number);
    });
    return {
      leads: listLeads,
      leadsTotal: listLeadsTotal,
      balance_leads: userBalance.balance_leads
    };
  }
}
exports.ListLeadsBuyService = ListLeadsBuyService;