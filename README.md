# Docker Compose Nodejs and MySQL example

## Run the System

We can easily run the whole with only a single command:

```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:

```bash
docker-compose up -d
```

## Stop the System

Stopping all the running containers is also simple with a single command:

```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:

```bash
docker-compose down --rmi all
```

For more detail, please visit:

> [Dockerize Node.js Express and MySQL example - Docker Compose](https://www.bezkoder.com/docker-compose-nodejs-mysql/)

Related Posts:

> [Build Node.js Rest APIs with Express & MySQL](https://www.bezkoder.com/node-js-rest-api-express-mysql/)

> [Upload/store images in MySQL using Node.js, Express & Multer](https://www.bezkoder.com/node-js-upload-image-mysql/)

> [Node.js: Upload CSV file data into Database with Express](https://bezkoder.com/node-js-upload-csv-file-database/)

> [Node.js: Upload Excel file data into Database with Express](https://www.bezkoder.com/node-js-upload-excel-file-database/)

> [Build Node.js Rest APIs with Express, Sequelize & MySQL](https://bezkoder.com/node-js-express-sequelize-mysql/)

> [Server side Pagination in Node.js with Sequelize and MySQL](https://bezkoder.com/node-js-sequelize-pagination-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Security:

> [Node.js Express: JWT example | Token Based Authentication & Authorization](https://bezkoder.com/node-js-jwt-authentication-mysql/)

Associations:

> [Sequelize Associations: One-to-Many Relationship example](https://bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://bezkoder.com/sequelize-associate-many-to-many/)

# https://velog.io/@ktseo41/TIW-1%EC%9B%94-26%EC%9D%BC-docker-mysql-%ED%95%9C%EA%B8%80-%ED%8C%A8%EC%8A%A4%EC%9B%8C%EB%93%9C-docker-compose-secret-%EC%9D%B4%EC%9A%A9-%EB%93%B1-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%91%EC%84%B1
