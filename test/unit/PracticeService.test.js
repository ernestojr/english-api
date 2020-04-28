import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiArray from 'chai-arrays';

import { app } from '../fixtures/mocks';
import PracticeService from '../../src/services/PracticeService';

chai.use(sinonChai);
chai.use(chaiArray);

const sandbox = sinon.createSandbox();

describe('PracticeService', function() {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should create a new practice.', async () => {
    sandbox.stub(app.models.Practice, 'create').resolves(1);
    const instance = new PracticeService(app);
    const result = await instance.create(1);
    expect(app.models.Practice.create).to.have.been.calledOnce;
    expect(result).to.be.equal(1);
    expect(app.models.Practice.create).to.have.been.calledOnceWith(1);
  });

  it('Should get the first page practices.', async () => {
    sandbox.stub(app.models.Practice, 'find').resolves([]);
    sandbox.stub(app.models.Practice, 'countDocuments').resolves(0);
    sandbox.spy(app.services.UtilService, 'buidOpts');
    const instance = new PracticeService(app);
    const result = await instance.get({});
    expect(app.models.Practice.find).to.have.been.calledOnce;
    expect(app.models.Practice.countDocuments).to.have.been.calledOnce;
    expect(app.services.UtilService.buidOpts).to.have.been.calledOnce;
    expect(result).has.property('collection');
    expect(result.collection).to.be.equalTo([]);
    expect(result.collection).to.be.ofSize(0);
    expect(result).has.property('pagination');
    expect(result.pagination).has.property('count', 0);
    expect(result.pagination).has.property('limit', 10);
    expect(app.models.Practice.find).to.been.calledOnceWith(
      {},
      {},
      { limit: 10, skip: 0, sort: { createdAt: -1 } },
    );
    expect(app.models.Practice.countDocuments).to.been.calledOnceWith({});
    expect(app.services.UtilService.buidOpts).to.been.calledOnceWith({});
  });

  it('Should get one practice by id success.', async () => {
    sandbox.stub(app.models.Practice, 'findById').resolves(1);
    const instance = new PracticeService(app);
    const result = await instance.getById(1);
    expect(app.models.Practice.findById).to.have.been.calledOnce;
    expect(app.models.Practice.findById).to.have.been.calledOnceWith(1);
    expect(result).to.be.equals(1);
  });

  it('Should get one practice by id failed.', async () => {
    try {
      sandbox.stub(app.models.Practice, 'findById').resolves(undefined);
      const instance = new PracticeService(app);
      await instance.getById(1);
    } catch (error) {
      expect(error).has.property('statusCode', 404);
      expect(error).has.property('message', 'Practice 1 not found.');
      expect(app.models.Practice.findById).to.have.been.calledOnce;
    }
  });

  it('Should update one practice by id success.', async () => {
    sandbox.stub(app.models.Practice, 'updateOne').resolves(1);
    sandbox.stub(app.models.Practice, 'findById').resolves(1);
    const instance = new PracticeService(app);
    await instance.updateById(1, {});
    expect(app.models.Practice.findById).to.have.been.calledOnce;
    expect(app.models.Practice.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Practice.updateOne).to.have.been.calledOnce;
    expect(app.models.Practice.updateOne).to.have.been.calledOnceWith({ _id: 1 });
  });

  it('Should delete one practice by id success.', async () => {
    sandbox.stub(app.models.Practice, 'deleteOne').resolves(1);
    sandbox.stub(app.models.Practice, 'findById').resolves(1);
    const instance = new PracticeService(app);
    await instance.deleteById(1, {});
    expect(app.models.Practice.findById).to.have.been.calledOnce;
    expect(app.models.Practice.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Practice.deleteOne).to.have.been.calledOnce;
    expect(app.models.Practice.deleteOne).to.have.been.calledOnceWith({ _id: 1 });
  });
});
