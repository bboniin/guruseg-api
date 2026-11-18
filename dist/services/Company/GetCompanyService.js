"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    const s3Storage = new _S3Storage.default();
    await Promise.all(images.map(async item => {
      item["photo_url"] = await s3Storage.getTemporaryUrl(item.photo, 245);
      companyImages[item.index].push(item);
    }));
    return {
      ...company,
      companyImages: companyImages
    };
  }
}
exports.GetCompanyService = GetCompanyService;