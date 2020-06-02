const { Presenter } = require('yayson')();

class HealthCheckPresenter extends Presenter {}
HealthCheckPresenter.prototype.type = 'HealthCheck';

// eslint-disable-next-line func-names
HealthCheckPresenter.prototype.attributes = function (...args) {
  const attrs = Presenter.prototype.attributes.apply(this, args);

  // Mangle stuff here
  // attrs.start = moment.utc(attrs.start).toDate();

  return attrs;
};

module.exports = { HealthCheckPresenter };
