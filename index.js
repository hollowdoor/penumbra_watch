var chokidar = require('chokidar');

module.exports = function(pen){
    return function(names, options, tasks){

        var watcher;
        if(typeof tasks === 'undefined'){
            tasks = Array.prototype.slice.call(arguments, 1);
            options = {};
        }else{
            tasks = Array.prototype.slice.call(arguments, 2);
        }

        watcher = chokidar.watch(names, options);

        if(tasks.length){
            if(typeof tasks[0] === 'function'){
                watcher.on('all', tasks[0]);
            }else{

                watcher.on('all', function(changes){
                    pen.exec.apply(pen, tasks);
                });
            }
        }


        watcher.on('error', function(err){
            console.log('penumbra-watch error '+err.message);
        });


        return watcher;
    };
};
