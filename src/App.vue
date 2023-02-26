<template>
  <div>
  <Renderer
    ref="rendererC"
    antialias
    :orbit-ctrl="{ enableDamping: true }"
    resize="window"
  >
    <Camera
      :position="{
        x: -42.17209943682757,
        y: 28.94714654626982,
        z: 18.342062492549577,
      }"
      :look-at="{
        x: 0.7760758985407427,
        y: -0.5327024991899921,
        z: -0.33754147457892586,
      }"
    />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" cast-shadow />
      <Arm :arm-length="10" :front-arm-length="10" :position ="{x: 0, y: 20, z: 0}"
      :t="tArm"/>
      <Plane
        :width="100"
        :height="100"
        :rotation="{ x: -Math.PI / 2 }"
        receive-shadow
      >
        <BasicMaterial :color="'#004488'" :wireframe="true" />
      </Plane>
    </Scene>
  </Renderer>
  <input type="range" />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as THREE from "three";
import Arm from './Arm.vue';

import {
  Group,
  Box,
  Camera,
  Plane,
  BasicMaterial,
  LambertMaterial,
  MeshPublicInterface,
  PointLight,
  Renderer,
  RendererPublicInterface,
  Scene,
} from "troisjs";

const rendererC = ref();
const meshC = ref();
const tArm = ref(0);


window.renderer = rendererC;
window.THREE = THREE;
onMounted(() => {
  const renderer = rendererC.value as RendererPublicInterface;
  // const mesh = (meshC.value as MeshPublicInterface).mesh
  renderer.onBeforeRender(() => {
    tArm.value=(tArm.value + 0.1) % (2 * Math.PI);
    console.log(tArm.value);
  });
});

function getLookAt() {
  const vector = new THREE.Vector3(0, 0, -1);
  vector.applyQuaternion(rendererC.value.camera.quaternion);
  console.log(vector);
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
