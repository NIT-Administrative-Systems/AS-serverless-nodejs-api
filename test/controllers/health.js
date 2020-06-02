module.exports = (chai, app) => {
  describe('Health Check API', () => {
    it('should be healthy', (done) => {
      chai.request(app)
        .get('/health')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should 404 for an invalid route', (done) => {
      chai.request(app)
        .get('/skimbleshanks-the-railway-cat')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
};
