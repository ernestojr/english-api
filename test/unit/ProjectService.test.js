import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiArray from 'chai-arrays';

import { app } from '../fixtures/mocks';
import ProjectService from '../../src/services/ProjectService';

chai.use(sinonChai);
chai.use(chaiArray);

const sandbox = sinon.createSandbox();

describe('ProjectService', function() {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should create a new project.', async () => {
    sandbox.stub(app.models.Project, 'create').resolves(1);
    const instance = new ProjectService(app);
    const result = await instance.create(1);
    expect(app.models.Project.create).to.have.been.calledOnce;
    expect(result).to.be.equal(1);
    expect(app.models.Project.create).to.have.been.calledOnceWith(1);
  });

  it('Should get the first page projects.', async () => {
    sandbox.stub(app.models.Project, 'find').resolves([]);
    sandbox.stub(app.models.Project, 'countDocuments').resolves(0);
    sandbox.spy(app.services.UtilService, 'buidOpts');
    const instance = new ProjectService(app);
    const result = await instance.get({});
    expect(app.models.Project.find).to.have.been.calledOnce;
    expect(app.models.Project.countDocuments).to.have.been.calledOnce;
    expect(app.services.UtilService.buidOpts).to.have.been.calledOnce;
    expect(result).has.property('collection');
    expect(result.collection).to.be.equalTo([]);
    expect(result.collection).to.be.ofSize(0);
    expect(result).has.property('pagination');
    expect(result.pagination).has.property('count', 0);
    expect(result.pagination).has.property('limit', 10);
    expect(app.models.Project.find).to.been.calledOnceWith(
      {},
      {},
      { limit: 10, skip: 0, sort: { createdAt: -1 } },
    );
    expect(app.models.Project.countDocuments).to.been.calledOnceWith({});
    expect(app.services.UtilService.buidOpts).to.been.calledOnceWith({});
  });

  it('Should get one project by id success.', async () => {
    sandbox.stub(app.models.Project, 'findById').resolves(1);
    const instance = new ProjectService(app);
    const result = await instance.getById(1);
    expect(app.models.Project.findById).to.have.been.calledOnce;
    expect(app.models.Project.findById).to.have.been.calledOnceWith(1);
    expect(result).to.be.equals(1);
  });

  it('Should get one project by id failed.', async () => {
    try {
      sandbox.stub(app.models.Project, 'findById').resolves(undefined);
      const instance = new ProjectService(app);
      await instance.getById(1);
    } catch (error) {
      expect(error).has.property('statusCode', 404);
      expect(error).has.property('message', 'Project 1 not found.');
      expect(app.models.Project.findById).to.have.been.calledOnce;
    }
  });

  it('Should update one project by id success.', async () => {
    sandbox.stub(app.models.Project, 'updateOne').resolves(1);
    sandbox.stub(app.models.Project, 'findById').resolves(1);
    const instance = new ProjectService(app);
    await instance.updateById(1, {});
    expect(app.models.Project.findById).to.have.been.calledOnce;
    expect(app.models.Project.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Project.updateOne).to.have.been.calledOnce;
    expect(app.models.Project.updateOne).to.have.been.calledOnceWith({
      _id: 1,
    });
  });

  it('Should delete one project by id success.', async () => {
    sandbox.stub(app.models.Project, 'deleteOne').resolves(1);
    sandbox.stub(app.models.Project, 'findById').resolves(1);
    const instance = new ProjectService(app);
    await instance.deleteById(1, {});
    expect(app.models.Project.findById).to.have.been.calledOnce;
    expect(app.models.Project.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Project.deleteOne).to.have.been.calledOnce;
    expect(app.models.Project.deleteOne).to.have.been.calledOnceWith({
      _id: 1,
    });
  });
});
