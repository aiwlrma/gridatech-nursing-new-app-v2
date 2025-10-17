#!/usr/bin/env node

/**
 * SVG 아이콘 생성 템플릿
 * 새로운 아이콘을 올바른 형식으로 생성하는 도구입니다.
 */

const fs = require('fs');
const path = require('path');

// SVG 템플릿
const SVG_TEMPLATE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// TypeScript 템플릿
const TS_TEMPLATE = `export const {ICON_NAME_UPPER}_ICON = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>\`;`;

function createIcon(iconName, svgPath) {
  const iconNameUpper = iconName.toUpperCase();
  const iconNameLower = iconName.toLowerCase();
  
  // 1. SVG 파일 생성
  const svgFilePath = path.join(process.cwd(), 'src/assets/icons', `${iconNameLower}.svg`);
  fs.writeFileSync(svgFilePath, svgPath || SVG_TEMPLATE);
  console.log(`✅ SVG 파일 생성: ${svgFilePath}`);

  // 2. TypeScript 상수 생성
  const tsConstant = TS_TEMPLATE.replace(/{ICON_NAME_UPPER}/g, iconNameUpper);
  console.log(`\n📝 TypeScript 상수 (src/assets/icons/index.ts에 추가):`);
  console.log(tsConstant);

  // 3. SVG_ICONS 객체에 추가할 항목
  const svgIconsEntry = `  ${iconNameLower}: ${iconNameUpper}_ICON,`;
  console.log(`\n📋 SVG_ICONS 객체에 추가할 항목:`);
  console.log(svgIconsEntry);

  // 4. 사용 예시
  console.log(`\n💡 사용 예시:`);
  console.log(`<SvgIcon name="${iconNameLower}" size={24} color="#9CA3AF" />`);

  // 5. 검증 명령어
  console.log(`\n🔍 검증 명령어:`);
  console.log(`npm run validate:icons`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🎨 SVG 아이콘 생성 도구');
    console.log('\n사용법:');
    console.log('node scripts/icon-template.js <아이콘명> [SVG경로]');
    console.log('\n예시:');
    console.log('node scripts/icon-template.js settings');
    console.log('node scripts/icon-template.js user ./custom-user-icon.svg');
    return;
  }

  const iconName = args[0];
  const svgPath = args[1];

  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(iconName)) {
    console.error('❌ 아이콘명은 영문자로 시작하고 영문자와 숫자만 포함해야 합니다.');
    process.exit(1);
  }

  console.log(`🎨 "${iconName}" 아이콘 생성 중...\n`);

  try {
    let svgContent = null;
    
    if (svgPath) {
      const fullPath = path.resolve(svgPath);
      if (fs.existsSync(fullPath)) {
        svgContent = fs.readFileSync(fullPath, 'utf8');
        console.log(`📁 SVG 파일 로드: ${fullPath}`);
      } else {
        console.error(`❌ SVG 파일을 찾을 수 없습니다: ${fullPath}`);
        process.exit(1);
      }
    }

    createIcon(iconName, svgContent);
    
    console.log('\n🎉 아이콘 생성 완료!');
    console.log('\n📋 다음 단계:');
    console.log('1. src/assets/icons/index.ts에 TypeScript 상수 추가');
    console.log('2. SVG_ICONS 객체에 새 아이콘 추가');
    console.log('3. npm run validate:icons로 검증');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createIcon };
