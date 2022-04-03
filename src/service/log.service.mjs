class AppLog {

  static log = (data, ...args) => { console.info(data, ...args) }
  static info = (data, ...args) => { console.info(data, ...args) }
  static debug = (data, ...args) => { console.debug(data, ...args) }
  static warn = (data, ...args) => { console.warn(data, ...args) }
  static error = (data, ...args) => { console.error(data, ...args) }
  static critical = (data, ...args) => { console.critical(data, ...args) }
}
export { AppLog as log }


// var log = (function () {
//   return {
//       log: function() {
//           var args = Array.prototype.slice.call(arguments);
//           console.log.apply(console, args);
//       },
//       warn: function() {
//           var args = Array.prototype.slice.call(arguments);
//           console.warn.apply(console, args);
//       },
//       error: function() {
//           var args = Array.prototype.slice.call(arguments);
//           console.error.apply(console, args);
//       }
//   }
// }());

// var name = "Alex";
// var arr = [1, 2, 3];
// var obj = { a:1, b:2, c:3 };
// var hello = function(msg){alert(msg);};
// mylog.log("Name: ", name);
// mylog.log("Window Debug: ", window);
// mylog.error("Some error happened");
// mylog.warn("Ahh... Warning", arr, obj);
// mylog.log("more parameters: ", arr, obj, hello);