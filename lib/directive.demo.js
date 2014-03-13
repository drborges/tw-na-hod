angular.module('directive-demo', [])
  /*
   * Creates a Debaounce Service used to create and return a new
   * debounced version of the passed function which will postpone
   * its execution until after wait milliseconds have elapsed since
   * the last time it was invoked
   *
   * @see http://underscorejs.org/#debounce
   */
  .factory('Debouncer', function ($timeout) {
    var debouncer = {};

    debouncer.debouncePromise = null;

    debouncer.debounce = function (fn, wait) {
      $timeout.cancel(this.debouncePromise);
      this.debouncePromise = $timeout(function () {
        fn();
      }, wait);
    };

    return debouncer;
  })

  /*
   *
   */
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

  /*
   *
   */
  .directive('twAutosave', function (Debouncer) {
    return {
      scope: {
        autosave: '&twAutosave',
        model: '=ngModel',
        predicate: '@twIf'
      },
      link: function (scope, element) {
        scope.$watchCollection('model', function (newValue) {
          if (newValue) {
            var predicate = scope.predicate === undefined ? true : JSON.parse(scope.predicate);
            if (predicate) {
              Debouncer.debounce(scope.autosave, 500);
            }
          }
        });
      }
    };
  });