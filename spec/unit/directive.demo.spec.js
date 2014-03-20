describe ('HODApp', function () {



  describe ('TwForm', function () {
    var $scope
      , $compile;

    beforeEach(module('TwForm'));

    beforeEach(inject(function (_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
    }));

    describe ('twAutosave', function () {
      var template = '<form tw-autosave="save(formData)" ng-model="formData"></form>';

      it ('saves the form data whenever it changes', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" }

        $compile(template)($scope);

        $scope.formData.message = "Angular Is Not Too Bad...";
        $scope.$digest();

        expect($scope.save).to.have.been.calledWith({ message: "Angular Is Not Too Bad..." });
      });

      it ('saves the form data only when user stops typing');

      it ('does not auto saves model if autosave is disabled');




      it ('does not trigger callback if new value of watched model is "undefined"');

      it ('does not trigger callback if new value of watched model is "null"');

      it ('does not trigger callback if new value of watched model is an empty object');

      it ('does not trigger callback if new value of watched model is an empty array');
    });



    describe ('twClone', function () {
      var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel">Clone</button>';

      it ('clones src data into destination data on button "click"');

      it ('clones src data into destination data on button "mouseover"');

      it ('clones src by value rather than reference');

      it ('defaults clone event trigger to button "click"');

      it ('defaults destination data to a copy of src data when destination data is not yet defined');
    });
  });



  describe('TwUtils', function () {
    describe('Debouncer', function () {
      it ('debounces callback for multiple calls within 300 ms');
    });
  });
});