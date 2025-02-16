import { Router } from 'express';
const router = Router();
// import functions from thoughtController to getAllThoughts, getThoughtById, createNewThought, updateThoughtById, deleteThoughtById, createAReaction, deleteAReactionById


router.route('/')
    .get(getAllThoughts)
    .post(createNewThought) 

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById)

router.route('/:thoughtId/reactions')
    .post(createAReaction)
    .delete(deleteAReactionById)

export default router;