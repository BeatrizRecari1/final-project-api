import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  getAllExercises,
  addExercise,
  updateExercise,
  deleteExercise,
} from "./src/exercises.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/exercises/:userId", getAllExercises);
app.post("/exercises/:userId", addExercise);
app.patch("/exercises/:userId/:exerciseId", updateExercise);
app.delete("/exercises/:userId/:exerciseId", deleteExercise);

export const api = functions.https.onRequest(app);
