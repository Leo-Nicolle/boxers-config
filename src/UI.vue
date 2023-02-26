<template>
  <div class="UI">
    <div class="bottombar">
      <button @click="value.animation.playing = !value.animation.playing">
        {{ value.animation.playing ? `Stop` : `Play` }}
      </button>
      <label v-for="([name, v], i) in Object.entries(value.loops)">
        {{ `${name} ${value.loops[name].offset}` }}
        <span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="value.loops[name].offset"
          />
          <button
            @click="value.loops[name].playing = !value.loops[name].playing"
          >
            {{ value.loops[name].playing ? `Stop` : `Play` }}
          </button>
        </span>
      </label>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { State } from "./types";
import { useModel } from "./utils";

const props = defineProps<{ modelValue: State }>();
const emit = defineEmits<{
  (event: "update:modelValue", value: State): void;
  (event: "update"): void;
}>();
const value = useModel(props, emit);
</script>


<style>
.sidebar {
  position: absolute;
  flex-direction: column;
  bottom: 200px;
  top: 0;
  right: 0;
  width: 200px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.bottombar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.bottombar > label {
  width: calc(100% - 100px);
  color: white;
}
label > span {
  width: 100%;
  display: flex;
  flex-direction: row;
}
label > span > input {
  width: 100%;
  margin-right: 15px;
}
</style>
