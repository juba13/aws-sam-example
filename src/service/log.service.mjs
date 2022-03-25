class AppLog {
  static #LogLevel = Object.freeze({
    INFO : Symbol(1),
    DEBUG : Symbol(2),
    WARN : Symbol(3),
    ERROR : Symbol(4),
    CRITICAL : Symbol(5)
  });

  static #baseLog = (logLevel , data,...args ) => {
    // manage your log if need 
    switch(logLevel){
      case AppLog.#LogLevel.INFO:
        console.info(data,...args)
        break;
      case AppLog.#LogLevel.DEBUG:
        console.debug(data,...args)
        break;
      case AppLog.#LogLevel.WARN:
        console.warn(data,...args)
        break;
      case AppLog.#LogLevel.ERROR:
        console.error(data,...args)
        break;
      case AppLog.#LogLevel.CRITICAL:
        console.critical(data,...args)
        break;
      default:
        console.log(data,...args)
    }
  }
  // static log = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.INFO, data,...args) }
  static info = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.INFO, data,...args) }
  static debug = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.DEBUG, data,...args) }
  static warn = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.WARN, data,...args) }
  static error = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.ERROR, data,...args) }
  static critical = (data,...args) => {  AppLog.#baseLog(AppLog.#LogLevel.CRITICAL, data,...args) }
}
export { AppLog as log}
