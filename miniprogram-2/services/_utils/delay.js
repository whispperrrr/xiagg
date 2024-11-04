// 模拟延迟执行
export function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}