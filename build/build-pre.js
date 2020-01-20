const path = require("path");
const colors = require("colors/safe");
const fs = require("fs");
const appVersion = require("../package.json").version;
/******************
 * Version file
 *******************/
const versionFilePath = path.join(__dirname + "/../environments/version.ts");
const src = `export const version = '${appVersion}';\n`;
console.log(colors.cyan("\nRunning environement version versioning tasks"));
// ensure version module pulls value from package.json
fs.writeFile(versionFilePath, src, { flat: "w" }, function(err) {
    if (err) {
        return console.log(colors.red(err));
    }
    console.log(
        colors.green(`Updating application version ${colors.yellow(appVersion)}`)
    );
    console.log(
        `${colors.green("Writing version module to ")}${colors.yellow(
            appVersion
        )}\n`
    );
});
