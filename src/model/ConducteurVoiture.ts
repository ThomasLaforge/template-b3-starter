import { DataTypes, Model, Sequelize } from "sequelize";

// Define type in TypeScript and add it to the Sequelize instance

interface ConducteurVoitureAttributes {
    voitureId: number;
    conducteurId: number;
}

export interface ConducteurVoitureInstance extends ConducteurVoitureAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export const ConducteurVoitureModel = (sequelize: Sequelize) => {
    return sequelize.define<Model<ConducteurVoitureAttributes, ConducteurVoitureAttributes>>('conducteurVoiture', {
        voitureId: DataTypes.NUMBER,
        conducteurId: DataTypes.NUMBER,
    });
}