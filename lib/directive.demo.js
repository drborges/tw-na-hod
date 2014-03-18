angular.module('TwUtils', [])
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



angular.module('TwForm', ['TwUtils'])
  .directive('twClone', function () {
    return {
      scope: {
        src: '=twCloneFrom',
        dest: '=twCloneTo',
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
        predicate: '=twAutosaveWhen'
      },
      link: function (scope, element) {
        var nonEmptyObject = function (value) { return value && Object.keys(value).length > 0 };

        scope.$watchCollection('model', function (newValue) {
          if (nonEmptyObject(newValue)) {
            var predicate = scope.predicate === undefined ? true : scope.predicate;
            if (predicate) {
              Debouncer.debounce(scope.autosave, 500);
            }
          }
        });
      }
    };
  });