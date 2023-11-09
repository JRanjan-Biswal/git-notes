import inquirer from "inquirer";
import { promisify } from "util";
import cp from "child_process";
import fs from 'fs';

const exec = promisify(cp.exec);
const currentPath = process.cwd();

let origin = '';

(async function () {
    origin = await exec('git ls-remote --get-url origin')
})();


inquirer.prompt([
    {
        name: "choice",
        message: "select the application version",
        type: "list",
        choices: ["patch", "minor", "major"]
    }
]).then((answer) => {

    fs.readFile(currentPath + '/package.json', 'utf-8', (err, data) => {
        let currentData = JSON.parse(data)
        let versionArr = currentData.version.split('.');

        let oldVersion = currentData.version

        let currentChoice = answer.choice;

        if (currentChoice === 'major') {
            versionArr[0] = Number(versionArr[0]) + 1;
            versionArr[1] = 0;
            versionArr[2] = 0;
        }
        else if (currentChoice === 'minor') {
            versionArr[1] = Number(versionArr[1]) + 1;
            versionArr[2] = 0;
        }
        else {
            versionArr[2] = Number(versionArr[2]) + 1
        }

        let newVersion = versionArr.join('.')

        let regex = /('version' :.* |"version":.*)/
        let formatted = data.replace(regex, `"version": "${newVersion}",`);

        fs.writeFile('./package.json', formatted, 'utf-8', err => {
            if (err) throw err
            console.log('changed package version', oldVersion, "-->", newVersion)
        })
    });

    return answer

    // await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
}).then((answer) => {

    return fs.readFile(currentPath + '/package-lock.json', 'utf-8', (err, data) => {
        let currentData = JSON.parse(data)
        let versionArr = currentData.version.split('.');

        let oldVersion = currentData.version

        let currentChoice = answer.choice;

        if (currentChoice === 'major') {
            versionArr[0] = Number(versionArr[0]) + 1;
            versionArr[1] = 0;
            versionArr[2] = 0;
        }
        else if (currentChoice === 'minor') {
            versionArr[1] = Number(versionArr[1]) + 1;
            versionArr[2] = 0;
        }
        else {
            versionArr[2] = Number(versionArr[2]) + 1
        }

        let newVersion = versionArr.join('.')

        let regex = /('version' :.* |"version":.*)/
        let formatted = data.replace(regex, `"version": "${newVersion}",`);

        fs.writeFile('./package-lock.json', formatted, 'utf-8', async (err) => {
            if (err) throw err
            console.log('changed package lock version', oldVersion, "-->", newVersion)

            let commit_msg = oldVersion + "-->" + newVersion
            setTimeout(async () => {
                await exec(`git commit -am "${commit_msg}"`)
            }, 1000)

        })
    });

}).catch((err) => console.log(err))