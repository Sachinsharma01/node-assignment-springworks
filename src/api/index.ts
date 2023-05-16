import { NextFunction, Router, Request, Response } from "express";
import notes from "./routes/notes";
import express from 'express';

export default () => {
  const app: express.Router = Router();
  notes(app);

  return app
};
