const {
    writeFileSync, mkdirSync
} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
    gMapsApiKey: "${process.env['GMAPS_API_KEY']}",
    other: "PROPIEDAD",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
