const mongoose = require('mongoose');

const express = require('express');
const dotenv = require('dotenv');
//import process from 'process';
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

app.use(express.json());

async function connect() {
  const dbUri = process.env.DATABASE;
  try {
    //@ts-ignore
    await mongoose.connect(dbUri);
    console.log('DB connected');
  } catch (error) {
    console.log('Could not connect to db');
    //process.exit(1);
  }
}

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);

  await connect();

  ///routes(app);
}); //export default connect;
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
