# NodeJS API Template
This is a [JSON:API](https://jsonapi.org/) service that can be quickly deployed to AWS. The tech stack is:

- [Express](https://expressjs.com/)
    - [dougmoscrop/serverless-http](https://github.com/dougmoscrop/serverless-http), to make it event-driven instead of a server when deployed
    - [nusso](https://github.com/NIT-Administrative-Systems/nusso-node) for authentication
- [yayson](https://github.com/confetti/yayson) for serializing/deserialzing JSON:API requests
- [mocha](https://mochajs.org/) & [chai](https://www.chaijs.com/) (with [chai-http](https://www.chaijs.com/plugins/chai-http/)) for testing

Note that this does not include a database driver out of the box.

## Running for Development
You will need NodeJS and Yarn installed. 

```sh
# Set up .env file w/ DB credentials/etc
$ cp -r .env.example .env
$ vi .env # or your editor of choice -- set the missing variables (and add your own, etc)

$ yarn install

# Verify everything is working
$ yarn test

# Start the server
$ yarn start
```

Visit `http://localhost:3000` to confirm the API is up.

## Customizing
The following files should be customized:

- [`middleware/authorization.js`](./middleware/authorization.js) should load users/permissions from your user provider
- [`controllers/health.js`](./controllers/health.js) should include app-specific checks
- [`iac/modules/microservice.tf`](./iac/modules/microservice.tf) should have your app name
- [`iac/develop`](./iac/develop) needs to have the example files copied to `.tf` files and customized with environment variables/etc

## Deploying to AWS
The included Jenkinsfile will run the deployment to AWS. Assuming you have customized the IaC files listed above, it should Just Work™.

One of the outputs from Terraform will be the Amazon API endpoint. This module does not set up a custom domain for it; instead, we have been using Apigee as a vanity domain for these services.
