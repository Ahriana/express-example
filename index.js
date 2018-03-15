const cluster = require('cluster');

if (cluster.isMaster) {
    const cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) { cluster.fork(); }
    cluster.on('exit', (worker) => {
        console.log(`cluster ${worker.id} died, spawning new cluster`);
        cluster.fork();
    });

} else {
    require('./server')(cluster);
}
