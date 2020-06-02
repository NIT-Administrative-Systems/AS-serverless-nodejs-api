const { Presenter } = require('yayson')();

class UserPresenter extends Presenter {}
UserPresenter.prototype.type = 'User';

// eslint-disable-next-line func-names
UserPresenter.prototype.attributes = function (...args) {
  const attrs = Presenter.prototype.attributes.apply(this, args);

  return attrs;
};

module.exports = { UserPresenter };
