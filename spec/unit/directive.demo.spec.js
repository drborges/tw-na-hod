describe ('HODApp', function () {



  describe ('TwForm', function () {
    beforeEach(module('TwForm'));



    describe ('twAutosave', function () {
      var template = '<form tw-autosave="save(formData)" tw-autosave-when="autosaveEnabled" ng-model="formData"></form>';

      it ('executes callback whenever watched model changes value');

      it ('executes callback only after changes to the watched model are 300ms dorment');

      it ('does not auto saves model if predicate is not met');

      it ('does not trigger callback if new value of watched model is "undefined"');

      it ('does not trigger callback if new value of watched model is "null"');

      it ('does not trigger callback if new value of watched model is an empty object');

      it ('does not trigger callback if new value of watched model is an empty array');
    });



    describe ('twClone', function () {
      var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel">Clone</button>';

      it ('defaults clone event trigger to "click"');

      it ('clones src model into dest model on "click" event');

      it ('clones src model into dest model on "keyup" event');

      it ('clones src by value rather than reference');

      it ('defaults dest model to a copy of src model when dest model is not defined');
    });
  });



  describe('TwUtils', function () {
    describe('Debouncer', function () {
      it ('debounces callback for multiple calls within 300 ms');
    });
  });
});