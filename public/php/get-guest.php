<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);



$conn = new mysqli( $servername, $username, $password, $database );

if( $conn->connect_error )
{
	die( "Connection Failed: " . $conn->connect_error );
}

function getGuest( $firstname, $lastname, $conn )
{
  if( !( $stmt = $conn->prepare( "SELECT pk, firstname, lastname, going, gluten_free, kosher, number_of_children, number_of_children_going FROM guestlist WHERE firstname = ? AND lastname = ?" ) ) )
  {
    echo "{ \"ERROR\" : \"Prepare Failed\" }";
  }

  if( !$stmt->bind_param( "ss" $firstname, $lastname ) )
  {
    echo "{ \"ERROR\" : \"Bind Failed\" }";
  }

  return $stmt->execute();
}

function getAdditionalGuestsPk( $pk, $conn )
{
  if( !( $stmt = $conn->prepare( "SELECT can_rsvp_for FROM guest_link WHERE primary = ? ) ) )
  {
    echo "{ \"ERROR\" : \"Prepare Failed\" }";
  }

  if( !$stmt->bind_param( "i" $pk ) )
  {
    echo "{ \"ERROR\" : \"Bind Failed\" }";
  }

  return $stmt->execute();
}

function getAdditionalGuest( $pk, $conn )
{
  if( !( $stmt = $conn->prepare( "SELECT * FROM guestlist WHERE pk = ? ) ) )
  {
    echo "{ \"ERROR\" : \"Prepare Failed\" }";
  }

  if( !$stmt->bind_param( "i" $pk ) )
  {
    echo "{ \"ERROR\" : \"Bind Failed\" }";
  }

  return $stmt->execute();
}

function createJSONObject( $stmt, $conn, $isPrimary )
{
  $data = "{ "
  $first = True;

  $stmt->bind_result( $pk, $firstname, $lastname, $going, $gluten_free, $kosher, $number_of_children, $number_of_children_going );

  while( $stmt->fetch() )
  {
    if( !$first )
    {
      $data .= " }, { ";
    }

    $data .= "\"firstname\" : \"" . $firstname . "\", ";
    $data .= "\"lastname\" : \"" . $lastname . "\", ";
    $data .= "\"going\" : " . $going . ", ";
    $data .= "\"gluten free\" : " . $gluten_free . ", ";
    $data .= "\"kosher\" : " . $kosher . ", ";
    $data .= "\"number of children\" : " . $number_of_children . ", ";
    $data .= "\"children going\" : " . $number_of_children_going;  
  }

  if( $isPrimary )
  {
    $first = True;
    $additional = getAdditionalGuestsPk( mysql_result( $stmt, 0, "pk" ) );
    $additional->bind_result( $guest_pk );

    $data .= "\"additional\" : [ ";

    while( $additional->fetch() )
    {
      $guest = getAdditionalGuest( $pk, $conn );
      
      if ( !$first )
      {
        $data .= ", ";
      }

      $data .= createJSONObject( $guest, $conn, False );
      $guest->close();
      $first = False;
    }

    $additional->close();
  }

  $stmt->close();
  $data .= " }";
  return $data;
}

$stmt = getGuest( $_POST[ "firstname" ], $_POST[ "lastname" ], $conn );
$data = createJSONObject( $stmt, "", $conn, True );
$conn->close();

header( "Content-Type: application/json" );
echo $data;
?>