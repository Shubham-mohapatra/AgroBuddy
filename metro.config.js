const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable caching to prevent memory issues
config.cacheStores = [];
config.resetCache = true;

// Reduce memory footprint
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'],
};

module.exports = config;