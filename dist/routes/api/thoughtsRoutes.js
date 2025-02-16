import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createNewThought, updateThoughtById, deleteThoughtById, createAReaction, deleteAReactionById } from '../../controllers/thoughtController.js';
router.route('/')
    .get(getAllThoughts)
    .post(createNewThought);
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);
router.route('/:thoughtId/reactions')
    .post(createAReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteAReactionById);
export default router;
