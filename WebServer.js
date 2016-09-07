var http = require('http');
var async = require('async');
var jade = require('jade');

var redisClient = require('./GetRedisClient')();

// set up Jade template
var layout = require('fs').readFileSync(__dirname + '/score.jade', 'utf8');
var fn = jade.compile(layout, {filename: __dirname + '/score.jade'});
 
	
// select fifth database
redisClient.select(5);

// helper function
function makeCallbackFunc(member) {
   return function(callback) {
      redisClient.hgetall(member, function(err, obj) {
         callback(err,obj);
      });
   };
}
http.createServer(function(req,res) {

   // first filter out icon request
   if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end();
      return;
   }

   // get scores, reverse order, top five only
   redisClient.zrevrange('Zowie!',0,4, function(err,result) {
      var scores;
      if (err) {
         console.log(err);
         res.end('Top scores not currently available, please check back');
         return;
      }

      // create array of callback functions for Async.series call
      var callFunctions = new Array();

      // process results with makeCallbackFunc, push newly returned
      // callback into array
      for (var i = 0; i < result.length; i++) {
         callFunctions.push(makeCallbackFunc(result[i]));
      }

      // using Async series to process each callback in turn and return
      // end result as array of objects
      async.series(
         callFunctions,
         function (err, result) {
            if (err) {
               console.log(err);
               res.end('Scores not available');
               return;
            }

            // pass object array to template engine
            var str = fn({scores : result});
            res.end(str);
       });
   });
}).listen(3000);

console.log('Server running on 3000/');
