var chokidar = require('chokidar');

/*
git remote add origin https://github.com/hollowdoor/penumbra_watch.git
git push -u origin master
*/

module.exports = function(pen){

    pen = pen || null;

    return function(names, options){

        var watcher,
            tasks,
            penTasks = [],
            fnTasks = [],
            cwd = options.cwd || process.cwd();

        if(typeof options === 'function' || typeof options === 'string'){
            tasks = Array.prototype.slice.call(arguments, 1);
            options = {};
        }else{
            tasks = Array.prototype.slice.call(arguments, 2);
        }

        if(!tasks.length){
            throw new Error('You need some tasks in the rest of the arguments of your watcher.');
        }

        if(!names.length){
            throw new Error('You need some file names in the first argument of your watcher.');
        }



        watcher = chokidar.watch(names, options);

        if(tasks.length){
            watcher.on('all', function(event, _path){
                var penTasks = [], fnTasks = [];

                for(var i=0; i<tasks.length; i++){
                    if(typeof tasks[i] === 'string'){
                        penTasks.push(tasks[i]);
                    }else if(typeof tasks[i] === 'function'){
                        fnTasks.push(tasks[i]);
                    }
                }
                if(pen && penTasks.length){
                    pen.exec.apply(pen, penTasks).then(function(){
                        runFN(fnTasks, _path);
                    });
                }               

            });
        }

        function runFN(fnTasks, _path){
            for(var i=0; i<fnTasks.length; i++){
                fnTasks[i](_path);
            }
        }


        watcher.on('error', function(err){
            console.log('penumbra-watch error '+err.message);
        });

        return watcher;
    };
};
