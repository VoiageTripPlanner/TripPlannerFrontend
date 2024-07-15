const {
    writeFileSync, mkdirSync
} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
    production: false,
    apiUrl: "${process.env['apiUrl']}",
    gMapsKey: "${process.env['gMapsKey']}",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
