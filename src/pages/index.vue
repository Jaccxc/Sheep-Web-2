<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Datepicker from 'vue3-datepicker'
import { useGoatStore } from '~/store/goatAPI'
import 'vue3-image-viewer/dist/style.css'
const goatStore = useGoatStore()
const { getTopNfromDate, getAllfromDate, buttonTest } = useGoatStore()
const { APIdata, nullAPIData } = storeToRefs(goatStore)
const selected = ref(new Date())
const N = 20
getTopNfromDate(N, selected.value)
</script>

<template>
  <div>
    <div text-4xl>
      <div class="flex justify-center m-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99988 13.9998C3.49985 11.4998 2.99991 6 7.9999 4.99965C9.9999 4.85024 11.4999 5.50009 13.9999 7.99978L24.9999 19.9998L21.9999 23.9998" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M18.9999 14C14.9286 14.7071 6.99997 18 7.99997 28C8.49997 31 9.85917 33.9455 12.9999 37V42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M29 17C33.2213 16.5704 42.3115 17.439 44 25C44.5628 26.8617 44.0656 32.1577 39 38.0003V42.0003" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M32.9998 42C32.9998 38.134 29.6002 36 25.9998 36C22.3993 36 18.9998 38.134 18.9998 42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" /></svg>
      </div>
    </div>

    <p text-3xl>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Goat Detection and Tracking Database
      </a>
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
      <button class="text-3 bg-blue-200 rounded rounded-3 m-x-5 text-black p-x-3" @click="getTopNfromDate(N, selected)">
        Fetch
      </button>
    </div>

    <div py-3 />
    <div class="text-5">
      <div class="flex flex-col items-center">
        <ul>
          <div>
            <div v-if="nullAPIData">
              Currently no data on this day
            </div>
            <li v-for="(entity, index) in APIdata" :key="index">
              P{{ index }}. Goat-ID : {{ entity.ID }} Duration : {{ entity.DURATION.minute }} min. {{ entity.DURATION.second }} sec. Img ID : {{ entity.IMG_ID }}
              <button
                class="text-3 bg-blue-200 rounded rounded-3 p-1 m-1 text-black p-x-3"
                @click="buttonTest(parseInt(entity.IMG_ID))"
              >
                Image
              </button>
            </li>
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

