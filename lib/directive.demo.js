angular.module('TwFunctional', [])
  .factory('Debouncer', function ($timeout) {
    var debouncer = {};

    debouncer.debouncePromise = null;

    debouncer.debounce = function (fn, wait) {
      $timeout.cancel(debouncer.debouncePromise);
      debouncer.debouncePromise = $timeout(function () {
        fn();
      }, wait);
    };

    return debouncer;
  })



angular.module('TwUserProfile', [])
  .directive('twUserProfile', function () {
    return {
      restrict: 'E',
      scope: {
        user: '=ngModel',
        autosaveEnabled: '&twAutoSaveEnabled'
      },
      template: '<div class="user-profile" ng-model="user">' +
                  '<div class="user-name">' +
                    '<label>Name:</label>' +
                    '<input type="text" ng-model="user.name" />' +
                  '</div>' +
                  '<div class="user-email">' +
                    '<label>Email:</label>' +
                    '<input type="text" ng-model="user.email" />' +
                  '</div>' +
                '</div>',
      link: function (scope, element) {}
    };
  })



angular.module('TwForm', ['TwFunctional'])
  .directive('twClone', function () {
    return {
      scope: {
        src: '=twSrcModel',
        dest: '=twDestModel',
        trigger: '@twOn'
      },
      link: function (scope, element) {
        var trigger = scope.trigger || 'click';
        element.on(trigger, function () {
          scope.$apply(function () {
            if (!scope.dest) {
              scope.dest = angular.copy(scope.src);
            } else {
              angular.extend(scope.dest, scope.src);
            }
          });
        });
      }
    };
  })

  .directive('twAutosave', function (Debouncer) {
    return {
      scope: {
        autosave: '&twAutosave',
        model: '=ngModel',
        predicate: '@twIf'
      },
      link: function (scope, element) {
        scope.$watchCollection('model', function (newValue) {
          if (newValue && Object.keys(newValue).length > 0) {
            var predicate = scope.predicate === undefined ? true : JSON.parse(scope.predicate);
            if (predicate) {
              Debouncer.debounce(scope.autosave, 500);
            }
          }
        });
      }
    };
  });