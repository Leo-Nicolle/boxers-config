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
    <div class="sidebar">
      <h3>Bras</h3>
      <label>
        {{`angle ${Number(value.player.elbowAngle).toFixed(3)} rad`}}
        <input
          type="range"
          min="0"
          :max="Math.PI/2"
          step="0.01"
          v-model="value.player.elbowAngle"
        />
      </label>
      <label>
        {{`Max rotation ${Number(+value.player.arm.maxRotation).toFixed(3)} rad`}}
        <input
          type="range"
          min="0"
          :max="Math.PI"
          step="0.01"
          v-model="value.player.arm.maxRotation"
        />
      </label>
      <label>
        {{`avant bras ${value.player.arm.frontArmLength}`}}
        <input
          type="range"
          min="0"
          :max="20"
          step="0.5"
          v-model="value.player.arm.frontArmLength"
        />
      </label>
      <label>
        {{`bras ${value.player.arm.armLength}`}}
        <input
          type="range"
          min="0"
          :max="20"
          step="0.5"
          v-model="value.player.arm.armLength"
        />
      </label>
     
      <h3>Corps</h3>
      <label>
        {{`Hateur ${value.player.neckLength}`}}
        <input
          type="range"
          min="0"
          :max="10"
          step="0.5"
          v-model="value.player.neckLength"
        />
      </label>

      <label>
        {{`Largeur ${value.player.shoulderWidth}`}}
        <input
          type="range"
          min="0"
          :max="20"
          step="0.5"
          v-model="value.player.shoulderWidth"
        />
      </label>
    </div>
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
.UI,
h3 {
  color: white;
}
.sidebar {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  bottom: 200px;
  top: 0;
  right: 0;
  width: 200px;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  z-index: 100;
}
.sidebar > label {
  display: flex;
  flex-direction: column;
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
