# xxx

## Quick Setup for Dev

The project consists of two sub-projects, `client` and `server`, that are run independently. For further details see README in each sub-project.

**Requirements**

1. Docker

**Install Dependencies**
yarn-ing in the project root directory will install dependencies in all the sub-projects.

```
yarn
```

**Build the project**
Run from the root directory to build all the sub-projects

```
yarn build
```

**Running Backend**

1. Copy contents of `./packages/api/example.env` to `./packages/api/.env` by running `cp ./packages/api/example.env ./packages/api/.env`.
2. Start DB by running `docker-compose down && docker-compose up`.


**Running the App**

1. In root run `yarn start`
