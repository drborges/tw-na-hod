describe ('HODApp', function () {



  describe ('TwForm', function () {
    var $scope
      , $compile
      , $timeout;

    beforeEach(module('TwForm'));

    beforeEach(inject(function (_$compile_, _$timeout_, $rootScope) {
      $compile = _$compile_;
      $timeout = _$timeout_;
      $scope = $rootScope.$new();
    }));

    describe ('twAutosave', function () {
      var template = '<form tw-autosave="save(formData)" tw-autosave-when="autosaveEnabled" ng-model="formData"></form>';

      it ('saves the form data whenever it changes', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };
        $scope.autosaveEnabled = true;

        $compile(template)($scope);

        $scope.formData.message = "Angular Is Not Too Bad...";
        $scope.$digest();
        $timeout.flush();

        expect($scope.save).to.have.been.calledWith({ message: "Angular Is Not Too Bad..." });
      });

      it ('saves the form data only when user stops typing', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };
        $scope.autosaveEnabled = true;

        $compile(template)($scope);

        $scope.formData.message = "Angular";
        $scope.$digest();
        $timeout.flush(100);

        $scope.formData.message = "Angular Is Not";
        $scope.$digest();
        $timeout.flush(100);

        $scope.formData.message = "Angular Is Not Too Bad...";
        $scope.$digest();
        $timeout.flush();

        expect($scope.save).to.have.been.calledOnce;
        expect($scope.save).to.have.been.calledWith({ message: "Angular Is Not Too Bad..." });
      });

      it ('does not auto saves model if autosave is disabled', function() {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };
        $scope.autosaveEnabled = false;

        $compile(template)($scope);

        $scope.formData.message = "Angular Is Not Too Bad...";
        $scope.$digest();

        expect($scope.save).to.not.have.been.called;
      });


      it ('enables autosave by default', function () {
        var template = '<form tw-autosave="save(formData)" ng-model="formData"></form>';

        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };

        $compile(template)($scope);

        $scope.formData.message = "Angular Is Not Too Bad...";
        $scope.$digest();
        $timeout.flush();

        expect($scope.save).to.have.been.calledWith({ message: "Angular Is Not Too Bad..." });
      });

      it ('does not trigger callback if new value of watched model is "undefined"', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };

        $compile(template)($scope);

        $scope.formData = undefined;
        $scope.$digest();

        expect($scope.save).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is "null"', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };

        $compile(template)($scope);

        $scope.formData = null;
        $scope.$digest();

        expect($scope.save).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is an empty object', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };

        $compile(template)($scope);

        $scope.formData = {};
        $scope.$digest();

        expect($scope.save).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is an empty array', function () {
        $scope.save = sinon.spy();
        $scope.formData = { message: "Hello HOD!" };

        $compile(template)($scope);

        $scope.formData = [];
        $scope.$digest();

        expect($scope.save).to.not.have.been.called;
      });
    });



    describe ('twClone', function () {
      var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel" tw-clone-on="click">Clone</button>';

      it ('clones src data into destination data on button "click"', function () {
        $scope.srcModel = { message: "Hello HOD" };
        $scope.destModel = { message: "Hello Again HOD (:~)", id: 12 };

        var element = $compile(template)($scope);
        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ message: "Hello HOD", id: 12 });
      });

      it ('clones src data into destination data on button "mouseover"', function () {
        var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel" tw-clone-on="mouseover">Clone</button>';

        $scope.srcModel = { message: "Hello HOD" };
        $scope.destModel = { message: "Hello Again HOD (:~)", id: 12 };

        var element = $compile(template)($scope);
        element.triggerHandler('mouseover');

        expect($scope.destModel).to.deep.equal({ message: "Hello HOD", id: 12 });
      });

      it ('clones src by value rather than reference', function () {
        $scope.srcModel = { message: "Hello HOD" };
        $scope.destModel = { message: "Hello Again HOD (:~)", id: 12 };

        var element = $compile(template)($scope);
        element.triggerHandler('click');

        $scope.srcModel.message = "updated message";
        $scope.$digest();

        expect($scope.destModel).to.deep.equal({ id: 12, message: 'Hello HOD' });
      });

      it ('defaults clone event trigger to button "click"', function () {
        var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel">Clone</button>';

        $scope.srcModel = { message: "Hello HOD" };
        $scope.destModel = { message: "Hello Again HOD (:~)", id: 12 };

        var element = $compile(template)($scope);
        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ message: "Hello HOD", id: 12 });
      });

      it ('defaults destination data to a copy of src data when destination data is not yet defined', function () {
        $scope.srcModel = { message: "Hello HOD" };
        $scope.destModel = undefined;

        var element = $compile(template)($scope);
        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ message: 'Hello HOD' });

        $scope.srcModel.message = 'updated message';
        $scope.$digest();

        expect($scope.destModel).to.deep.equal({ message: 'Hello HOD' });
      });
    });
  });
});