import { Sequelize } from "sequelize-typescript";

import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllFileNames = (path: string) => {
  const fileNames = fs.readdirSync(path);
  return fileNames.map((fileName) => {
    return path + "/" + fileName.slice(0, -3);
  });
};

const importAllFileNames = async (path: string) => {
  const fileNames = fs.readdirSync(path);
  return await Promise.all(
    fileNames.map(async (fileName) => {
      const file = await import(path + "/" + fileName);
      for (let funcName in file) {
        return file[funcName];
      }
    })
  );
};

const pathToModel = (paths: Array <string> ) => {
  const normalizedFolder = path.join(...paths);
  return normalizedFolder
}

export async function connectToDB () {
  try {
    const normalizedFolder = pathToModel([__dirname, '..', 'models'])
    const POSTGRES_DB = process.env.POSTGRES_DB;
    const POSTGRES_USER = process.env.POSTGRES_USER;
    const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
    const modelNames = getAllFileNames(normalizedFolder);
    const importedFiles = await importAllFileNames(normalizedFolder);
    
    const sequelize = new Sequelize({
      dialect: "postgres",
      host: "telegram_db",
      database: POSTGRES_DB,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      models: modelNames,
    });
    sequelize.sync();
    sequelize.addModels(importedFiles);
  } catch (e) {
    console.error('error connectToDB');
    console.error(e);
  }
}


// import pg from "pg";

// const Client = pg.Client;

// // console.log("process.env", process.env);

// const client = new Client({
//   host: "telegram_db",
//   user: "telegram",
//   database: "telegram",
//   password: "546754itmes",
//   port: 5432,
// });
// client.connect();
// client.query("SELECT * FROM user", (err, res) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("res", res);
//   console.log(res.rows);
//   // client.end();
// });
