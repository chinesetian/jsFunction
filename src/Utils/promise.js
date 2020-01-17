export function catchPromise(fn) {
  return new Promise((resolve, rejct) => {
    fn.then(res => resolve(res),err => {
      console.error(err)
      rejct()
    }).catch(e => {
      console.error(e)
      resolve()
    })
  })
}
export function sleep(time) {
  return new Promise((resolve, rejct) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
