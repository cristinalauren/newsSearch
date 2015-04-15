"use strict";
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    title: DataTypes.STRING,
    URL: DataTypes.STRING,
    article_id: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
classMethods: {
  associate: function(models) {
    Favorite.belongsTo(models.User);
  }
  }

    }
  );
  return Favorite;
};