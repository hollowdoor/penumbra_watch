penumbra-watch
==============

Install
-------

`npm install --save penumbra-watch`

Or if you are working locally, but don't want `penumbra-watch` as a dependency.

`npm install --save-dev penumbra-watch`

Usage
-----

Install `penumbra`, and `vinyl-fs` to do this example.

```javascript
var pen = require('penumbra')(),
    //Make sure to pass the pen instance into the penumbra watch function.
    watch = require('penumbra-watch')(pen),
    fs = require('vinyl-fs');


pen.task('move', function * (){
    console.log('moving files');
    yield [
        fs.src(['./*.js']),
        map(log),
        fs.dest('./output')
    ];
});

watch('.', {
    cwd: process.cwd()
}, 'move');
```

`watch` can also be simply called as:

```javascript
watch('.', 'move', 'anotherTask');
```

or

```javascript
watch('.', function(){

}, /*... more functions, or penumbra tasks.*/);
```

Interface
---------

### require('penumbra-watch')(pen) -> watch

Pass a penumbra instance to the `pen` argument to use tasks in the watch constructor.

If you don't you can still use a callback, but you won't be able to use tasks directly in the watch function.

### watch(files, options, callback|task, ..., task) -> chokidar watcher

files can be one of these:

-	file name
-	file glob
-	array of file names, or globs

`options` are the same as **chokidar**.

The third argument can be a **callback, or a task string**.

If the third argument is a task then the rest of the arguments can be tasks.

Look at [chokidar](https://www.npmjs.com/package/chokidar) to learn more.

Use with a callback
-------------------

```javascript
var pen = require('penumbra')(),
    watch = require('penumbra-watch')(pen),
    fs = require('vinyl-fs');


pen.task('move', function * (){
    console.log('moving files');
    yield [
        fs.src(['./*.js']),
        map(log),
        fs.dest('./output')
    ];
});

watch('.', {
    cwd: process.cwd()
}, function(){
    console.log('ready to move');
    pen.exec('move').then(function(){
        console.log('done moving');
    });
});
```

Use with [browser-sync](https://browsersync.io/)
------------------------------------------------

```javascript
var bs = require('browser-sync').create(),
    reload = bs.reload,
    pen = require('penumbra')(),
    watch = require('penumbra-watch')(pen);

pen.task('serve', function * (){
    bs.init({server: '.'});
    //Here callback functions, and penumbra tasks are mixed.
    watch('.', reload, 'anotherTask', console.log.bind(console));
});

pen.task('anotherTask', function * (){
    console.log('anotherTask is running');
    /*... Do some stuff here.*/
});
```

About
-----

Use this module with `penumbra`.

If you would like a similar, but different interface then [gulp-watch](https://www.npmjs.com/package/gulp-watch) will also work with `penumbra`. [chokidar](https://www.npmjs.com/package/chokidar) itself will also work quite well.

`penumbra-watch` is just a little module to help decrease the code to start a file watcher using `penumbra`.
