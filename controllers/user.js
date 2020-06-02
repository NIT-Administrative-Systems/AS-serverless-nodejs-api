const userRepo = require('../repositories/user');
const { UserPresenter } = require('../api-resources/user');
const authorize = require('../support/authorize');

exports.index = async (req, res, next) => {
  try {
    authorize('access_users', req.user);
    const page = parseInt(req.query.page, 10) || 1;

    const users = await userRepo.all(page);
    res.send(UserPresenter.render(users.partialSet, {
      meta: {
        total_pages: users.totalPages,
        total_items: users.totalItems,
        per_page: users.page_size,
      },
    }));
  } catch (e) {
    next(e);
  }
};
