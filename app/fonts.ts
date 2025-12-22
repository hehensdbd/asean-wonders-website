// app/fonts.ts
import localFont from 'next/font/local';

// 定义并导出您的字体
export const thaiFont = localFont({
  src: './fonts/演示秋鸿楷.ttf',
  variable: '--font-thai',
  display: 'swap',
});
