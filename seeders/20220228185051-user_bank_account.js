'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('UserBankAccounts', [
      {userId:0,accountNumber: 900000000,isfc:'SBIN000000',accountHolderName:'admin'},
      {userId:1,accountNumber: 900000001,isfc:'SBIN000001',accountHolderName:'satyam1'},
      {userId:2,accountNumber: 900000002,isfc:'SBIN000002',accountHolderName:'satyam2'},
      {userId:3,accountNumber: 900000003,isfc:'SBIN000003',accountHolderName:'satyam3'},
      {userId:4,accountNumber: 900000004,isfc:'SBIN000004',accountHolderName:'satyam4'}, 
      {userId:5,accountNumber: 900000005,isfc:'SBIN000005',accountHolderName:'satyam5'}, 
      {userId:6,accountNumber: 900000006,isfc:'SBIN000006',accountHolderName:'satyam6'}  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
