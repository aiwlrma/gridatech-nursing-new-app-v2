#!/usr/bin/env node

/**
 * SVG 아이콘 검증 스크립트
 * 아이콘이 올바르게 구현되었는지 자동으로 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 검증할 파일들
const ICON_INDEX_PATH = 'src/assets/icons/index.ts';
const SVG_ICONS_DIR = 'src/assets/icons';

// 필수 SVG 속성들
const REQUIRED_ATTRIBUTES = {
  'stroke-width': '1.5',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'fill': 'none'
};

// 금지된 속성들
const FORBIDDEN_ATTRIBUTES = [
  'fill="#',
  'stroke="#',
  'stroke-width="2"',
  'stroke-width="1"',
  'stroke-width="3"'
];

function validateSvgContent(svgContent, iconName) {
  const errors = [];
  const warnings = [];

  // currentColor 사용 확인
  if (!svgContent.includes('currentColor')) {
    errors.push(`❌ ${iconName}: currentColor를 사용해야 합니다`);
  }

  // 필수 속성 확인
  Object.entries(REQUIRED_ATTRIBUTES).forEach(([attr, value]) => {
    if (!svgContent.includes(`${attr}="${value}"`)) {
      errors.push(`❌ ${iconName}: ${attr}="${value}" 속성이 필요합니다`);
    }
  });

  // 금지된 속성 확인
  FORBIDDEN_ATTRIBUTES.forEach(forbidden => {
    if (svgContent.includes(forbidden)) {
      errors.push(`❌ ${iconName}: ${forbidden} 사용이 금지됩니다`);
    }
  });

  // viewBox 확인
  if (!svgContent.includes('viewBox="0 0 24 24"')) {
    errors.push(`❌ ${iconName}: viewBox="0 0 24 24"가 필요합니다`);
  }

  // SVG 태그 확인
  if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
    errors.push(`❌ ${iconName}: 올바른 SVG 구조가 필요합니다`);
  }

  return { errors, warnings };
}

function validateIconIndex() {
  const indexPath = path.join(process.cwd(), ICON_INDEX_PATH);
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ src/assets/icons/index.ts 파일을 찾을 수 없습니다');
    return false;
  }

  const content = fs.readFileSync(indexPath, 'utf8');
  const errors = [];

  // SVG_ICONS 객체 확인
  if (!content.includes('export const SVG_ICONS')) {
    errors.push('❌ SVG_ICONS 객체가 정의되지 않았습니다');
  }

  // 타입 정의 확인
  if (!content.includes('export type SvgIconName')) {
    errors.push('❌ SvgIconName 타입이 정의되지 않았습니다');
  }

  // 유틸리티 함수 확인
  if (!content.includes('isValidIconName')) {
    errors.push('❌ isValidIconName 함수가 정의되지 않았습니다');
  }

  if (!content.includes('getSafeIcon')) {
    errors.push('❌ getSafeIcon 함수가 정의되지 않았습니다');
  }

  if (errors.length > 0) {
    console.error('📋 아이콘 인덱스 파일 검증 실패:');
    errors.forEach(error => console.error(error));
    return false;
  }

  console.log('✅ 아이콘 인덱스 파일 검증 통과');
  return true;
}

function validateSvgFiles() {
  const iconsDir = path.join(process.cwd(), SVG_ICONS_DIR);
  
  if (!fs.existsSync(iconsDir)) {
    console.error('❌ src/assets/icons 디렉토리를 찾을 수 없습니다');
    return false;
  }

  const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  let allValid = true;

  console.log(`\n🔍 ${files.length}개의 SVG 파일 검증 중...`);

  files.forEach(file => {
    const filePath = path.join(iconsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const iconName = file.replace('.svg', '');
    
    const { errors, warnings } = validateSvgContent(content, iconName);

    if (errors.length > 0) {
      console.error(`\n❌ ${iconName}.svg 검증 실패:`);
      errors.forEach(error => console.error(error));
      allValid = false;
    } else {
      console.log(`✅ ${iconName}.svg 검증 통과`);
    }

    if (warnings.length > 0) {
      warnings.forEach(warning => console.warn(warning));
    }
  });

  return allValid;
}

function main() {
  console.log('🎨 SVG 아이콘 검증 시작...\n');

  const indexValid = validateIconIndex();
  const svgValid = validateSvgFiles();

  console.log('\n📊 검증 결과:');
  console.log(`아이콘 인덱스: ${indexValid ? '✅ 통과' : '❌ 실패'}`);
  console.log(`SVG 파일들: ${svgValid ? '✅ 통과' : '❌ 실패'}`);

  if (indexValid && svgValid) {
    console.log('\n🎉 모든 검증을 통과했습니다!');
    process.exit(0);
  } else {
    console.log('\n💥 검증 실패! 위의 오류를 수정해주세요.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  validateSvgContent,
  validateIconIndex,
  validateSvgFiles
};
