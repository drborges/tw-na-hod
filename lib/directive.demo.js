/*
 *  Module with functionality related to form controls
 *  such as, autosave, and clone
 */
angular.module('TwForm', ['TwUtils'])
  // .directive('twAutosave', function () {
  //   return {
  //     scope: {
  //       autosaveCallback: '&twAutosave',
  //       formData: '=ngModel'
  //     },
  //     link: function (scope) {
  //       scope.$watch('formData', function (newFormData) {
  //         scope.autosaveCallback({ formData: newFormData });
  //       });
  //     }
  //   };
  //});


/*
 *  Module with utility functions such as function debouncing
 */
angular.module('TwUtils', []);