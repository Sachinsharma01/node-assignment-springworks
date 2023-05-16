import { Response } from "express";

const success = (res: Response, message: string, data: object) => {
  res.status(200).json({
    error: false,
    message,
    data,
  });
};

const badRequest = (res: Response, message: string, data: object) => {
  res.status(400).json({
    error: true,
    message,
    data,
  });
};

const notFound = (res: Response, message: string, data: object) => {
  res.status(404).json({
    error: true,
    message,
    data,
  });
};

const unAuthorized = (res: Response, message: string, data: object) => {
  res.status(401).json({
    error: true,
    message,
    data,
  });
};


export default {
    success,
    badRequest,
    notFound,
    unAuthorized
}
