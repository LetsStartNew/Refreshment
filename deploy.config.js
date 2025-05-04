
module.exports = {
  // Deployment configuration
  deployment: {
    // Environment settings
    environments: {
      production: {
        url: 'https://refreshmentcompany.com',
        buildCommand: 'npm run build',
        outputDir: 'dist',
      },
      staging: {
        url: 'https://staging.refreshmentcompany.com',
        buildCommand: 'npm run build:staging',
        outputDir: 'dist',
      },
      development: {
        url: 'http://localhost:8080',
        buildCommand: 'npm run dev',
        outputDir: 'dist',
      }
    },
    
    // Deployment hooks
    hooks: {
      preDeploy: 'npm run lint && npm run test',
      postDeploy: 'echo "Deployment completed successfully!"',
    },
    
    // Assets configuration
    assets: {
      compress: true,
      imageOptimization: true,
      cacheControl: {
        '**/*.html': 'public, max-age=0, must-revalidate',
        '**/*.js': 'public, max-age=31536000, immutable',
        '**/*.css': 'public, max-age=31536000, immutable',
        '**/*.{jpg,jpeg,png,gif,webp}': 'public, max-age=31536000, immutable',
      },
    },
    
    // Hosting providers configurations
    providers: {
      netlify: {
        team: 'refreshment-company',
        site: 'refreshment-company',
      },
      vercel: {
        scope: 'refreshment-company',
        project: 'refreshment-company',
      },
      firebase: {
        project: 'refreshment-company',
      },
    },
  },
  
  // Add deployment command to package.json scripts
  addDeployScript: true,
};
