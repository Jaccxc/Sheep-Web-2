<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Datepicker from 'vue3-datepicker'
import { useGoatStore } from '~/store/goatAPI'
const goatStore = useGoatStore()
const { getTopNfromDate, getAllfromDate, getImageFromImageID, removePaddingZero, initLocal } = useGoatStore()
const { APIdata, nullAPIData, topN, thresholdAccum, thresholdDuration } = storeToRefs(goatStore)
const selected = ref(new Date())
initLocal()
getTopNfromDate(topN.value, selected.value)
</script>

<template>
  <div>
    <div text-4xl>
      <div class="flex justify-center m-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99988 13.9998C3.49985 11.4998 2.99991 6 7.9999 4.99965C9.9999 4.85024 11.4999 5.50009 13.9999 7.99978L24.9999 19.9998L21.9999 23.9998" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M18.9999 14C14.9286 14.7071 6.99997 18 7.99997 28C8.49997 31 9.85917 33.9455 12.9999 37V42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M29 17C33.2213 16.5704 42.3115 17.439 44 25C44.5628 26.8617 44.0656 32.1577 39 38.0003V42.0003" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M32.9998 42C32.9998 38.134 29.6002 36 25.9998 36C22.3993 36 18.9998 38.134 18.9998 42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" /></svg>
      </div>
    </div>

    <p text-3xl>
      Goat Detection and Tracking Database
    </p>
    <div py-3 />
    <div text-xl text-black flex justify-center>
      <Datepicker
        v-model="selected"
        class="goatDate"
        style="background-color: #ffffff55; text-align: center; align-items: center;
        border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
        max-width: 200px; height: 30px;
        --vdp-hover-bg-color : #813d9c; --vdp-bg-color: #ffffffcc; --vdp-border-radius: 7px;
        --vdp-heading-hover-color : #ffffff33; --vdp-hover-bg-color : #4572b933; --vdp-selected-bg-color : #1c71d8;
        --vdp-hover-color : #3453b2"
      />
      <button class="text-3 bg-blue-200 rounded rounded-3 m-x-5 bg-op-70 text-black p-x-3" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" @click="getTopNfromDate(topN, selected)">
        Fetch
      </button>
    </div>

    <div py-4 />
    <div class="text-5">
      <div class="flex flex-col items-center">
        <ul>
          <div>
            <div v-if="nullAPIData">
              Currently no data on this day
            </div>
            <div v-else>
              <div class="table text-4.5">
                <div class="w-90px" />
                <div class="w-80px text-center table-cell v-middle">
                  羊隻編號
                </div>
                <div class="w-20px" />
                <div class="w-100px text-center table-cell v-middle">
                  出現時間
                </div>
                <div class="w-35px" />
                <div class="w-160px text-center table-cell v-middle">
                  單次連續出現時長
                </div>
                <div class="w-45px" />
                <div class="w-80px text-center table-cell v-middle">
                  影像編號
                </div>
                <div class="w-70px" />
                <div class="w-100px text-center table-cell v-middle">
                  總出現時長
                </div>
              </div>
              <li v-for="(entity, index) in APIdata" :key="index">
                <div class=" flex flex-row justify-center my-6 px-15 bg-white rounded-2 op-85 drop-shadow shadow-xl text-black text-op-80">
                  <div class="table">
                    <div class="text-right table-cell v-middle text-black-g text-op-50">
                      P{{ index }}.
                    </div>
                  </div>
                  <div class="table">
                    <div class="shadow-inner shadow-2xl w-80px p-r-20px text-right table-cell v-middle">
                      {{ entity.ID }}
                    </div>
                  </div>
                  <div class="text-right flex flex-row">
                    <div class="flex flex-row text-right min-w-120px max-w-120px p-r-15px p-l-5px m-1 rounded rounded-4">
                      <div class="table">
                        <div class="text-right table-cell v-middle ">
                          {{ removePaddingZero(entity.LOG_TIME.hour) }} : {{ removePaddingZero(entity.LOG_TIME.minute) }} :{{ removePaddingZero(entity.LOG_TIME.second) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-right flex flex-row">
                    <div
                      :class="{
                        'bg-red-6 bg-op-40 flex flex-row min-w-220px p-r-15px p-l-5px m-1 rounded rounded-4': (parseInt(entity.DURATION.totalSeconds) >= thresholdDuration),
                        'flex flex-row min-w-220px p-r-15px p-l-5px m-1 rounded rounded-4': (parseInt(entity.DURATION.totalSeconds) < thresholdDuration),
                      }"
                      style="
                    box-shadow: inset 2px 4px 2px 0 rgba(0, 0, 0, 0.1), inset 0 6px 20px 0 rgba(0, 0, 0, 0.08);"
                    >
                      <div class="table">
                        <div class="text-right max-w-35px min-w-35px table-cell v-middle ">
                          <div v-if="parseInt(entity.DURATION.hour) > 0">
                            {{ removePaddingZero(entity.DURATION.hour) }}
                          </div>
                        </div>
                      </div>
                      <div table>
                        <div class="text-right max-w-25px min-w-25px table-cell v-middle text-4 text-black-g text-op-50">
                          <div v-if="parseInt(entity.DURATION.hour) > 0">
                            hr.
                          </div>
                        </div>
                      </div>
                      <div class="table">
                        <div class="text-right max-w-35px min-w-35px table-cell v-middle ">
                          {{ removePaddingZero(entity.DURATION.minute) }}
                        </div>
                      </div>
                      <div table>
                        <div class="text-right max-w-35px min-w-35px table-cell v-middle text-4 text-black-g text-op-50">
                          min.
                        </div>
                      </div>
                      <div table>
                        <div class="text-right max-w-35px min-w-35px table-cell v-middle">
                          {{ removePaddingZero(entity.DURATION.second) }}
                        </div>
                      </div>
                      <div table>
                        <div class="text-right max-w-35px min-w-35px table-cell v-middle text-4 text-black-g text-op-50">
                          sec.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table">
                    <div class="max-w-100px min-w-100px p-r-20px text-right table-cell v-middle text-black-g text-op-50">
                      {{ entity.IMG_ID }}
                    </div>
                  </div>
                  <div
                    :class="{
                      'bg-red-6 bg-op-40 flex flex-row min-w-220px p-r-15px p-l-5px m-1 rounded rounded-4': (parseInt(entity.ACCUMULATION.totalSeconds) >= thresholdAccum),
                      'flex flex-row min-w-220px p-r-15px p-l-5px m-1 rounded rounded-4': (parseInt(entity.ACCUMULATION.totalSeconds) < thresholdAccum),
                    }"
                    style="
                    box-shadow: inset 2px 4px 2px 0 rgba(0, 0, 0, 0.1), inset 0 6px 20px 0 rgba(0, 0, 0, 0.08)"
                  >
                    <div class="table">
                      <div class="text-right max-w-35px min-w-35px table-cell v-middle ">
                        <div v-if="parseInt(entity.ACCUMULATION.hour) > 0">
                          {{ removePaddingZero(entity.ACCUMULATION.hour) }}
                        </div>
                      </div>
                    </div>
                    <div table>
                      <div class="text-right max-w-25px min-w-25px table-cell v-middle text-4 text-black-g text-op-50">
                        <div v-if="parseInt(entity.ACCUMULATION.hour) > 0">
                          hr.
                        </div>
                      </div>
                    </div>
                    <div class="table">
                      <div class="text-right max-w-35px min-w-35px table-cell v-middle ">
                        {{ removePaddingZero(entity.ACCUMULATION.minute) }}
                      </div>
                    </div>
                    <div table>
                      <div class="text-right max-w-35px min-w-35px table-cell v-middle text-4 text-black-g text-op-50">
                        min.
                      </div>
                    </div>
                    <div table>
                      <div class="text-right max-w-35px min-w-35px table-cell v-middle">
                        {{ removePaddingZero(entity.ACCUMULATION.second) }}
                      </div>
                    </div>
                    <div table>
                      <div class="text-right max-w-35px min-w-35px table-cell v-middle text-4 text-black-g text-op-50">
                        sec.
                      </div>
                    </div>
                  </div>
                  <div class="shadow-inner shadow-2xl">
                    <button class="text-3 bg-blue-200 rounded rounded-3 p-1 m-1 text-black p-x-3" @click="getImageFromImageID(entity.IMG_ID)">
                      Image
                    </button>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div>
        <button
          class="text-3 bg-blue-400 rounded rounded-3 p-1 m-5 m-x-3 text-white p-x-3"
          @click="getAllfromDate(selected)"
        >
          Get All Data
        </button>
      </div>
    </div>
  </div>
  <div py-1 />
</template>

<route lang="yaml">
meta:
  layout: default
        </route>

