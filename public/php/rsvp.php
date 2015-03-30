<?php  

$conn = new mysqli( $servername, $username, $password, $database );

if( $conn->connect_error )
{
	die( "Connection Failed: " . $conn->connect_error );
}

function sendUpdate( $pk, $going, $number_of_kids_going, $kosher, $gluten_free, $conn )
{
  if( !( $stmt = $conn->prepare( "UPDATE guestlist SET going = ?, kosher = ?, number_of_kids_going = ?, gluten_free = ? WHERE pk = ?" ) ) )
  {
    echo "{ \"ERROR\" : \"Prepare Failed\" }";
  }

  if( !$stmt->bind_param( "iiiii", $going, $kosher, $number_of_kids_going, $gluten_free, $pk ) )
  {
    echo "{ \"ERROR\" : \"Bind Failed\" }";
  }

  return $stmt.execute();
}

$success = getGuest( $_POST[ "pk" ], $_POST[ "going" ], $_POST[ "number_of_kids_going" ], $_POST[ "kosher" ], $_POST[ "gluten_free" ], $conn );

if( $success )
{
  foreach( $_POST[ "additional" ] as $additionalGuest )
  {
    if( $success )
    {
      $success = getGuest( $additionalGuest[ "pk" ], $additionalGuest[ "going" ], 0, $additionalGuest[ "kosher" ], $additionalGuest[ "gluten_free" ], $conn );
    }
  }
}

$conn->close();

header( "Content-Type: application/json" );
echo "{ \"success\" : " . $success . " }";
?>