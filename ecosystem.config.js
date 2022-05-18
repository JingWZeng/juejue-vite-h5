module.exports = {
    apps: [
        {
            name: 'juejue-vite-h5',
            script: 'juejue-vite-h5-server.js'
        },
    ],
    deploy: {
        production: {
            user: 'root',
            host: '47.104.81.159',
            ref: 'origin/main',
            repo: 'git@github.com:JingWZeng/juejue-vite-h5.git',
            path: '/workspace/juejue-vite-h5',
            'post-deploy': 'git reset --hard && git checkout master && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js', //
            // 'post-deploy': 'git reset --hard && git checkout master && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
            env: {
                NODE_ENV: 'production'
            }
        }
    }
}