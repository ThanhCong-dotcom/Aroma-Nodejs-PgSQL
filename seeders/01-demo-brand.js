'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let data = [
            { name: 'Apple' },
            { name: 'Asus' },
            { name: 'Gionee' },
            { name: 'Micromax' },
            { name: 'Samsung' },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        await queryInterface.bulkInsert('Brands', data, {});
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Brands', null, {});

    }
};