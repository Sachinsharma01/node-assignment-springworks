import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import apiRoutes from './api'
import config from "./config";

const startServer = () => {
  const PORT = config.port;

  const app: express.Application = express();

  //! middleware here
  app.use(express.json());
  app.use(cors());

//   const route = Router()
  app.use('/api', apiRoutes())

  app.get('/healthCheck',(req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Server Running fine...."
    })
  })

  app.listen(PORT, () => {
    console.log(
      `################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################`
    );
  });
};

startServer();
