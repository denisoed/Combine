const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const config = require('./config.json');

class Main {
  constructor(config) {
    this.config = config;
  }

  init() {
    console.log(
      chalk.green(
        figlet.textSync("Combine CLI", {
          font: "Letters",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  };

  askQuestions() {
    return inquirer.prompt(this.config.questions);
  };

  createInitFile(data) {
    const init = {
      paths: this.config.paths,
      langs: {
        templates: data.TemplateType,
        styles: data.StylesType,
        scripts: data.ScriptsType,
      },
      grids: data.GridType
    };

    fs.writeFile("./core/init.json", JSON.stringify(init, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log("Init file has been created");
    });
  };

  projectSetup(languages) {
    shell.exec(`npm run combine-generate ${languages.TemplateType} ${languages.StylesType} ${languages.ScriptsType} ${languages.GridType}`);
  }

  success() {
    console.log(
      chalk.red.bgBlack.bold(`Done!`)
    );
  };

}

const run = async () => {

  const main = new Main(config);

  // show script introduction
  main.init();

  // ask questions
  const answers = await main.askQuestions();

  // create the config file
  main.createInitFile(answers);

  // Project setup
  main.projectSetup(answers);

  // show success message
  main.success();
};

run();