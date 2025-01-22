import { DataTypes, Model, Sequelize } from "sequelize";

// Define type in TypeScript and add it to the Sequelize instance

interface ConducteurAttributes {
    firstName: string;
    lastName: string;
    voiture_id?: number;
    voitures?: any[]
}

export interface ConducteurInstance extends ConducteurAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export const ConducteurModel = (sequelize: Sequelize) => {
    return sequelize.define<Model<ConducteurAttributes, ConducteurAttributes>>('conducteur', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
    });
}