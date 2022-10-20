module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MerchantServiceDetails', [
      {serviceId: 1,cloth:'shirt',price:11,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'jeans',price:12,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'kurti',price:13,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'tshirt',price:14,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'pant',price:15,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'Blazer',price:16,discount:0,unit:"PER_ITEM"},
      {serviceId: 1,cloth:'shirt',price:17,discount:0,unit:"PER_ITEM"},
      {serviceId: 2,cloth:'Shirts',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 2,cloth:'Pants',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 2,cloth:'Tshirts',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 2,cloth:'Jeans',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 2,cloth:'Trunks',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 2,cloth:'BedSheet',price:80,discount:0,unit:"PER_ITEM"},
      {serviceId: 3,cloth:'Ties',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Shirts',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Blanket',price:80,discount:0,unit:"PER_ITEM"}, 
      {serviceId: 3,cloth:'Pajamas',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Half-pants',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Jeans',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Cotton Pant',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Curtains',price:80,discount:0,unit:"PER_ITEM"},
      {serviceId: 3,cloth:'Hanker-cheifs',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'cotton Jacket',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Kurtas',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 3,cloth:'Polo Tshirts',price:80,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'applicable',price:90,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'shirt',price:20,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'jeans',price:21,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'kurti',price:22,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'tshirt',price:23,discount:0,unit:"PER_KG"},
      {serviceId: 4,cloth:'pant',price:24,discount:0,unit:"PER_ITEM"},
      {serviceId: 4,cloth:'Blazer',price:25,discount:0,unit:"PER_ITEM"},
      {serviceId: 4,cloth:'Churidar',price:27,discount:0,unit:"PER_ITEM"},
      {serviceId: 4,cloth:'Half-shirt',price:28,discount:0,unit:"PER_KG"},
      
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