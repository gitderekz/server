const { errorResponse, successResponse } = require("../../utils/responses")
const getUrl = require("../../utils/cloudinary_upload");
const {UserProfession,User,Category} = require("../../models");
const { sendEmail } = require("../../utils/send_email");
const { where } = require("sequelize");

const createUserProfession = async(req,res)=>{
    try {
        const user = req.user
        
        let {category_uuid,title,phone,address,startingPrice,description} = req.body
       let backgroundImage
        if (req.file) {
            backgroundImage = await getUrl(req);
        }
        const category = await Category.findOne({
            where:{
                uuid:category_uuid
            }
        })
        const response = await UserProfession.create({
            userId:user.id,
            title:title,
            phone,
            address,
            categoryId:category.id,
            startingPrice,
            description,
            backgroundImage:backgroundImage,
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}


const postUserProfessionDocument = async (req, res) => {
  try {
    const user = req.user; // Move this line to after getting user object
    let program_application_uuid = req.params.uuid;
    let fileLink = null;
    let {
      program_requirement_uuid,
    } = req.body;
   
    if (req.file) {
      fileLink = await getUrl(req);
    }

    const program_application = await UserProfession.findOne({
      where: {
        uuid:program_application_uuid
      }
    });
    const program_requirement = await ProgramRequirement.findOne({
      where: {
        uuid:program_requirement_uuid
      }
    });

    const response = await UserProfessionDocument.create({
        programRequirementId:program_requirement.id,
        fileLink:fileLink,
        fileName:program_requirement.name,
        UserProfessionId:program_application.id,
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};


const getUserUserProfession = async(req,res)=>{
    try {
        const user = req.user
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await UserProfession.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            order:[['createdAt','DESC']],
            include:[User],
            where:{userId:user.id},
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res,error)
    }
}

const getUserProfessionDetails = async(req,res)=>{
    try {
       const uuid = req.params.uuid;
        const response = await UserProfession.findOne({
           where:{
            uuid
           },
           include:[User]
        })
       
        successResponse(res, response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateUserProfession = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {status} = req.body
        const userProfession = await UserProfession.findOne({
            where:{
                uuid
            }
        });
        //find user
        const user = await User.findOne({
            where:{id:userProfession.userId}
        })
        const response = await userProfession.update(req.body)
        sendEmail(req, res, user, status)
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteUserProfession = async(req,res)=>{
    try {
        let {
            name
        } = req.body;
        const uuid = req.params.uuid
        const userProfession = await UserProfession.findOne({
            where:{
                uuid
            }
        });
        const response = await userProfession.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}



const getAllUserProfessions = async(req, res) =>{
    // res.status(200).json({"k":"v"});
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await UserProfession.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            include:[User]
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getVideoUserProfessions = async(req, res) =>{
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await UserProfession.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            order:[['createdAt','DESC']],
            where:{type:'video'},
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getDocumentUserProfessions = async(req, res) =>{
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await UserProfession.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            order:[['createdAt','DESC']],
            where:{type:'document'},
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}


module.exports = {
    createUserProfession,updateUserProfession,deleteUserProfession,getUserProfessionDetails, getUserUserProfession,getAllUserProfessions,
    getVideoUserProfessions,getDocumentUserProfessions,postUserProfessionDocument,
    
}