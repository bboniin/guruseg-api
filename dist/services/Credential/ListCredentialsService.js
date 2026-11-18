"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCredentialsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCredentialsService {
  async execute({
    state,
    city,
    service,
    page
  }) {
    let filter = {
      enabled: true,
      visible: true
    };
    if (state) {
      filter["OR"] = [{
        state: state
      }, {
        served_cities: {
          contains: state
        }
      }];
    }
    if (city) {
      filter["OR"] = [{
        AND: [{
          city: city
        }, {
          state: state
        }]
      }, {
        served_cities: {
          contains: city + ` - ${state};`
        }
      }];
    }
    if (service) {
      filter["services"] = {
        contains: service
      };
    }
    const credentialsTotal = await _prisma.default.credential.count({
      where: filter
    });
    const credentials = await _prisma.default.credential.findMany({
      where: filter,
      orderBy: {
        update_at: "desc"
      },
      skip: page * 30,
      take: 30,
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true
      }
    });
    const s3Storage = new _S3Storage.default();
    const credentialsResponse = await Promise.all(credentials.map(async credential => {
      if (credential.photo) {
        credential["photo_url"] = await s3Storage.getTemporaryUrl(credential.photo, 245);
      }
      return credential;
    }));
    return {
      credentials: credentialsResponse,
      total: credentialsTotal
    };
  }
}
exports.ListCredentialsService = ListCredentialsService;