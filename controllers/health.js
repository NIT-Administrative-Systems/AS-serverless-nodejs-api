const { HealthCheckPresenter } = require('../api-resources/meta/health-check');

exports.index = async (req, res, next) => {
  // @TODO: Add your own checks for your DB/etc
  const checks = [
    {
      id: 'api',
      checkName: 'API Responding',
      healthy: true,
      additionalDetail: {
        //
      },
    },
  ];

  const allHealthy = checks.map((check) => check.healthy).reduce((overall, checkStatus) => (checkStatus === false ? false : overall), true);

  res.status(allHealthy ? 200 : 500).send(HealthCheckPresenter.render(checks));
};
