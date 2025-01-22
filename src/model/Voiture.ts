import { DataTypes, Sequelize } from "sequelize";

export const VoitureModel = (sequelize: Sequelize) => {
    return sequelize.define('voiture', {
        name: DataTypes.STRING,
        immatriculation_date: DataTypes.NUMBER,
    });
}