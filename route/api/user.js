
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controller/user');

// Endpoint '/api/' for get all users and post new user

router

    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Endpoint '/api/:Id' for get user by id, updating user, del user

router

    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Endpoint '/api/:id/friends/:friendId for adding freinds and deleting friends 
router

    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;

