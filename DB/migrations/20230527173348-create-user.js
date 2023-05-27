'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      birthday:{
        type: Sequelize.STRING,
        defaultValue: null, 
			validate:{
				is: /^(0|1)-[0-9](0|1|2|3)[0-9]-([0-9]){1,4}/,
			}
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};