'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfession.hasMany(models.UserProfessionAttachment, { onDelete: 'cascade'})
      UserProfession.hasMany(models.UserProfessionReferee, { onDelete: 'cascade'})
      UserProfession.hasOne(models.UserSubscription, { onDelete: 'cascade'})
      UserProfession.hasOne(models.Category, { onDelete: 'cascade'})
    }
  }
  UserProfession.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull:false  
      },
      userId: {
        type: DataTypes.INTEGER, 
        allowNull:false  
      },
      title: {
        type: DataTypes.STRING, 
        allowNull:false 
      },
      description:{
        type: DataTypes.TEXT, 
        allowNull:false 
      },
      startingPrice: {
        type: DataTypes.STRING, 
        allowNull:false 
      },
      backgroundImage: {
        type: DataTypes.STRING, 
        allowNull:true
      },
      videoLink: {
        type: DataTypes.STRING, 
        allowNull:true
      },
  }, {
    sequelize,
    modelName: 'UserProfession',
  });
  return UserProfession;
};