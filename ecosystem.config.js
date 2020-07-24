module.exports = {
    apps: [{
        name: "titanx",
        script: "./main.js",
        instances: 2,
        exec_mode: "cluster",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            PORT: '3000',
            NODE_ENV: "production",
        }
    }, {
        name: "test",
        script: "./dist/main.js",
        watch: true,
        env: {
            NODE_ENV: "development",
            DATABASE_USER: 'test',
            DATABASE_PASSWORD: 'test',
            DATABASE_URI: 'localhost:3600',
            REDIS_USER: 'test',
            REDIS_PASSWORD: 'test',
            REDIS_HOST: 'localhost',
            REDIS_PORT: '6379'
        },
        env_production: {
            NODE_ENV: "production",
        }
    }],
};
