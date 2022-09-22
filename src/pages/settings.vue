<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoatStore } from '~/store/goatAPI'
const goatStore = useGoatStore()
const { filterText } = useGoatStore()
const { thresholdString, topNString } = storeToRefs(goatStore)
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
        Threshold Time (in sec):
      </div>
      <input
        v-model="thresholdString"
        name="a"
        class="shadow border rounded"
        maxlength="256"
        style="color:black; width: 80px; text-align: right;"
        type="number"
        placeholder="300"
        @input="filterText"
      >
    </div>

    <div class="flex items-center justify-center">
      <div text-5 p-2>
        Display Top N Items:
      </div>
      <input
        v-model="topNString"
        name="a"
        class="shadow border rounded"
        maxlength="256"
        style="color:black; width: 60px; text-align: right;"
        type="number"
        placeholder="5"
        @input="filterText"
      >
    </div>

    <button class="text-3 bg-blue-400 rounded rounded-3 p-1 m-5 m-x-3 text-white p-x-3">
      Save Changes
    </button>
  </div>

  <div py-1 />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
