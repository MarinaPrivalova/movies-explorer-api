const router = require('express').Router();

const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { userInfoValidator } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', userInfoValidator, updateUserProfile);

module.exports = router;
