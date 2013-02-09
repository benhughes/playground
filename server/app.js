
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

var app = express();

var rootDir = path.join(__dirname, '../');

app.configure(function(){
    var folderList = fs.readdirSync(rootDir),
        ignoreList = ['server'],
        i;
    console.log('files found in ', rootDir, 'is ', folderList);
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    for (i = folderList.length; i--; ) {
        var currentFile = folderList[i];
        if(currentFile.charAt(0) !== '.' && ignoreList.indexOf(currentFile) === -1) {
            console.log('setting up /', currentFile);
            app.use('/' + currentFile, express.static(path.join(__dirname, '../' + currentFile)));
        }else {
            console.log('ignoring ', currentFile);
        }
    }

});

app.configure('development', function(){
  app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
