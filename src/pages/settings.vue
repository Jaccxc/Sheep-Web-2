<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoatStore } from '~/store/goatAPI'
const goatStore = useGoatStore()
const { saveLocal, isNumber, initLocal } = useGoatStore()
const { thresholdAccumInput, thresholdDurationInput, thresholdDuration, thresholdAccum, topN, topNInput } = storeToRefs(goatStore)
initLocal()
</script>

<template>
  <div>
    <div text-4xl>
      <div class="flex justify-center m-3">
        <div i-carbon-settings />
      </div>
    </div>

    <p text-3xl>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Settings
      </a>
    </p>
    <div py-2 />
    <div class="flex items-center justify-center">
      <div text-5 p-2>
        Threshold Time for Duration (in sec):
      </div>
      <input
        v-model.number="thresholdDurationInput"
        name="a"
        class="shadow border rounded"
        maxlength="256"
        style="color:black; width: 80px; text-align: right;"
        type="number"
        :placeholder="thresholdDuration.toString()"
        @keypress="isNumber($event)"
      >
    </div>

    <div py-2 />
    <div class="flex items-center justify-center">
      <div text-5 p-2>
        Threshold Time for Accumulation (in sec):
      </div>
      <input
        v-model.number="thresholdAccumInput"
        type="number"
        class="shadow border rounded"
        maxlength="256"
        style="color:black; width: 80px; text-align: right;"
        :placeholder="thresholdAccum.toString()"
        @keypress="isNumber($event)"
      >
    </div>
    <div py-2 />
    <div class="flex items-center justify-center">
      <div text-5 p-2>
        Display Top N Items:
      </div>
      <input
        v-model="topNInput"
        type="number"
        class="shadow border rounded"
        maxlength="256"
        style="color:black; width: 80px; text-align: right;"
        :placeholder="topN.toString()"
        @keypress="isNumber($event)"
      >
    </div>

    <button class="text-3 bg-blue-400 rounded rounded-3 p-1 m-5 m-x-3 text-white p-x-3" @click="saveLocal">
      Save Changes
    </button>
  </div>

  <div py-1 />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
