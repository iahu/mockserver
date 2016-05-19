## mockserver
a mockjson(p) server, based on mock.js

### Install
`npm i iahu/mockserver -g`

### How to use
```log
Usage:
  mockserver [OPTIONS] FILE

  Options
    -f, --file string
    -p, --port number
    -c, --cache string
    -j, --no-jsonp string
    -k, --jsonpcallback string
    -b, --baseURI string
```

example:
`mockserver mock-temp.js`

### about mock template
```js
{
	"/api/getUsername" /* path */: {/* mock.js syntax */},
	"/api/updateUsername" /* path */: {/* mock.js syntax */}
}
```
see [mock.js](https://github.com/nuysoft/Mock/wiki/Mock.Random)