import config from "config";
import mongoose from "mongoose";

let connection = {
  jakas_poultryConnection: mongoose.createConnection(
    config.get<string>("db.connection.jakas_poultry.url")
  )
};

export { connection };
