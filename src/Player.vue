<template>
  <Group ref="player" @created="onCreated" :position="position">
    <Arm
      :position="{ x: 0, y: 0, z: -shoulderWidth / 2 }"
      v-bind="arm"
      :angle="+elbowAngle"
      :t="tLeft"
      :name="namesInverted ? `right` : `left`"
      @mounted="(v) => onArmMounted(v, 'left')"
    />

    <Arm
      :position="{ x: 0, y: 0, z: shoulderWidth / 2 }"
      v-bind="arm"
      :t="tRight"
      :angle="+elbowAngle * -1"
      :name="namesInverted ? `left` : `right`"
      @mounted="(v) => onArmMounted(v, 'right')"
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
      :height="position.y / 2"
      :position="{ x: 0, y: -position.y / 4, z: 0 }"
    >
      <LambertMaterial :color="'green'" />
    </Cylinder>
  </Group>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import Arm from "./Arm.vue";
import { Mesh } from "three";
import { Group, Box, Cylinder, LambertMaterial, Sphere } from "troisjs";
import { PlayerProps } from "./types";

const props = defineProps<PlayerProps>();
const player = ref();
let group: Mesh;
let mountedCount = 0;
const emit = defineEmits<{
  (event: "mounted", value: Mesh): void;
}>();

function onArmMounted(o: Mesh, side: "left" | "right") {
  mountedCount++;
  if (mountedCount < 2) return;
  setTimeout(() => {
      const names = ["left", "right", "shoulders", "head", "body"];
      group.children.forEach((c, i) => {
        c.name = names[i];
      });
      emit("mounted", group);
  }, 200);
}
function onCreated(o: Mesh) {
 group = o
}
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
