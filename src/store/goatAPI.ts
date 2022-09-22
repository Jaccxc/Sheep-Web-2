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

  const loading = ref(false)
  const APIdata = ref([] as trackerData[])
  // const APIimage = ref()

  function setLoader(value: boolean) {
    // eslint-disable-next-line no-console
    console.log('setLoader', value)
    loading.value = value
  }

  function getTopNfromDate(topN: number, dateObj: Date) {
    const yearString = dateObj.getFullYear().toString()
    const monthString = '0'.concat((dateObj.getMonth() + 1).toString()).slice(-2)
    const dayString = '0'.concat(dateObj.getDate().toString()).slice(-2)
    const sepString = '/'
    const dateToRequest = yearString.concat(sepString).concat(monthString).concat(sepString).concat(dayString)
    console.log(dateToRequest)
    const url = 'http://sheeped01.ddns.net:5000/getTopN'
    setLoader(true)
    axios.get(url, { params: { N: topN, date: dateToRequest } }).then((res) => {
      APIdata.value = res.data
    })
    setLoader(false)
  }

  // function getImage(value: number) {

  // }

  function buttonTest(valueN: number) {
    // eslint-disable-next-line no-console
    console.log(valueN)
  }

  return {
    APIdata,
    getTopNfromDate,
    setLoader,
    loading,
    buttonTest,
    // getImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGoatStore, import.meta.hot))
