app.controller( "rsvpController", [ "$scope", "$http", "$sce", function( $scope, $http )
{
  $scope.find = function()
  {
  	$http.post( "/public/php/get-guest.php", { "firstname" : $scope.guest.firstname, "lastname" : $scope.guest.lastname } ).
      success( function( data )
      {
        $scope.guest = data;
        $scope.foundNewGuest = true;
      } ); 
  };

  $scope.rsvp = function()
  {
    $scope.submit = true;
    $http.post( "/public/php/rsvp.php", $scope.guest ).success( function( data )
    {
      $scope.success = $data.success;
    } );
  }
} ] );

app.directive( "showKids", [ "$compile", function( $compile ) 
{
  var getTemplate = function( numKids, guest )
  {
    if( numKids == 0 )
    {
      return "<div />";
    }
    else if( numKids == 1 )
    {
      return '<div class="rsvp2">Will your child be coming with you? </div><input type="checkbox" ng-model="guest.number_of_children_going" value="1" />Yes<br />'
    }
    else
    {
      var returnVal = '<div class="rsvp2">Of your ' + guest.number_of_children + ' kids, how many will be coming? </div>'
      for( var x = 0; x <= guest.number_of_children; x++ )
      {
        returnVal += '<input type="radio" ng-model="guest.number_of_children_going" value="' + x;
        if( x == guest.number_of_children )
        {
          returnVal += " checked";
        }
        returnVal += '">' + x + ' ';
      }
          
      returnVal += "<br />"
      return returnVal;
    }
  };
  return {
    restrict : "A",
    link : function(scope, element, attrs)
    {
      scope.$watch( attrs.guest, function( newValue, oldValue )
      {
        var data;
        if( newValue && oldValue )
        {
          if( newValue.number_of_children != oldValue.number_of_children )
          {
            data = getTemplate( newValue.number_of_children, newValue );
            element.prepend( $compile( data )(scope) );
          }
        }
      } );
    }
  }
} ] );