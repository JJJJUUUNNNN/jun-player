export function debounce(func, duration) {
  let timeout

  return function (...args) {
    const effect = () => {
      timeout = null
      return func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}



export function setItem(key,val){
  localStorage.setItem(key,val)
}

export function getItem(key){
  return localStorage.getItem(key)
}