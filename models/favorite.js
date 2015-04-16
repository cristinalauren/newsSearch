"use strict";
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.User);
      }
    }
  });
  return Favorite;
};