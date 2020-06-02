module.exports = (chai, app) => {
  describe('User API', () => {
    it('should list users', (done) => {
      chai.request(app)
        .get('/user')
        .set('Cookie', `nusso=${process.env.NUSSO_MOCK_VALID_COOKIE}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should fail without an SSO session', (done) => {
      chai.request(app)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
};
