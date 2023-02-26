<template>
  <Group :position="armPosition" :rotation="armRotation">
    <Box
      :width="1"
      :height="0.25"
      :depth="armLength"
      :position="{ x: 0, y: 0, z: armLength / 2 }"
    >
      <LambertMaterial :color="'green'" />
    </Box>
    <Sphere :radius="jointW">
        <LambertMaterial :color="'green'" />
      </Sphere>
    <Group
      :position="{ x: 0, y: 0, z: armLength }"
      :rotation="frontArmRotation"
    >
      <Box
        :width="1"
        :height="0.25"
        :depth="frontArmLength"
        :position="{ x: 0, y: 0, z: -frontArmLength / 2 }"
      >
        <LambertMaterial :color="'green'" />
      </Box>
      <Sphere :radius="jointW">
        <LambertMaterial :color="'green'" />
      </Sphere>
      <Sphere :position="{ x: 0, y: 0, z: -frontArmLength }">
        <LambertMaterial :color="'green'" />
      </Sphere>
    </Group>
  </Group>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import * as THREE from "three";
import { Sphere, Group, Box, LambertMaterial } from "troisjs";
import { ArmProps } from "./types";
import { interp, linearInOut } from "./utils";

const props = defineProps<ArmProps>();
const minFrontArmAngle = 1.9 * Math.PI;
const maxFrontArmAngle = Math.PI;

const jointW = ref(0.5);
const minArmAngle = Math.PI / 16;

const armPosition = computed(() => ({
  x: props.position.x,
  y: props.position.y,
  z: props.position.z,
}));

const frontArmRotation = computed(() => ({
  x: 0,
  y: interp(minFrontArmAngle, maxFrontArmAngle, linearInOut(props.t)),
  z: 0,
  // x: 0, y: 0, z: 0
}));

const armRotation = computed(() => ({
  x: Math.PI / 2 + props.angle,
  y: interp(minArmAngle, props.maxRotation, linearInOut(props.t)),
  z: 0,
}));

const armAngle = ref(Math.PI / 2);
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
