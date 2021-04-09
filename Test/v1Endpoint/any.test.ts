import { expect } from 'chai'
import app from '../../src'
import { agent as Request } from 'supertest'

describe('Request any url to v1 [/v1/*]', function () {
  it('Should return 404', function (done) {
    Request(app)
      .get('/v1/anything')
      .then((res) => {
        expect(res.status).to.equal(404)
        expect(res.body.code).to.equal(404)
        expect(res.body.status).to.equal('Not Found')
        expect(res.body.error).to.be.a('string')
        return done()
      })
    .catch((err) => done(err))
  })
})