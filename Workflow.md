### Environment variables
  Make sure you have all your environment variables in `.env` file. Otherwise, the project will not start.
  
```bash
PORT=4000 - The port on which the server will run
SALT=salty - Salt for hashing passwords
DB_HOST=localhost - The database host
DB_USER=mongo - The database user name
DB_PASSWORD=mongo - The database password
DB_PORT=27017 - The database port
DB_NAME=six-cities - The database name
UPLOAD_DIRECTORY=/Users/bega/projects/edu/node-htmlacademy/six-cities/upload/ - The directory for uploading files
JWT_SECRET=secret - The secret key for JWT
```

### Start the project

1. Install dependencies
```bash 
npm install
```

2. Build project
```bash
npm run build
```

3. Start project
```bash
npm run start:rest
```

### All scenarios in `package.json`

1. Install dependencies
```bash 
npm install
```
