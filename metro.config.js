const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 웹 빌드를 위한 설정
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
