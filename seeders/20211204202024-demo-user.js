'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [{
        firstName: 'Satyam',
        lastName:'Kumar',
        emailId:'satyamk134@gmail.com',
        password:'google1234',
        role:'customer',
        provider:'google',
        createdAt:'2021-12-01 19:28:11',
        updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyama',
      lastName:'Kumara',
      emailId:'satyam.satyamk134@gmail.com',
      password:'google1234',
      role:'wishmaster',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },{
      firstName: 'Satyamb',
      lastName:'Kumarb',
      emailId:'satyam1@gmail.com',
      password:'$2a$08$YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyamc',
      lastName:'Kumarc',
      emailId:'satyam2@gmail.com',
      password:'$2a$08$YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyamd',
      lastName:'Kumard',
      emailId:'satyam3@gmail.com',
      password:'$2a$08$YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyame',
      lastName:'Kumare',
      emailId:'satyam4@gmail.com',
      password:'$2a$08$YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyamf',
      lastName:'Kumarf',
      emailId:'satyam5@gmail.com',
      password:'google1234',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyamg',
      lastName:'Kumarg',
      emailId:'satyam6@gmail.com',
      password:'$2a$08$YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    },
    {
      firstName: 'Satyamh',
      lastName:'Kumarh',
      emailId:'satyam7@gmail.com',
      password:'YtsnNHZyvhtydTmAmhv2Iuid6jR0xOS4j0fdzabrakVBRp4FCv7Qe',
      role:'customer',
      provider:'google',
      createdAt:'2021-12-01 19:28:11',
      updatedAt:'2021-12-01 19:28:11'
    }
  
  
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
