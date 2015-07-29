'use strict';

angular.module('rea.misc.validate')
  .directive('reaValidateGroup', ValidateGroup)
  .directive('reaValidate', Validate)
  .directive('reaValidateHint', ValidateHint)
;

var CONFIG = {
  errorCss: 'has-error',
  hideCss: 'ng-hide'
};

ValidateGroup.$inject = [];
function ValidateGroup() {

  function link(scope, element) {
    scope.$$setValidity = setValidity;

    function setValidity(isValid) {
      element.toggleClass(CONFIG.errorCss, !isValid);
    }
  }

  function Ctrl($scope) {
    var self = this;
    self.setValidity = setValidity;

    function setValidity(isValid) {
      $scope.$$setValidity(isValid);
      $scope.$broadcast('rea-validate-change', {type: 'error', isValid: isValid});
    }
  }

  return {
    scope: true,
    link: link,
    controller: ['$scope', Ctrl]
  };
}

Validate.$inject = [];
function Validate() {
  return {
    restrict: 'A',
    scope: false,
    require: ['^reaValidateGroup', 'ngModel'],
    link: link
  };

  function link(scope, element, attrs, $ctrl) {
    var [groupCtrl, ngModelCtrl] = $ctrl;
    scope.$watch(() => ngModelCtrl.$valid, (isValid) => groupCtrl.setValidity(isValid));
  }
}

ValidateHint.$inject = [];
function ValidateHint() {
  return {
    link: link,
    scope: false
  };

  function link(scope, element) {
    element.toggleClass(CONFIG.hideCss, true);
    scope.$on('rea-validate-change', onValidateChange);

    function onValidateChange(event, {isValid}) {
      element.toggleClass(CONFIG.hideCss, !!isValid);
    }
  }
}
