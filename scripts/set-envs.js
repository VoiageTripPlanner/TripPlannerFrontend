const {
    writeFileSync, mkdirSync
} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.prod.ts';

const envFileContent = `
export const environment = {
    production: true,
    apiUrl: "${process.env['apiUrl']}",
    gMapsKey: "${process.env['gMapsKey']}",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
