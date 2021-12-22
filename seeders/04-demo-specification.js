'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let data = [
            { name: 'Width' },
            { name: 'Height' },
            { name: 'Depth' },
            { name: 'Weight' },
            { name: 'Quality checking' },
            { name: 'Freshness Duration' },
            { name: 'When packeting' },
            { name: 'Each Box contains' }
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        await queryInterface.bulkInsert('Specifications', data, {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Specifications', null, {});
    }
};