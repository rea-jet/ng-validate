(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ngValidate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

angular.module('rea.misc.validate').directive('reaValidateGroup', ValidateGroup).directive('reaValidate', Validate).directive('reaValidateHint', ValidateHint);

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
      $scope.$broadcast('rea-validate-change', { type: 'error', isValid: isValid });
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
    var _$ctrl = _slicedToArray($ctrl, 2);

    var groupCtrl = _$ctrl[0];
    var ngModelCtrl = _$ctrl[1];

    scope.$watch(function () {
      return ngModelCtrl.$valid;
    }, function (isValid) {
      return groupCtrl.setValidity(isValid);
    });
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

    function onValidateChange(event, _ref) {
      var isValid = _ref.isValid;

      element.toggleClass(CONFIG.hideCss, !!isValid);
    }
  }
}

},{}],2:[function(_dereq_,module,exports){
'use strict';

angular.module('rea.misc.validate', []);
_dereq_('./directive');

},{"./directive":1}]},{},[2])(2)
});
