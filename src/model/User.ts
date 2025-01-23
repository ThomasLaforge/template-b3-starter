import { DataTypes, Model, Sequelize } from "sequelize";

// Define type in TypeScript and add it to the Sequelize instance

interface UserAttributes {
    login: string;
    password: string;
}

export interface UserInstance extends UserAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define<Model<UserAttributes, UserAttributes>>('user', {
        login: DataTypes.STRING,
        password: DataTypes.STRING,
    });
}