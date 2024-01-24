import AdmZip from 'adm-zip';
import fs from 'fs';

const tempLocation = './dist/src/functions/';
const tempLambdaBuilt = './dist/lambda-zipped/';
const nodeModules = './node_modules';

try {
    if (!fs.existsSync(tempLambdaBuilt)){
        fs.mkdirSync(tempLambdaBuilt);
    }
    fs.readdirSync(tempLocation)?.forEach((lambdaName) => {
        const file = new AdmZip();
        file.addLocalFolder( `${tempLocation}${lambdaName}`);
        file.addLocalFolder(nodeModules, 'node_modules');
        fs.writeFileSync(`${tempLambdaBuilt}${lambdaName}-code.zip`, file.toBuffer());
    });

} catch (e) {
    console.error('Error when build lambda zip', e);
}
