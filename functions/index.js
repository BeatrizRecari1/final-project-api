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

app.get("/exercises", getAllExercises);
app.post("/exercises", addExercise);
app.patch("/exercises/:exerciseId", updateExercise);
app.delete("/exercises/:exerciseId", deleteExercise);

export const api = functions.https.onRequest(app);
