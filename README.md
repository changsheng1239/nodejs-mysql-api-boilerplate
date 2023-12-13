# Nodejs MySQL API Boilerplate

This is a NodeJS API boilerplate using:

- Express
- Morgan (logging middleware)
- MySQL

## Development

This repo had been setup to run using devcontainer directly.

1. Clone this repo
2. Copy `.env.example` to `.env` and update the variable accordingly
3. Open the folder in devcontainer (vscode: `F1 > Dev Containers: Rebuild and Reopen in Container`)
4. The dependency will be installed automatically
   > `npm install` will be run automatically during devcontainer startup
5. run using `make`

   1. `make dev` to run on port `3000` or
   2. `make prod` to run using `pm2` on port

   > run `make restart` to apply changes into existing running instance (assumed as id 0) in pm2

## Environment variable

| Variable            | Description                    |
| ------------------- | ------------------------------ |
| DB_HOST             | MySQL server hostname          |
| DB_USER             | MySQL username                 |
| DB_PASSWORD         | MySQL passowrd                 |
| DB_DATABASE         | MySQL default database         |
| DB_CONNECTION_LIMIT | Database connection pool limit |
