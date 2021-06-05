#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();

program
  .name('pangu cleave')
  .option('-p, --project <project>', '指定项目文件')
  .action(() => {
    const options = program.opts();
    if (!options.project) {
        console.log('未指定项目文件');
    } else {
        console.log('盘古开始运行...');
        require('../lib/commands/cleave').default(options);
    }
  });

program.parse(process.argv);
