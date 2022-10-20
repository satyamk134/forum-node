'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MerchantServices', [
      {name:'Dry Clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:1,price:100},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,available:true,merchantId:1,price:102},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:1,available:true,merchantId:1,price:103},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:1,price:104},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:1,price:105},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:1,price:106},
      {name:'Dry clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:2,price:107},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,available:true,merchantId:2,price:108},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:1,available:true,merchantId:3,price:109},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:3,price:110},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:3,price:111},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:4,price:112},
      {name:'Dry Clean',unit:'piece',tat:'1 day',hasParticulars:0,available:true,merchantId:5,price:113},
      {name:'Cool Wash',unit:'kg',tat:'1 day',hasParticulars:1,hasParticulars:0,available:true,merchantId:4,price:114},
      {name:'Mint Wash',unit:'kg',tat:'4 day',hasParticulars:0,available:true,merchantId:3,price:115},
      {name:'British Clean',unit:'piece',tat:'3 day',hasParticulars:0,available:true,merchantId:6,price:116},
      {name:'Steam Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:4,price:117},
      {name:'Normal Press',unit:'piece',tat:'1 day',hasParticulars:1,available:true,merchantId:5,price:118}
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


