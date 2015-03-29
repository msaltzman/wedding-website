app.controller( "rsvpController", [ "$scope", "$http", "$sce", function( $scope, $http, $sce )
{
  $scope.guest = {
    additional : [
      {
        firstname : "Genevieve",
        lastname : "Fink"
      }
    ]
  };
  
  $scope.find = function()
  {
  	$http.post( "/public/php/get-guest.php", { "firstname" : $scope.guest.firstname, "lastname" : $scope.guest.lastname } ).
      success( function( data )
      {
        $scope.guest = data;
      } );
  }

  $scope.guest.number_of_children = 0;
  $scope.hasKids = function()
  {
    if( $scope.guest.number_of_children > 1 )
    {
      var returnVal = '<div class="rsvp2">Of your ' + $scope.guest.number_of_children + ' kids, how many will be coming? </div>'
      for( var x = 0; x <= $scope.guest.number_of_children; x++ )
      {
        returnVal += '<input type="radio" ng-model="guest.number_of_children_going" value="' + x;
        if( x == $scope.guest.number_of_children )
        {
          returnVal += " checked";
        }
        returnVal += '">' + x + ' ';
      }
          
      return $sce.trustAsHtml( returnVal );
    }
    else if ( $scope.guest.number_of_children == 1 )
    {
      return $sce.trustAsHtml('<div class="rsvp2">Will your child be coming with you? </div><input type="checkbox" ng-model="guest.number_of_children_going" value="1" />Yes');
    }
    else
    {
      return "";
    }
  }
} ] );

app.directive( "compile", function( $compile )
{
  return {
    restrict : "A",
    scope : false,
    link : function( scope, element, attrs )
    {
      scope.$watch( function( scope )
      {
        console.log( attrs );
        return scope.$eval( attrs.compile );
      },
      function( value )
      {
        element.html( value );

        $compile( element.contents() )(scope);
      } )
    }
  }
} );