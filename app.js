
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var hotplate = require('hotplate');

var app = express();

// Associate "app" to hotplate
hotplate.setApp( app );

// Register two Hotplate modules
hotplate.registerModule( 'module3', require('module3') );
hotplate.registerModule( 'module2', require('module2') );
hotplate.registerModule( 'module1', require('module1') );

// Initialise the modules. Once done, continue with node's usual rock&roll
hotplate.initModules( function() {

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // Run the modules. This will call `run` of each module. `run` can do all sorts
  // of fancy things, like setting routes etc.
  hotplate.runModules( function() {

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
  });

}) // End of the rock&roll


