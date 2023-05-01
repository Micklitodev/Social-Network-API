const router = require('express').Router(); 
const { User } = require('../../models'); 

router.get("/user", async (req, res) => {
    try {
        const user = await User.find()
        console.log(user)
        res.status(200).json(user)
    }catch(err) {
        console.log(err.message)
    }
})

module.exports = router;