#/bin/bash
echo "**************** Ruby ******************\n"
echo curl -i --header "Host: ruby" localhost:9010/cache_headers
curl -i --header "Host: ruby" localhost:9010/cache_headers
echo "\n"
echo curl -i --header "Host: ruby" localhost:9000/cache_headers
curl -i --header "Host: ruby" localhost:9000/cache_headers
echo


echo "\n\n************** Node ********************\n"
echo curl -i --header "Host: node" localhost:9030/cache_headers
curl -i --header "Host: node" localhost:9030/cache_headers
echo "\n"
echo curl -i --header "Host: node" localhost:9000/cache_headers
curl -i --header "Host: node" localhost:9000/cache_headers
echo