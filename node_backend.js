var http = require('http'),
    util = require('util');

var port = process.argv[2] || 9000;

util.puts('starting node backend on port ' + port);

// before do
//   response.headers['X-Backend'] = "Sinatra example_backend.rb"
// end

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public; max-age=100' });

  res.write('{ "key1": "value1", "key2": "value2" }')
  res.end();
}).listen(parseInt(port));