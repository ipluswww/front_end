describe( 'AppCtrl', function() {

  it ( 'should have Options defined', inject( function(){
    expect (Options).not.toBeUndefined();
  }));

  it ( 'should have Options.Portal defined', inject( function(){
    expect (Options.Portal).not.toBeUndefined();
  }));

  it ( 'should have Options.Portal.server defined', inject( function(){
    expect (Options.Portal.server).not.toBeUndefined();
  }));


  describe( 'isCurrentUrl', function() {
    var AppCtrl, $location, $scope;

    beforeEach( module( 'portalobject' ) );

    beforeEach( inject( function( $controller, _$location_, $rootScope ) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
    }));

    //it( 'should pass a dummy test', inject( function() {
    //  expect( AppCtrl ).toBeTruthy();
    //}));
  });
});
