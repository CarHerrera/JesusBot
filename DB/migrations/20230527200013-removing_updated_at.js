'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Guilds', 'updatedAt');
    await queryInterface.removeColumn('GuildMembers', 'updatedAt');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Guilds', 'updatedAt', {type: Sequelize.DATE, allowNull:false});
    await queryInterface.addColumn('GuildMembers', 'updatedAt', {type: Sequelize.DATE, allowNull:false});
  }
};
