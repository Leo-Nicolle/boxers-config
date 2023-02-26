<template>
  <Group :position="props.position" :rotation="{ x: armAngle, y: 0, z: 0 }">
    <Box :width="1" :height="0.25" :depth="armLength"
     :position="{x: 0, y: 0, z: armLength/2}">
      <LambertMaterial :color="'red'" />
    </Box>
    <Group
      :position="{ x: 0, y: 0, z: armLength }"
      :rotation="frontArmRotation"
    >
      <Box :width="1" :height="0.25" :depth="frontArmLength"
        :position="{x: 0, y: 0, z: -frontArmLength/2}"
      >
        <LambertMaterial :color="'green'" />
      </Box>
    </Group>
  </Group>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import * as THREE from "three";
import { Group, Box, LambertMaterial } from "troisjs";
import { ArmProps } from "./types";

const props = defineProps<ArmProps>();
const frontArmRotation = computed(() => ({
  x: 0, y: props.t, z: 0
}));
const armAngle = ref(Math.PI/2);


</script>

<style>
body,
html {
  margin: 0;
  overflow: hidden;
}
canvas {
  display: block;
}
</style>
