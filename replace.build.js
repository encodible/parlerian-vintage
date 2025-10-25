var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
const webAssetOptions = {
    files: [
        'src/environments/environment.prod.ts',
        'landing/index.html'
    ],
    from: /version: '(.*)'/g,
    to: "version: '"+ buildVersion + "'",
    allowEmptyPaths: false,
};

const k8dlOptions = {
    files: [
        'k8s/base-prod/deployment_datalab.yaml'
    ],
    from: /image: gcr\.io\/veti-prod\/data-lab:v(.*)/g,
    to: "image: gcr.io/veti-prod/data-lab:v"+ buildVersion,
    allowEmptyPaths: false,
};

const k8pwOptions = {
    files: [
        'k8s/base-prod/deployment_publicwebsite.yaml'
    ],
    from: /image: gcr\.io\/veti-prod\/public-website:v(.*)/g,
    to: "image: gcr.io/veti-prod/public-website:v"+ buildVersion,
    allowEmptyPaths: false,
};

try {
    const webFilesChanged = replaceBuildNumber(webAssetOptions);
    const dlFilesChanged = replaceBuildNumber(k8dlOptions);
    const pwFilesChanged = replaceBuildNumber(k8pwOptions);
    console.log('Build version set: ' + buildVersion);
    console.log(`Changed ${JSON.stringify(webFilesChanged)} web files`);
    console.log(`Changed ${JSON.stringify(dlFilesChanged)} datalab files`);
    console.log(`Changed ${JSON.stringify(pwFilesChanged)} public website files`);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}

function replaceBuildNumber(options) {
    const changed = replace.sync(options);
    if (changed == 0) {
        console.log(`Failed to change ${JSON.stringify(changed)} files`)
        console.log("Please make sure that file '" + options.files + "' has version string");
    }
    return changed
}