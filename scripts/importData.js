const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Card = require('../src/models/Card');
require('dontenv').config();
const Papa = require('papaparse');

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for import');

        await Card.deleteMany({});
        console.log('Previous data cleared');

        const csvFilePath = path.join(__dirname, '../data/card_data.csv');
        const csvFile = fs.readFileSync(csvFilePath, 'utf8');

        const results = Papa.parse(csvFile, {
            header: true,
            delimiter: '|',
            skipEmptyLines: true,
            dynamicTyping: true
        });

        const cards = results.data.map(card => {
            const imageFile = card.image_url.split('/').pop().split('?')[0];

            return {
                ...card,
                alternate_art: String(card.alternate_art).toLowerCase() === 'true',
                card_identifier: `${card.id}_${imageFile}`
            };
        });

        await Card.insertMany(cards);
        console.log(`${cards.length} cards imported successfully!`)
    } catch (error) {
        console.error('Import error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.')
    }
};

importData();