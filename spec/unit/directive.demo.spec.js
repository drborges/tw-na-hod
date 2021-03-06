describe ('HODApp', function () {



  describe('TwUtils', function () {
    describe('Debouncer', function () {
      var Debouncer, $timeout;

      beforeEach(module('TwUtils'));
      beforeEach(inject(function (_Debouncer_, _$timeout_) {
        Debouncer = _Debouncer_;
        $timeout = _$timeout_;
      }));

      it ('debounces callback for multiple calls within 300 ms', function () {
        var fn = sinon.spy();

        Debouncer.debounce(fn, 300);
        $timeout.flush(100);
        Debouncer.debounce(fn, 300);
        $timeout.flush(100);
        Debouncer.debounce(fn, 300);
        $timeout.flush();

        expect(fn).to.have.been.calledOnce;
     });
    });
  });



  describe ('TwForm', function () {
    beforeEach(module('TwForm'));



    describe ('twClone', function () {
      var $scope
        , $compile
        , template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel">Clone</button>';

      beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();

        $scope.srcModel = { message: 'cloned message' };
        $scope.destModel = { id: 1, message: 'initial message' };
      }));

      it ('defaults clone event trigger to "click"', function () {
        var element = $compile(template)($scope);

        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ id: 1, message: "cloned message" });
      });

      it ('clones tw-clone-from into tw-clone-to on "click" event', function () {
        var template = '<button tw-clone tw-clone-from="srcModel" tw-clone-to="destModel" tw-on="click">Clone</button>';

        var element = $compile(template)($scope);

        expect($scope.destModel).to.deep.equal({ id: 1, message: "initial message" });

        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ id: 1, message: "cloned message" });
      });

      it ('clones tw-clone-from into tw-clone-to on "keyup" event', function () {
        var template = '<input tw-clone tw-clone-from="srcModel" tw-clone-to="destModel" tw-on="keyup">Clone</button>';

        var element = $compile(template)($scope);

        expect($scope.destModel).to.deep.equal({ id: 1, message: "initial message" });

        element.triggerHandler('keyup');

        expect($scope.destModel).to.deep.equal({ id: 1, message: "cloned message" });
      });

      it ('clones src by value rather than reference', function () {
        var element = $compile(template)($scope);

        element.triggerHandler('click');

        $scope.srcModel.message = 'updated message';
        $scope.$digest();

        expect($scope.destModel).to.deep.equal({ id: 1, message: 'cloned message' });
      });

      it ('copies tw-clone-from into tw-clone-to when tw-clone-to is not yet defined', function () {
        $scope.destModel = undefined;

        var element = $compile(template)($scope);
        element.triggerHandler('click');

        expect($scope.destModel).to.deep.equal({ message: 'cloned message' });

        $scope.srcModel.message = 'updated message';
        $scope.$digest();

        expect($scope.destModel).to.deep.equal({ message: 'cloned message' });
      });
    });



    describe ('twAutosave', function () {
      var $scope
        , $compile
        , debouncer
        , template = '<form tw-autosave="saveAsDraft(formData)" ng-model="formData"></form>';

      beforeEach(module(function($provide) {
        debouncer = { debounce: sinon.spy() };
        $provide.factory('Debouncer', function () { return debouncer });
      }));

      beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();

        $scope.formData = { name: 'Diego' };
        $scope.saveAsDraft = sinon.spy();
      }));

      it ('executes callback with deboucer whenever collection model changes value', function () {
        var element = $compile(template)($scope);

        $scope.formData.name = 'Diego Borges';
        $scope.$digest();

        expect(debouncer.debounce).to.have.been.calledWith(
          element.isolateScope().autosave,
          500
        );
      });

      it ('does not auto saves model when autosave is disabled', function () {
        var template = '<form tw-autosave="saveAsDraft(formData)" tw-autosave-when="autosaveEnabled" ng-model="formData"></form>';

        $scope.autosaveEnabled = false;
        $compile(template)($scope);

        $scope.formData.name = 'Diego Borges';
        $scope.$digest();

        expect(debouncer.debounce).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is "undefined"', function () {
        $compile(template)($scope);

        $scope.formData = undefined;
        $scope.$digest();

        expect(debouncer.debounce).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is "null"', function () {
        $compile(template)($scope);

        $scope.formData = null;
        $scope.$digest();

        expect(debouncer.debounce).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is an empty object', function () {
        $compile(template)($scope);

        $scope.formData = {};
        $scope.$digest();

        expect(debouncer.debounce).to.not.have.been.called;
      });

      it ('does not trigger callback if new value of watched model is an empty array', function () {
        $compile(template)($scope);

        $scope.formData = [];
        $scope.$digest();

        expect(debouncer.debounce).to.not.have.been.called;
      });
    });
  });
});