import UtilService from '../../src/services/UtilService';
import Exception from '../../src/core/Exception';

const model = {
  create: function() {},
  find: function() {},
  findById: function() {},
  countDocuments: function() {},
  updateOne: function() {},
  deleteOne: function() {},
};

export const app = {
  models: {
    Module: { ...model },
    Phase: { ...model },
    Practice: { ...model },
    Word: { ...model },
  },
  services: {
    UtilService: new UtilService({}),
  },
  Exception,
};
