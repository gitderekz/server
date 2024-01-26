const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const upload = require("../../utils/upload");
const { createUserProfession, updateUserProfession, deleteUserProfession, getUserUserProfession, getAllUserProfessions, getReviewersStatus,
getVideoUserProfessions,getDocumentUserProfessions,getRejectedUserProfessions,getUserProfessionDetails,postUserProfessionDocument } = require('./user_profession.controller');

const router = Router()
router.post("/",upload.single('file'),validateJWT,createUserProfession)
router.post("/document/:uuid",upload.single('file'),validateJWT,postUserProfessionDocument)
router.get('/user',validateJWT,getUserUserProfession)
// business UUID
// ret reviewers,status()

router.get('/',validateJWT,getAllUserProfessions)
router.get('/video',validateJWT,getVideoUserProfessions)
router.get('/document',validateJWT,getDocumentUserProfessions)

router.patch('/:uuid',validateJWT,updateUserProfession)
router.delete('/:uuid',validateJWT,deleteUserProfession)
// router.delete('UserProfession_requirement/:uuid',validateJWT,deleteUserProfessionRequirement)

module.exports = router