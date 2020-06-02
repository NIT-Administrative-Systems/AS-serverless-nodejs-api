// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');

const getName = (ssmPath) => {
  const nameFrags = ssmPath.split('/');

  return nameFrags[nameFrags.length - 1];
};

const getSecrets = async (Names) => {
  const ssm = new AWS.SSM();

  const ssmResponse = await ssm.getParameters({
    Names,
    WithDecryption: true,
  }).promise();

  const secretHash = {};
  ssmResponse.Parameters.forEach((param) => {
    secretHash[getName(param.Name)] = param.Value;
  });

  return secretHash;
};

module.exports = async (req, res, next) => {
  try {
    // If this isn't serverless, skip it.
    // Local dev envs just have .env files w/ credentials.
    if (process.env.SERVERLESS_RUNTIME !== '1') {
      return next();
    }

    const secretNames = process.env.SSM_SECRETS.split(',');

    // Once added to process.env, the Lambda runtime will remember the SSM secrets for its lifetime
    // So, check to see if we have the params already & skip loading them. SSM has rate-limiting on GetParameter,
    // so it's best not to load secrets unnecessarily.
    //
    // This *does* mean that changing a secret in SSM will not immediately be reflected on the ground. You can
    // redeploy the Lambda after updating a secret to ensure you've got a fresh runtime.
    const unloadedSecrets = secretNames.filter((ssmPath) => process.env[getName(ssmPath)] === undefined);

    if (unloadedSecrets.length === 0) {
      console.log('No secrets to load, skipping SSM GetParameters');
      return next();
    }

    console.log(`Loading ${unloadedSecrets.length} secrets from SSM...`);

    const secrets = await getSecrets(unloadedSecrets);
    Object.entries(secrets).forEach((obj) => {
      process.env[obj[0]] = obj[1];
    });
  } catch (error) {
    return next(error);
  }

  return next();
};
