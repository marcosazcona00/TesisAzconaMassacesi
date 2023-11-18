module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'npm',
        args: 'run dev',
        instances: 4,  // Número de clusters
        exec_mode: 'cluster',
      },
    ],
  };