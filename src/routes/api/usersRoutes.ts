import { Router } from 'express';
const router = Router();
// import functions from userController getAllUsers, getUserById, createNewUser, updateUserById, deleteUserById, addNewFriend, deleteFriend

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router.route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(deleteFriend)

export default router;