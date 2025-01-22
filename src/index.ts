import cors from "cors";
import "dotenv/config";
import express from "express";
import { Sequelize } from "sequelize";

import { ConducteurModel } from "./model/Conducteur";
import { ConducteurVoitureModel } from "./model/ConducteurVoiture";
import { VoitureModel } from "./model/Voiture";
import { voitureRouter } from "./router/voitures";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Voiture = VoitureModel(sequelize);
export const Conducteur = ConducteurModel(sequelize);
export const ConducteurVoiture = ConducteurVoitureModel(sequelize);

Voiture.belongsToMany(Conducteur, { through: ConducteurVoiture });
Conducteur.belongsToMany(Voiture, { through: ConducteurVoiture });

// sequelize.sync({ force: true });
sequelize.sync();

setTimeout( async () => {
  // await Voiture.create({ name: "Peugeot 206", immatriculation_date: 2001 });
  // await Voiture.create({ name: "Renault Clio", immatriculation_date: 2005 });

  // await Conducteur.create({ firstName: "Jean", lastName: "Dupont"});
  // await Conducteur.create({ firstName: "Marie", lastName: "Durand"});

  // await ConducteurVoiture.create({ voitureId: 1, conducteurId: 2 });
  // await ConducteurVoiture.create({ voitureId: 2, conducteurId: 1 });

  const data = await Conducteur.findAll({
    include: Voiture,
    where: {
      firstName: "Jean"
    }
  })

  // SELECT *
  // FROM Conducteur, Voiture
  // WHERE Conducteur.firstName = "Jean" AND Conducteur.id = ConducteurVoiture.conducteurId AND Voiture.id = ConducteurVoiture.voitureId

  const premierConducteur = data[0];
  if(premierConducteur.dataValues.voitures){
    console.log(premierConducteur.dataValues.voitures[0].dataValues);
  }
  
}
, 2000);
const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/voitures", voitureRouter)

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
