let $stateDecorator = function ($delegate, $rootScope) {

  const decorated$State = function() {
    var $state = $delegate;
    $state.goToPrevious = function() {};
    $rootScope.$on("$stateChangeSuccess", function (ev, to, toParams, from, fromParams) {
      $state.goToPrevious = function() {
        $state.go(from.name, fromParams);
      };
    });

    return $state;
  };

  return decorated$State();
}

$stateDecorator.$inject = ['$delegate', '$rootScope'];

export default $stateDecorator;
