export default class Logger {
  constructor() {
    this.outputConfig = {
      debug: {
        name: 'Debug',
        color: '#A5BF53'
      },
      info: {
        name: 'Info',
        color: '#1087C9'
      },
      warn: {
        name: 'Warning',
        color: '#FFCD30'
      },
      error: {
        name: 'Error',
        color: '#C9352B'
      }
    };
  }

  log(...args) {
    const name = args.shift();

    this.output('debug', name, args);
  }

  info(name) {
    console.info(name);
  }

  warn(name) {
    console.warn(name);
  }

  error(name, data = null) {
    if (data !== null) {
      console.log(`${name}:`);
      console.error(data);
    } else {
      console.error(name);
    }
  }

  exception(error, data = null) {
    console.error(error);

    if (data) {
      console.log('data: ', data);
    }
  }

  output(logLevel, name, args) {
    const value = `%c${this.outputConfig[logLevel].name}%c${name}`;
    const styleLabelType = `background: ${this.outputConfig[logLevel].color}; padding: 2px 8px; color: #fff; border-radius: 6px 0 0 6px;`;
    const styleLabelName =
      'background: #E5E5E5; padding: 2px 8px; border-radius: 0 6px 6px 0; color: #111;';
    const styleArrow = `color: ${this.outputConfig[logLevel].color}; margin-left:5px;`;

    if (args) {
      console.group(':');
    }

    console.log(value, styleLabelType, styleLabelName);

    if (args && args.length) {
      args.forEach(arg => {
        console.log('%c>>', styleArrow, arg);
      });
    }

    if (args) {
      console.groupEnd();
    }
  }
}
