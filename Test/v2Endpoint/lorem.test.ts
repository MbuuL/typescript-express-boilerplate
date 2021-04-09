import { expect } from 'chai'
import app from '../../src'
import { agent as Request } from 'supertest'

describe('Request any url to v1 [/v2/*]', function () {
  it('[/v2/lorem] should return OK', function (done) {
    Request(app)
      .get('/v2/lorem')
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body.code).to.equal(200)
        expect(res.body.status).to.equal('OK')
        expect(res.body.data).to.be.a('string')
        return done()
      })
      .catch((err) => done(err))
  })
})