## mockserver
a mockjson(p) server, based on mock.js

### Install
`npm i iahu/mockserver -g`

### How to use
```log
Usage:
  cli.js [OPTIONS] [ARGS]

Options:
  -p, --port [NUMBER]    server port (Default is 8800)
  -j, --jsonp [BOOLEAN]  enabled jsonp (Default is true)
  -k, --jsonpcallback [STRING]jsonp callback name (Default is callback)
  -b, --baseURI [STRING] base path of API URI (Default is  )
  -h, --help             Display help and usage details
```

example:
`mockserver mock-temp.js`

### about mock.js
see [nuysoft/Mock](https://github.com/nuysoft/Mock/wiki/Mock.Random)