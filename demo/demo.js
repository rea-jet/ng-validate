(function() {
  angular.module('demo', ['rea.misc.validate'])
    .controller('AppCtrl', AppCtrl)
  ;

  function AppCtrl() {
    var vm = this;
    vm.form = {};
    vm.form2 = {};
  }
})();
