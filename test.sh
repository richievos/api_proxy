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

echo "\n\n************** Field stripping ********************\n"
echo Base data
echo curl --header "Host: node" "localhost:9000/cache_headers"
curl --header "Host: node" "localhost:9000/cache_headers"
echo "\n"

echo "1 key"
echo curl --header "Host: node" "localhost:9000/cache_headers?fields=key1"
curl --header "Host: node" "localhost:9000/cache_headers?fields=key1"
echo "\n"

echo "Multiple keys"
echo curl --header "Host: node" "localhost:9000/cache_headers?fields=key1,key2"
curl --header "Host: node" "localhost:9000/cache_headers?fields=key1,key2"
echo "\n"
