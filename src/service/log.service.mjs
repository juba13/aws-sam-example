class AppLog {
  static log = (data, ...args) => { console.info(data, ...args) }
  static info = (data, ...args) => { console.info(data, ...args) }
  static debug = (data, ...args) => { console.debug(data, ...args) }
  static warn = (data, ...args) => { console.warn(data, ...args) }
  static error = (data, ...args) => { console.error(data, ...args) }
  static critical = (data, ...args) => { console.critical(data, ...args) }
}
export { AppLog as log }
