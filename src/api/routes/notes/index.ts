import express, { Router, Request, Response, NextFunction } from "express";
import controller from "./notes.controller";

const route = Router();

export default (app: express.Router) => {
  app.use("/notes", route);

  route.get("/", controller.getAllNotes);

  route.post("/add", controller.addNote);

  route.delete("/delete/:id", controller.deleteNote);

  route.patch('/update/:id', controller.updateNote)


  route.get("/check", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "notes running....",
    });
  });
};
