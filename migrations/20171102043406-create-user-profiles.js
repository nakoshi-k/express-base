'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      user_id: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      first_name_kana: {
        type: Sequelize.STRING
      },
      last_name_kana: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_profiles');
  }
};