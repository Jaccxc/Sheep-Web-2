import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useGoatStore = defineStore('user', () => {
  interface trackerData {
    T_ID: string
    LOG_TIME: dateData
    DURATION: timeData
    IMG_ID: string
    ID: string
    ACCUMULATION: timeData
  }
  interface dateData {
    year: string
    month: string
    day: string
  }
  interface timeData {
    hour: string
    minute: string
    second: string
    totalSeconds: string
  }

  const APIurl = 'http://sheeped01.ddns.net:5000/getTopN'
  const loading = ref(false)
  const APIdata = ref([] as trackerData[])
  const nullAPIData = ref(true)
  const thresholdDuration = ref(600)
  const thresholdAccum = ref(1800)
  const topN = ref(20)
  const thresholdDurationInput = ref()
  const thresholdAccumInput = ref()
  const topNInput = ref()
  // const APIimage = ref()

  function setLoader(value: boolean) {
    // eslint-disable-next-line no-console
    console.log('setLoader', value)
    loading.value = value
  }

  function initLocal() {
    const durationAcceptor = localStorage.getItem('thresholdDuration')
    if (durationAcceptor !== null)
      thresholdDuration.value = parseInt(durationAcceptor)
    if (!isOkNumber(thresholdDuration.value))
      thresholdDuration.value = 600

    const accumAcceptor = localStorage.getItem('thresholdAccum')
    if (accumAcceptor !== null)
      thresholdAccum.value = parseInt(accumAcceptor)
    if (!isOkNumber(thresholdAccum.value))
      thresholdAccum.value = 600

    const topNAcceptor = localStorage.getItem('topN')
    if (topNAcceptor !== null)
      topN.value = parseInt(topNAcceptor)
    if (!isOkNumber(topN.value))
      topN.value = 600
  }

  function saveLocal() {
    if (thresholdDurationInput.value !== undefined && thresholdDurationInput.value !== null) {
      thresholdDuration.value = thresholdDurationInput.value
      localStorage.setItem('thresholdDuration', thresholdDuration.value.toString())
      thresholdDurationInput.value = null
    }
    else {
      // eslint-disable-next-line no-console
      console.log('empty string threshold duration')
    }

    if (thresholdAccumInput.value !== undefined && thresholdAccumInput.value !== null) {
      thresholdAccum.value = thresholdAccumInput.value
      localStorage.setItem('thresholdAccum', thresholdAccum.value.toString())
      thresholdAccumInput.value = null
    }
    else {
      // eslint-disable-next-line no-console
      console.log('empty string threshold accum')
    }

    if (topNInput.value !== undefined && topNInput.value !== null) {
      topN.value = topNInput.value
      localStorage.setItem('topN', topN.value.toString())
      topNInput.value = ''
    }
    else {
      // eslint-disable-next-line no-console
      console.log('empty string topN')
    }
  }

  function processDateString(dateObj: Date) {
    const yearString = dateObj.getFullYear().toString()
    const monthString = '0'.concat((dateObj.getMonth() + 1).toString()).slice(-2)
    const dayString = '0'.concat(dateObj.getDate().toString()).slice(-2)
    const sepString = '/'
    const result = yearString.concat(sepString).concat(monthString).concat(sepString).concat(dayString)
    return result
  }

  function getTopNfromDate(topN: number, dateObj: Date) {
    const dateToRequest = processDateString(dateObj)
    setLoader(true)
    axios.get(APIurl, { params: { N: topN, date: dateToRequest } }).then(async (res) => {
      await delay(200 + Math.floor(Math.random() * 500))
      APIdata.value = res.data
      if (APIdata.value[1] === undefined)
        nullAPIData.value = true
      else
        nullAPIData.value = false
      setLoader(false)
    })
  }

  function getAllfromDate(dateObj: Date) {
    getTopNfromDate(999, dateObj)
  }

  function isNumber(evt: KeyboardEvent): void {
    const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const keyPressed: string = evt.key

    if (!keysAllowed.includes(keyPressed))
      evt.preventDefault()
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function removePaddingZero(data: string) {
    if (data[0] === '0')
      return data[1]
    else
      return data
  }

  function isOkNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function getImageFromImageID(valueN: string) {
    // eslint-disable-next-line no-console
    console.log(valueN)
    window.open('http://sheeped01.ddns.net:5000/getImage?IMG_ID='.concat(valueN))
  }

  return {
    isNumber,
    APIdata,
    thresholdAccum,
    thresholdDuration,
    topN,
    thresholdAccumInput,
    thresholdDurationInput,
    topNInput,
    initLocal,
    saveLocal,
    getTopNfromDate,
    getAllfromDate,
    setLoader,
    loading,
    getImageFromImageID,
    nullAPIData,
    removePaddingZero,
    // getImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGoatStore, import.meta.hot))
