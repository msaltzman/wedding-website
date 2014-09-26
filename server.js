var koa = require( 'koa' );
var serve = require( 'koa-static' );
var route = require( 'koa-route' );
var views = require( 'co-views' );
var parse = require( 'co-body' );
var app = koa();

app.use( serve( '.' ) );
app.use( route.get( '/wedding', add ) );

var render = views( "./views", {
  map : { html : 'jade' }
} );

function *add()
{
  this.body = yield render( 'index.jade' );
}

app.listen(3000);