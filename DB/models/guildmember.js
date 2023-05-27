'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GuildMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GuildMember.belongsTo(User, {foreignKey:{
        name: 'member_id',
        allowNull: false
      }});
    }
  }
  GuildMember.init({
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GuildMember',
  });
  return GuildMember;
};