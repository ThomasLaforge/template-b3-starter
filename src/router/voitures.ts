import { Router } from "express";
import { Voiture } from "..";

export const voitureRouter = Router();

voitureRouter.post('/', async (req, res) => {
  const voiture = await Voiture.create({
    name: req.body.data.name,
    immatriculation_date: req.body.data.immatriculation_date
  });
  res.status(201).json(voiture);
})

voitureRouter.get("/:id", async (req, res) => {
  const myCar = await Voiture.findByPk(parseInt(req.params.id));
  if(!myCar) {
    res.status(404).json({ message: "Voiture not found" });
    return;
  }
  else {
    res.json(myCar)
  }
})

voitureRouter.put("/:id", async (req, res) => {
  const myCar: any = await Voiture.findByPk(parseInt(req.params.id));
  if(!myCar) {
    res.status(404).json({ message: "Voiture not found" });
    return;
  }
  else {
    myCar.name = req.body.data.name;
    myCar.immatriculation_date = req.body.data.immatriculation_date;
    await myCar.save();
    res.json(myCar);
  }
})

voitureRouter.get("/", async (req, res) => {
  const voitures = await Voiture.findAll();
  res.json(voitures);
})

voitureRouter.delete("/:id", async (req, res) => {
  const myCar: any = await Voiture.findByPk(parseInt(req.params.id));
   if(!myCar) {
    res.status(404).json({ message: "Voiture not found" });
    return;
  }
  else {
    await myCar.destroy();
    res.json({ message: "Voiture deleted" });
  }
})