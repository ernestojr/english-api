import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiArray from 'chai-arrays';

import { app } from '../fixtures/mocks';
import ModuleService from '../../src/services/ModuleService';

chai.use(sinonChai);
chai.use(chaiArray);

const sandbox = sinon.createSandbox();

describe('ModuleService', function() {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should create a new module.', async () => {
    sandbox.stub(app.models.Module, 'create').resolves(1);
    const instance = new ModuleService(app);
    const result = await instance.create(1);
    expect(app.models.Module.create).to.have.been.calledOnce;
    expect(result).to.be.equal(1);
    expect(app.models.Module.create).to.have.been.calledOnceWith(1);
  });

  it('Should get the first page modules.', async () => {
    sandbox.stub(app.models.Module, 'find').resolves([]);
    sandbox.stub(app.models.Module, 'countDocuments').resolves(0);
    sandbox.spy(app.services.UtilService, 'buidOpts');
    const instance = new ModuleService(app);
    const result = await instance.get({});
    expect(app.models.Module.find).to.have.been.calledOnce;
    expect(app.models.Module.countDocuments).to.have.been.calledOnce;
    expect(app.services.UtilService.buidOpts).to.have.been.calledOnce;
    expect(result).has.property('collection');
    expect(result.collection).to.be.equalTo([]);
    expect(result.collection).to.be.ofSize(0);
    expect(result).has.property('pagination');
    expect(result.pagination).has.property('count', 0);
    expect(result.pagination).has.property('limit', 10);
    expect(app.models.Module.find).to.been.calledOnceWith(
      {},
      {},
      { limit: 10, skip: 0, sort: { createdAt: -1 } },
    );
    expect(app.models.Module.countDocuments).to.been.calledOnceWith({});
    expect(app.services.UtilService.buidOpts).to.been.calledOnceWith({});
  });

  it('Should get one module by id success.', async () => {
    sandbox.stub(app.models.Module, 'findById').resolves(1);
    const instance = new ModuleService(app);
    const result = await instance.getById(1);
    expect(app.models.Module.findById).to.have.been.calledOnce;
    expect(app.models.Module.findById).to.have.been.calledOnceWith(1);
    expect(result).to.be.equals(1);
  });

  it('Should get one module by id failed.', async () => {
    try {
      sandbox.stub(app.models.Module, 'findById').resolves(undefined);
      const instance = new ModuleService(app);
      await instance.getById(1);
    } catch (error) {
      expect(error).has.property('statusCode', 404);
      expect(error).has.property('message', 'Module 1 not found.');
      expect(app.models.Module.findById).to.have.been.calledOnce;
    }
  });

  it('Should update one module by id success.', async () => {
    sandbox.stub(app.models.Module, 'updateOne').resolves(1);
    sandbox.stub(app.models.Module, 'findById').resolves(1);
    const instance = new ModuleService(app);
    await instance.updateById(1, {});
    expect(app.models.Module.findById).to.have.been.calledOnce;
    expect(app.models.Module.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Module.updateOne).to.have.been.calledOnce;
    expect(app.models.Module.updateOne).to.have.been.calledOnceWith({ _id: 1 });
  });

  it('Should delete one module by id success.', async () => {
    sandbox.stub(app.models.Module, 'deleteOne').resolves(1);
    sandbox.stub(app.models.Module, 'findById').resolves(1);
    const instance = new ModuleService(app);
    await instance.deleteById(1, {});
    expect(app.models.Module.findById).to.have.been.calledOnce;
    expect(app.models.Module.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Module.deleteOne).to.have.been.calledOnce;
    expect(app.models.Module.deleteOne).to.have.been.calledOnceWith({ _id: 1 });
  });
});
