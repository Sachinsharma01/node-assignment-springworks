import { NextFunction, Request, Response } from "express";
import APIResponses from "../../../config/responses";

//! importing the json file
const fs = require("fs");
let filePath = `${__dirname}\\data\\notes.json`;
const notes = JSON.parse(fs.readFileSync(filePath));

const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return APIResponses.success(res, "All notes fetched", notes);
  } catch (err) {
    console.log("Error ocurred in get all notes API", err);
    return APIResponses.badRequest(res, "Something went wrong!", {});
  }
};

const addNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body: any = req.body;
    if (!body.hasOwnProperty("note")) {
      return APIResponses.badRequest(res, "Body can not be empty", {});
    }
    let noteId = notes.length != 0 ? notes[notes.length - 1]?.noteId + 1 : 0;
    let newNote = Object.assign({ noteId }, req.body);
    notes.push(newNote);
    fs.writeFile(filePath, JSON.stringify(notes), (err: any) => {
      // console.log("error ocurred", err)
    });
    return APIResponses.success(res, "New Note Added", newNote);
  } catch (err) {
    console.log("Error ocurred in get all notes API", err);
    return APIResponses.badRequest(res, "Something went wrong!", {});
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.hasOwnProperty("id")) {
      return APIResponses.badRequest(res, "Please provide notId", {});
    }

    let noteId = +req.params.id;
    let lastNodeId = notes[notes.length - 1].noteId;
    if (noteId > lastNodeId || noteId < 0) {
      return APIResponses.badRequest(res, "Invalid Id", {});
    }
    let newNotes = notes.filter((note: any) => {
      return note.noteId !== noteId;
    });

    fs.writeFile(filePath, JSON.stringify(newNotes), (err: any) => {
      // console.log("error ocurred", err)
    });

    return APIResponses.success(res, "Note deleted", newNotes);
  } catch (err) {
    return APIResponses.badRequest(res, "Something went wrong!", {});
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body: any = req.body;
    if (!body.hasOwnProperty("note")) {
      return APIResponses.badRequest(res, "Body can not be empty", {});
    }

    if (!req.params.hasOwnProperty("id")) {
      return APIResponses.badRequest(res, "Please provide notId", {});
    }

    let noteId = +req.params.id;
    let lastNodeId = notes[notes.length - 1].noteId;
    if (noteId > lastNodeId || noteId < 0) {
      return APIResponses.badRequest(res, "Invalid Id", {});
    }
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].noteId === noteId) {
        notes[i].note = req.body.note;
        break;
      }
    }

    fs.writeFile(filePath, JSON.stringify(notes), (err: any) => {
      // console.log("error ocurred", err)
    });
    return APIResponses.success(res, "Note Updated", { ...req.body });
  } catch (err) {
    return APIResponses.badRequest(res, "Something went wrong!", {});
  }
};

export default {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
};
