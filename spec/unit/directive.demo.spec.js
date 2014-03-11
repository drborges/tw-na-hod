describe ('directive-demo', function () {
  var $scope,
      $compile;

  beforeEach(angular.mock.module('directive-demo'));

  describe('Debouncer', function () {
    var debouncer, $timeout;

    beforeEach(inject(function (Debouncer, _$timeout_) {
      debouncer = Debouncer;
      $timeout = _$timeout_;
    }));

    it ('debounces callback for multiple calls within 300 ms', function () {
      var fn = sinon.spy();

      debouncer.debounce(fn, 300);
      $timeout.flush(100);
      debouncer.debounce(fn, 300);
      $timeout.flush(100);
      debouncer.debounce(fn, 300);
      $timeout.flush();

      expect(fn).to.have.been.calledOnce;
   });
  });

  describe ('twClone', function () {
    var template = '<button tw-clone tw-src-model="template" tw-dest-model="target" tw-on="click">Clone</button>';

    beforeEach(inject(function (_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();

      $scope.template = { message: 'cloned message' };
      $scope.target = { id: 1, message: 'initial message' };
    }));

    it ('defaults clone trigger to "click" event', function () {
      var template = '<button tw-clone tw-src-model="template" tw-dest-model="target">Clone</button>';
      var element = $compile(template)($scope);

      element.triggerHandler('click');

      expect($scope.target).to.deep.equal({ id: 1, message: "cloned message" });
    });

    it ('clones tw-src-model into tw-dest-model on "click" event', function () {
      var element = $compile(template)($scope);

      expect($scope.target).to.deep.equal({ id: 1, message: "initial message" });

      element.triggerHandler('click');

      expect($scope.target).to.deep.equal({ id: 1, message: "cloned message" });
    });

    it ('clones tw-src-model into tw-dest-model on "keyup" event', function () {
      var template = '<input tw-clone tw-src-model="template" tw-dest-model="target" tw-on="keyup">Clone</button>';
      var element = $compile(template)($scope);

      expect($scope.target).to.deep.equal({ id: 1, message: "initial message" });

      element.triggerHandler('keyup');

      expect($scope.target).to.deep.equal({ id: 1, message: "cloned message" });
    });

    it ('clones by value rather than reference', function () {
      var element = $compile(template)($scope);
      element.triggerHandler('click');

      $scope.template.message = 'updated message';
      $scope.$digest();

      expect($scope.target).to.deep.equal({ id: 1, message: 'cloned message' });
    });
  });

  describe ('twAutosave', function () {
    var debouncer;

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

    it ('calls callback with deboucer whenever collection model changes value', function () {
      var template = '<form tw-autosave="saveAsDraft(formData)" ng-model="formData">Clone</button>';
      var element = $compile(template)($scope);

      $scope.formData.name = 'Diego Borges';
      $scope.$digest();

      expect(debouncer.debounce).to.have.been.calledWith(
        element.isolateScope().autosave,
        500
      );
    });

    it ('does not auto saves model if predicate is not met', function () {
      var template = '<form tw-autosave="saveAsDraft(formData)" tw-if="{{ 1 === 2 }}" ng-model="formData">Clone</button>';
      var element = $compile(template)($scope);

      $scope.formData.name = 'Diego Borges';
      $scope.$digest();

      expect(debouncer.debounce).to.not.have.been.called;
    });
  });
});