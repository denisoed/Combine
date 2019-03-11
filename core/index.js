const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

const config = require('./config.json');

class Main {
  constructor(config) {
    this.config = config;
  }

  init() {
    console.log(
      chalk.green(
        figlet.textSync('Combine CLI', {
          font: 'Letters',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  };

  askQuestions() {
    return inquirer.prompt(this.config.questions);
  };

  createInitStructure(data) {
    const init = {
      paths: this.config.paths,
      langs: {
        templates: data.TemplateType,
        styles: data.StylesType,
        scripts: data.ScriptsType,
      },
      grids: data.GridType,
      multilang: data.Multilang
    };

    fs.writeFile('./core/init.json', JSON.stringify(init, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log('Init file has been created');
    });
  };

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

  // create structure files
  main.createInitStructure(answers);
};

run();