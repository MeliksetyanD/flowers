import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export default new DataSource({
    
  type: "mysql",
  host: "localhost", // Хост базы данных
  port: 3306, // Порт MySQL
  username: "root", // Пользователь базы данных
  password: "12345678", // Пароль базы данных
  database: "flowers", // Имя базы данных
  synchronize: true, // Автоматическое создание таблиц
  entities: [Product, User]
});