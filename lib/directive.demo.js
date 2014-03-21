/*
 *  Module with functionality related to form controls
 *  such as, autosave, and clone
 */
angular.module('TwForm', [])
  .directive('twAutosave', function ($timeout) {
    return {
      scope: {
        autosaveCallback: '&twAutosave',
        formData: '=ngModel',
        autosaveEnabled: '=twAutosaveWhen'
      },
      link: function (scope) {

        var debouncePromise;
        function debounce(callback, delay) {
          $timeout.cancel(debouncePromise);
          debouncePromise = $timeout(callback, delay);
        }

        scope.$watchCollection('formData', function (newFormData) {
          var autosaveEnabled = scope.autosaveEnabled === undefined ? true : scope.autosaveEnabled;
          var validData = newFormData && Object.keys(newFormData).length > 0;
          if (autosaveEnabled && validData) {
            debounce(scope.autosaveCallback, 300);
          }
        });
      }
    };
  })

  .directive('twClone', function () {
    return {
      scope: {
        src: '=twCloneFrom',
        dest: '=twCloneTo',
        eventType: '@twCloneOn'
      },
      link: function (scope, element) {
        var trigger = scope.eventType || 'click';

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
  });