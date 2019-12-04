import { expect } from 'chai';

import UtilService from '../../src/services/UtilService';

describe('UtilService', function() {
  it('Should build a default options object.', function() {
    const instance = new UtilService({});
    const query = {};
    const result = instance.buidOpts(query);
    expect(result).to.be.property('all', false);
    expect(result).to.be.property('fields');
    expect(result.fields).to.be.empty;
    expect(result).to.be.property('limit', 10);
    expect(result).to.be.property('skip', 0);
    expect(result).to.be.property('sort');
    expect(result.sort).to.be.property('createdAt', -1);
  });

  it('Should build a specific options object.', function() {
    const instance = new UtilService({});
    const query = {
      all: 'true',
      fields: 'name, done',
    };
    const result = instance.buidOpts(query);
    expect(result).to.be.property('all', true);
    expect(result).to.be.property('fields');
    expect(result.fields).to.be.property('name', 1);
    expect(result.fields).to.be.property('done', 1);
    expect(result).to.be.property('sort');
    expect(result.sort).to.be.property('createdAt', -1);
  });
});
