const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts";

const envFileContent = `
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    maps_key: "${process.env["MAPS_KEY"]}",
};
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
