import { Sequelize } from 'sequelize';
// This will automatically create a 'database.sqlite' file in your project root
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});
//# sourceMappingURL=database.js.map