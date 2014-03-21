/*
 *  Module with functionality related to form controls
 *  such as, autosave, and clone
 */
angular.module('TwForm', ['TwUtils'])
  .directive('twAutosave', function ($timeout) {
    return {
      scope: {
        autosaveCallback: '&twAutosave',
        formData: '=ngModel',
        // autosaveEnabled: '=twAutosaveWhen'
      },
      link: function (scope) {

        var debouncePromise;
        function debounce(callback, delay) {
          $timeout.cancel(debouncePromise);
          debouncePromise = $timeout(callback, delay);
        }

        scope.$watchCollection('formData', function () {
          // if (scope.autosaveEnabled) {
             debounce(scope.autosaveCallback, 300);
          // }
        });
      }
    };
  });


/*
 *  Module with utility functions such as function debouncing
 */
angular.module('TwUtils', []);