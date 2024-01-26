const { errorResponse, successResponse } = require("../../utils/responses")
const {Category,Business} = require("../../models");



const createCategory = async(req,res)=>{
try {
    const {
        name
    } = req.body;
    const response = await Category.create({
        name,
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const updateCategory = async(req,res)=>{
    try {
        let {
            name
        } = req.body;
        const uuid = req.params.uuid
        const category = await Category.findOne({
            where:{
                uuid
            }
        });
        const response = await category.update({
            name
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
    }

    const deleteCategory = async(req,res)=>{
        try {
           
            const uuid = req.params.uuid
            const category = await Category.findOne({
                where:{
                    uuid
                }
            });
            const response = await category.destroy()
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
        }
    
const getCategories = async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        const business = await Business.findOne({
            uuid
        })
        const response = await Category.findAll({
        })
        
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {
    createCategory,updateCategory,getCategories,deleteCategory
}