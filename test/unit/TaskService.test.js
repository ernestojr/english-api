import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiArray from 'chai-arrays';

import { app } from '../fixtures/mocks';
import TaskService from '../../src/services/TaskService';

chai.use(sinonChai);
chai.use(chaiArray);

const sandbox = sinon.createSandbox();

describe('TaskService', function() {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should create a new task.', async () => {
    sandbox.stub(app.models.Task, 'create').resolves(1);
    const instance = new TaskService(app);
    const result = await instance.create(1);
    expect(app.models.Task.create).to.have.been.calledOnce;
    expect(result).to.be.equal(1);
    expect(app.models.Task.create).to.have.been.calledOnceWith(1);
  });

  it('Should get the first page tasks.', async () => {
    sandbox.stub(app.models.Task, 'find').resolves([]);
    sandbox.stub(app.models.Task, 'countDocuments').resolves(0);
    sandbox.spy(app.services.UtilService, 'buidOpts');
    const instance = new TaskService(app);
    const result = await instance.get({});
    expect(app.models.Task.find).to.have.been.calledOnce;
    expect(app.models.Task.countDocuments).to.have.been.calledOnce;
    expect(app.services.UtilService.buidOpts).to.have.been.calledOnce;
    expect(result).has.property('collection');
    expect(result.collection).to.be.equalTo([]);
    expect(result.collection).to.be.ofSize(0);
    expect(result).has.property('pagination');
    expect(result.pagination).has.property('count', 0);
    expect(result.pagination).has.property('limit', 10);
    expect(app.models.Task.find).to.been.calledOnceWith(
      {},
      {},
      { limit: 10, skip: 0, sort: { createdAt: -1 } },
    );
    expect(app.models.Task.countDocuments).to.been.calledOnceWith({});
    expect(app.services.UtilService.buidOpts).to.been.calledOnceWith({});
  });

  it('Should get one task by id success.', async () => {
    sandbox.stub(app.models.Task, 'findById').resolves(1);
    const instance = new TaskService(app);
    const result = await instance.getById(1);
    expect(app.models.Task.findById).to.have.been.calledOnce;
    expect(app.models.Task.findById).to.have.been.calledOnceWith(1);
    expect(result).to.be.equals(1);
  });

  it('Should get one task by id failed.', async () => {
    try {
      sandbox.stub(app.models.Task, 'findById').resolves(undefined);
      const instance = new TaskService(app);
      await instance.getById(1);
    } catch (error) {
      expect(error).has.property('statusCode', 404);
      expect(error).has.property('message', 'Task 1 not found.');
      expect(app.models.Task.findById).to.have.been.calledOnce;
    }
  });

  it('Should update one task by id success.', async () => {
    sandbox.stub(app.models.Task, 'updateOne').resolves(1);
    sandbox.stub(app.models.Task, 'findById').resolves(1);
    const instance = new TaskService(app);
    await instance.updateById(1, {});
    expect(app.models.Task.findById).to.have.been.calledOnce;
    expect(app.models.Task.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Task.updateOne).to.have.been.calledOnce;
    expect(app.models.Task.updateOne).to.have.been.calledOnceWith({ _id: 1 });
  });

  it('Should delete one task by id success.', async () => {
    sandbox.stub(app.models.Task, 'removeOne').resolves(1);
    sandbox.stub(app.models.Task, 'findById').resolves(1);
    const instance = new TaskService(app);
    await instance.deleteById(1, {});
    expect(app.models.Task.findById).to.have.been.calledOnce;
    expect(app.models.Task.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Task.removeOne).to.have.been.calledOnce;
    expect(app.models.Task.removeOne).to.have.been.calledOnceWith({ _id: 1 });
  });
});
