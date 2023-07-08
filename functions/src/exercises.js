import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore";

export async function getAllExercises(req, res) {
  const { userId } = req.params;
  const db = await getFirestoreInstance();
  console.log(userId);
  db.collection("exercises")
    // .orderBy("createdAt", "desc")
    // .where("owner", "==", userId)
    .orderBy("dow")
    .get()
    .then((collection) => {
      const exercises = collection.docs

        .map((element) => ({
          exercisesID: element.id,
          ...element.data(),
        }))
        .filter((element) => {
          return element.owner === userId;
        });
      res.send(exercises);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
}

export async function addExercise(req, res) {
  const exercise = { ...req.body };
  const newExercise = { ...exercise, createdAt: FieldValue.serverTimestamp() };
  console.log("hello", newExercise);
  const db = await getFirestoreInstance();

  db.collection("exercises")
    .add(newExercise)
    .then(() => getAllExercises(req, res))
    .catch((err) => res.status(500).send({ error: err.message }));
}

export async function deleteExercise(req, res) {
  const { exerciseId } = req.params;
  const db = await getFirestoreInstance();

  db.collection("exercises")
    .doc(exerciseId)
    .delete()
    .then(() => getAllExercises(req, res))
    .catch((err) => res.status(500).send({ error: err.message }));
}

export async function updateExercise(req, res) {
  const { exerciseId } = req.params;
  // const { done } = req.body;
  const db = await getFirestoreInstance();

  db.collection("exercises")
    .doc(exerciseId)
    .update({ done: true })
    .then(() => getAllExercises(req, res))
    .catch((err) => res.status(500).send({ error: err.message }));
}
