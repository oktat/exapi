const supertest = require('supertest')

describe('GET /api/users', function() {

    const host = 'http://localhost:8000/api' 
    const restype= 'application/json; charset=utf-8'

    it('get /users', function(done) {
      supertest(host)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', restype)
        .expect(200, done)
    })
    it('post /register ', function(done) {
      supertest(host)
        .post('/register')
        .set('Accept', 'application/json')
        .send({
            name: 'mari',
            email: 'mari@zold.lan',
            password: 'titok',
            password_confirmation: 'titok'
        })
        .expect('Content-Type', restype)
        .expect(201, done)
    })

  })