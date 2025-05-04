
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Build configuration
const buildConfig = {
  command: 'npm run build',
  outputDir: 'dist',
  timestamp: new Date().toISOString()
};

// Ensure the output directory exists
function ensureOutputDirExists() {
  if (!fs.existsSync(buildConfig.outputDir)) {
    console.log(`📁 Creating output directory: ${buildConfig.outputDir}`);
    fs.mkdirSync(buildConfig.outputDir, { recursive: true });
  }
}

// Get Git information
function getGitInfo() {
  try {
    const gitBranch = process.env.GITHUB_REF ? 
      process.env.GITHUB_REF.replace('refs/heads/', '') : 
      execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    
    const gitCommit = process.env.GITHUB_SHA || 
      execSync('git rev-parse HEAD').toString().trim();
    
    return {
      branch: gitBranch,
      commit: gitCommit
    };
  } catch (error) {
    console.warn('Failed to get git info, using fallbacks', error);
    return {
      branch: 'unknown',
      commit: 'unknown'
    };
  }
}

// Deployment function
function deployProject() {
  console.log('🚀 Starting deployment process...');
  
  try {
    // Skip build if we're in GitHub Actions (already built)
    if (!process.env.GITHUB_ACTIONS) {
      console.log('📦 Building the project...');
      execSync(buildConfig.command, { stdio: 'inherit' });
    } else {
      console.log('⏩ Skipping build step in GitHub Actions environment');
    }
    
    // Ensure the output directory exists before writing the deploy info
    ensureOutputDirExists();
    
    // Get git info
    const gitInfo = getGitInfo();
    
    // Create deployment info file
    const deployInfo = {
      version: process.env.npm_package_version || '1.0.0',
      deployedAt: buildConfig.timestamp,
      environment: process.env.NODE_ENV || 'production',
      branch: gitInfo.branch,
      commit: gitInfo.commit
    };
    
    fs.writeFileSync(
      path.join(buildConfig.outputDir, 'deploy-info.json'), 
      JSON.stringify(deployInfo, null, 2)
    );
    
    console.log('✅ Deployment preparation completed successfully!');
    console.log('🌐 Your app is ready to be uploaded to your hosting provider.');
    console.log('📄 A deploy-info.json file has been created in the dist folder.');
    
    return true;
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Execute deployment
deployProject();
