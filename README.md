get-command-flags
=================

Install
-------

`npm --save get-command-flags`

Usage
-----

The `flags` variable in this example is javascript object of flags.

Running a hypothetical command `myprogram firstarg --flag=val --speak bla -t=2`

```javascript
var flags = require('get-command-flags')();
//flags = {flag: 'val', speak: 'bla', t:2}
```

About
-----

`get-command-flags` parses command line argument flags.

It also ignores positional arguments.

See the module `get-command-args` for positional argument getting.

### In the browser

It parses the query string (`window.location.search`), and returns them as a substitute for command line flags.

This way a command line program using `get-command-flags` will still work in a browser `<style>` tag `src`.
