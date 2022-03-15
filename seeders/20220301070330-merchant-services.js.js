'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MerchantServices', [
      {name:'Dry Clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:1},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,available:true,merchantId:1},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:1,available:true,merchantId:1},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:1},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:1},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:1},
      {name:'Dry clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:2},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,available:true,merchantId:2},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:1,available:true,merchantId:3},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:3},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:3},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:4},
      {name:'Dry Clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:5},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,hasParticulars:0,available:true,merchantId:4},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:0,available:true,merchantId:3},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:6},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:4},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:5}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};  


