import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiArray from 'chai-arrays';

import { app } from '../fixtures/mocks';
import WordService from '../../src/services/WordService';

chai.use(sinonChai);
chai.use(chaiArray);

const sandbox = sinon.createSandbox();

describe('WordService', function() {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should create a new word.', async () => {
    sandbox.stub(app.models.Word, 'create').resolves(1);
    const instance = new WordService(app);
    const result = await instance.create(1);
    expect(app.models.Word.create).to.have.been.calledOnce;
    expect(result).to.be.equal(1);
    expect(app.models.Word.create).to.have.been.calledOnceWith(1);
  });

  it('Should get the first page words.', async () => {
    sandbox.stub(app.models.Word, 'find').resolves([]);
    sandbox.stub(app.models.Word, 'countDocuments').resolves(0);
    sandbox.spy(app.services.UtilService, 'buidOpts');
    const instance = new WordService(app);
    const result = await instance.get({});
    expect(app.models.Word.find).to.have.been.calledOnce;
    expect(app.models.Word.countDocuments).to.have.been.calledOnce;
    expect(app.services.UtilService.buidOpts).to.have.been.calledOnce;
    expect(result).has.property('collection');
    expect(result.collection).to.be.equalTo([]);
    expect(result.collection).to.be.ofSize(0);
    expect(result).has.property('pagination');
    expect(result.pagination).has.property('count', 0);
    expect(result.pagination).has.property('limit', 10);
    expect(app.models.Word.find).to.been.calledOnceWith(
      {},
      {},
      { limit: 10, skip: 0, sort: { createdAt: -1 } },
    );
    expect(app.models.Word.countDocuments).to.been.calledOnceWith({});
    expect(app.services.UtilService.buidOpts).to.been.calledOnceWith({});
  });

  it('Should get one word by id success.', async () => {
    sandbox.stub(app.models.Word, 'findById').resolves(1);
    const instance = new WordService(app);
    const result = await instance.getById(1);
    expect(app.models.Word.findById).to.have.been.calledOnce;
    expect(app.models.Word.findById).to.have.been.calledOnceWith(1);
    expect(result).to.be.equals(1);
  });

  it('Should get one word by id failed.', async () => {
    try {
      sandbox.stub(app.models.Word, 'findById').resolves(undefined);
      const instance = new WordService(app);
      await instance.getById(1);
    } catch (error) {
      expect(error).has.property('statusCode', 404);
      expect(error).has.property('message', 'Word 1 not found.');
      expect(app.models.Word.findById).to.have.been.calledOnce;
    }
  });

  it('Should update one word by id success.', async () => {
    sandbox.stub(app.models.Word, 'updateOne').resolves(1);
    sandbox.stub(app.models.Word, 'findById').resolves(1);
    const instance = new WordService(app);
    await instance.updateById(1, {});
    expect(app.models.Word.findById).to.have.been.calledOnce;
    expect(app.models.Word.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Word.updateOne).to.have.been.calledOnce;
    expect(app.models.Word.updateOne).to.have.been.calledOnceWith({ _id: 1 });
  });

  it('Should delete one word by id success.', async () => {
    sandbox.stub(app.models.Word, 'deleteOne').resolves(1);
    sandbox.stub(app.models.Word, 'findById').resolves(1);
    const instance = new WordService(app);
    await instance.deleteById(1, {});
    expect(app.models.Word.findById).to.have.been.calledOnce;
    expect(app.models.Word.findById).to.have.been.calledOnceWith(1);
    expect(app.models.Word.deleteOne).to.have.been.calledOnce;
    expect(app.models.Word.deleteOne).to.have.been.calledOnceWith({ _id: 1 });
  });
});
