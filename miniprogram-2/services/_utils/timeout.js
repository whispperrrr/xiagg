// Promise对象会在指定的时间（默认1000ms）后被拒绝，用于触发超时错误处理
export function timeout(ms = 1000) {
  return new Promise((_, reject) => setTimeout(reject, ms));
}
