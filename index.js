var chokidar = require('chokidar');

/*
git remote add origin https://github.com/hollowdoor/penumbra_watch.git
git push -u origin master
*/

module.exports = function(pen){

    pen = pen || null;

    return function(names, options, tasks){

        var watcher, penTasks = [], fnTasks = [];
        if(typeof tasks === 'undefined'){
            tasks = Array.prototype.slice.call(arguments, 1);
            options = {};
        }else{
            tasks = Array.prototype.slice.call(arguments, 2);
        }

        for(var i=0; i<tasks.length; i++){
            if(typeof tasks[i] === 'string'){
                penTasks.push(tasks[i]);
            }else if(typeof tasks[i] === 'function'){
                fnTasks.push(tasks[i]);
            }
        }

        watcher = chokidar.watch(names, options);

        if(tasks.length){
            watch.on('all', function(changes){
                var i=0;
                for(i=0; i<fnTasks.length; i++){
                    fnTasks(changes);
                }

                if(penTasks.length){
                    pen.exec.apply(pen, tasks);
                }
            });
        }


        watcher.on('error', function(err){
            console.log('penumbra-watch error '+err.message);
        });


        return watcher;
    };
};
