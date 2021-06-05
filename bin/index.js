const commander = require('commander');
const program = new commander.Command();

program
  .name('pangu')
  .version(require('../package.json').version, '-V, -v, --version')
  .usage("<command> [options]")
  .command('test', 'test', { executableFile: './hello' })
  .command('cleave', 'carding out project flow', { executableFile: './cleave' })
  .parse(process.argv);

