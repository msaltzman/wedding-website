var app = angular.module( 'wedding', ['ui.bootstrap', 'timer', 'ngRoute']);

function AccordionDemoCtrl( $scope )
{
  $scope.oneAtATime = true;
  $scope.groups = [
    {
      title: 'Wedding Info',
      content: [ 'Date', 'Location', 'Bridal Party', 'Grooms Party' ]
    },
    {
      title: 'Gift Registry',
      content: [ 'Amazon', 'Macys' ]
    },
    {
      title: 'Guest Information',
      content: [ 'Leesburg', 'Hotel' ]
    },
    {
      title: "RSVP",
      content: [ 'RSVP' ]
    }
  ];
  $scope.items = ['Item 1', 'Item 2', 'Item 3'];
  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };
  $scope.status = {
    isFirstOpen: false,
    isFirstDisabled: true
  };
  $scope.whiteSpaceRemover = function( val )
  {
    var retVal = val.replace( /\s/g, "_" );
    return( retVal );
  };
  $scope.test = function( event )
  {
    console.log( event );
  };
}
app.config( [ '$routeProvider',
  function( $routeProvider )
  {
    console.log( $routeProvider.location );
    $routeProvider.when( '/welcome',
      {
        templateUrl: '/public/html/templates/welcome.html'
      } ).when( '/Location' ,
      {
        templateUrl: '/public/html/templates/location.html'
      } ).when( '/Date' ,
      {
        templateUrl: '/public/html/templates/date.html'
      } ).when( '/Bridal_Party' ,
      {
        templateUrl: '/public/html/templates/bridal_party.html'
      } ).when( '/Grooms_Party' ,
      {
        templateUrl: '/public/html/templates/grooms_party.html'
      } ).when( '/Hotel' ,
      {
        templateUrl: '/public/html/templates/hotel.html'
      } ).when( '/Amazon',
      {
        templateUrl: '/public/html/templates/amazon.html'
      } ).when( "/Leesburg",
      {
        templateUrl: '/public/html/templates/leesburg.html'
      } ).when( "/Macys",
      {
        templateUrl: '/public/html/templates/macys.html'
      } ).when( '/RSVP',
      {
        templateUrl: '/public/html/templates/rsvp.html'
      } ).otherwise(
      {
        redirectTo : "/welcome"
      } );
  } ] );