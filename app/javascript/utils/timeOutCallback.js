// for user experience 200ms delay
const globalTime = 200
const globalRoot = "/#"

export default function timeOutCallback (url = globalRoot, time = globalTime) {
  setTimeout(() => {
    if (url !== globalRoot && url !== "/") {
      window.location.replace(globalRoot + url)
    }else {
      window.location.replace(url)
    }
  }, time)
}

export const timeOutWaiting = (ms=globalTime) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}