const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();


const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
    production: true,
    apiUrl: 'http://localhost:8080',
    maps_key: "${ process.env['MAPS_KEY'] }",
    google_hotels:"${process.env['GOOGLE_HOTELS']}"
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );