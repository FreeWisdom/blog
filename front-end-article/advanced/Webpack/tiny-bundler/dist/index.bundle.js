(function() {
  var moduleList = [
    function(require, module, exports) {
      console.log("hello bundle")
module.export = "hello word"
    }
  ];
  
  var module = {exports: {}};
  moduleList[0](null, module);
})()