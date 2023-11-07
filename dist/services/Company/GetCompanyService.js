"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetCompanyService {
  async execute({
    company_id
  }) {
    const company = await _prisma.default.company.findUnique({
      where: {
        id: company_id
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc"
              }
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc"
              }
            }
          }
        }
      }
    });
    const images = await _prisma.default.companyImages.findMany({
      where: {
        company_id: company_id,
        index: {
          lt: company.companySector.length
        }
      }
    });
    let companyImages = [];

    for (let i = 0; i < company.companySector.length; i++) {
      companyImages.push([]);
    }

    images.map(item => {
      item["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item.photo;
      companyImages[item.index].push(item);
    });
    return { ...company,
      companyImages: companyImages
    };
  }

}

exports.GetCompanyService = GetCompanyService;