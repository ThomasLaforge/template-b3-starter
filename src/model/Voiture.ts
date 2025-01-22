import { DataTypes, Model, Sequelize } from "sequelize";

// Define type in TypeScript and add it to the Sequelize instance

interface VoitureAttributes {
    name: string;
    immatriculation_date: number,
}

export interface VoitureInstance extends VoitureAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export const VoitureModel = (sequelize: Sequelize) => {
    return sequelize.define<Model<VoitureAttributes, VoitureAttributes>>('voiture', {
        name: DataTypes.STRING,
        immatriculation_date: DataTypes.NUMBER,
    });
}