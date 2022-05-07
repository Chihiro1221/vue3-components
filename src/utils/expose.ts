import { getCurrentInstance } from 'vue'

// 将需要的方法暴露到组件实例对象上
export function expose<T>(extra: T) {
  const instance = getCurrentInstance()
  Object.assign(instance?.proxy, extra)
}