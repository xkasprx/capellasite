module.exports = {
  apps : [{
    name: `Capella`,
    script: `./app.js`,
    watch: true,
    env: {
      NODE_ENV: `production`,
    },
  }],
};