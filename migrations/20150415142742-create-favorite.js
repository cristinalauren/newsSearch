"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Favorite", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      URL: {
        type: DataTypes.STRING
      },
      article_id: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING
      },
      UserId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Favorite").done(done);
  }
};