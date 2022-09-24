import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useGoatStore = defineStore('user', () => {
  interface trackerData {
    T_ID: string
    LOG_TIME: dateData
    DURATION: timeData
    IMG_ID: string
    ID: string
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
  }

  const APIurl = 'http://sheeped01.ddns.net:5000/getTopN'
  const loading = ref(false)
  const APIdata = ref([] as trackerData[])
  const nullAPIData = ref(true)
  const thresholdString = ref('')
  const topNString = ref('')
  // const APIimage = ref()

  function setLoader(value: boolean) {
    // eslint-disable-next-line no-console
    console.log('setLoader', value)
    loading.value = value
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

  function filterText() {
    thresholdString.value.replace(/[^0-9]/g, '')
    topNString.value.replace(/[^0-9]/g, '')
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

  function getImageFromImageID(valueN: string) {
    // eslint-disable-next-line no-console
    console.log(valueN)
    window.open('http://sheeped01.ddns.net:5000/getImage?IMG_ID='.concat(valueN))
  }

  return {
    APIdata,
    getTopNfromDate,
    getAllfromDate,
    setLoader,
    loading,
    getImageFromImageID,
    nullAPIData,
    filterText,
    thresholdString,
    topNString,
    removePaddingZero,
    // getImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGoatStore, import.meta.hot))
