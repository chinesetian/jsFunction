//const message = postMessage
export function print(data) {
    const [level, params, ...args] = data
    try {
      console[level](...args, ...JSON.parse(params))
    } catch (e) {
      // console.error(e, data)
    }
    //message({aa:123456})
  }
  