<template>
  <Group :position="position">
    <Arm
      :position="{ x: 0, y: 0, z: -shoulderWidth / 2 }"
      v-bind="arm"
      :angle="+elbowAngle"
      :t="tLeft"
    />

    <Arm
      :position="{ x: 0, y: 0, z: shoulderWidth / 2 }"
      v-bind="arm"
      :t="tRight"
      :angle="(+elbowAngle) * -1"
    />

    <Box
      :width="1"
      :height="0.25"
      :depth="shoulderWidth"
      :position="{ x: 0, y: 0, z: 0 }"
    >
      <LambertMaterial :color="'green'" />
    </Box>
    <Sphere :position="{ x: 0, y: neckLength, z: 0 }" :radius="2">
      <LambertMaterial :color="'green'" />
    </Sphere>
    <Cylinder
      :height="position.y/2"
      :position="{ x: 0, y: -position.y / 4, z: 0 }"
    >
      <LambertMaterial :color="'green'" />
    </Cylinder>
  </Group>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Arm from "./Arm.vue";
import { Group, Box,Cylinder, LambertMaterial, Sphere } from "troisjs";
import { PlayerProps } from "./types";

const props = defineProps<PlayerProps>();
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
