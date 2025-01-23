import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { Sequelize } from "sequelize";

import { ConducteurModel } from "./model/Conducteur";
import { ConducteurVoitureModel } from "./model/ConducteurVoiture";
import { UserModel } from "./model/User";
import { VoitureModel } from "./model/Voiture";
import { voitureRouter } from "./router/voitures";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const User = UserModel(sequelize);
export const Voiture = VoitureModel(sequelize);
export const Conducteur = ConducteurModel(sequelize);
export const ConducteurVoiture = ConducteurVoitureModel(sequelize);

Voiture.belongsToMany(Conducteur, { through: ConducteurVoiture });
Conducteur.belongsToMany(Voiture, { through: ConducteurVoiture });

// sequelize.sync({ force: true });
sequelize.sync();

const app = express();

export async function monMiddleware(req: Request, res: Response, next: NextFunction){
  if(!req.headers.authorization){
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  console.log('authorization', req.headers.authorization)
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  console.log(login, password)

  const user = await User.findOne({
    where: {
      login: login,
      password: password
    }
  })

  if (!user) {
    res.status(403).json({ message: 'Forbidden' });
  }
  else {
    next();
  }
}

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/voitures", voitureRouter)

apiRouter.post("/auth/register", async (req, res) => {
  const user = await User.create({
    login: req.body.username,
    password: req.body.password
  });
  res.json(user.dataValues);
})

app.use("/api", monMiddleware, apiRouter);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
