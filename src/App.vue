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
          y: -12,
          z: -0.33754147457892586,
        }"
      />
      <Scene>
        <PointLight :position="{ y: 50, z: 50 }" cast-shadow />
        <PointLight :position="{ y: 50, z: -50 }" cast-shadow />

        <Player
          :position="{ x: -12, y: 20, z: 0 }"
          v-bind="state.player"
          @mounted="(v) => onPlayerMounted(v, 'player1')"
          :t-left="state.loops.left1.t"
          :t-right="state.loops.right1.t"
        ></Player>

        <Group
          :rotation="{
            x: 0,
            y: Math.PI,
            z: 0,
          }"
          :scale="{
            x: 1,
            y: 1,
            z: -1,
          }"
        >
          <Player
            :position="{ x: -12, y: 20, z: 0 }"
            v-bind="state.player"
            @mounted="(v) => onPlayerMounted(v, 'player2')"
            :t-left="state.loops.left2.t"
            :t-right="state.loops.right2.t"
          ></Player>
        </Group>
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
    <UI v-model="state" />
    <p class="debug">{{}}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import * as THREE from "three";
import Player from "./Player.vue";
import UI from "./UI.vue";
import {registerCollisions, checkCollisions} from './collisions'
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
import {
  ArmProps,
  ArmState,
  PlayerProps,
  PlayerState,
  State,
  UIProps,
} from "./types";

const player: PlayerState = {
  shoulderWidth: 5,
  elbowAngle: Math.PI / 4,
  neckLength: 2.5,
  arm: {
    frontArmLength: 12,
    armLength: 10,
    maxRotation: Math.PI / 2,
  },
};
const speed = 0.01;
const state = ref<State>({
  player,
  animation: {
    offset: 0,
    t: 0,
    playing: true,
  },
  loops: {
    left1: {
      offset: 0,
      t: 0,
      playing: true,
    },
    right1: {
      offset: 0,
      t: 0,
      playing: false,
    },
    left2: {
      offset: 0,
      t: 0,
      playing: false,
    },
    right2: {
      offset: 0,
      t: 0,
      playing: false,
    },
  },
});

const rendererC = ref();
window.renderer = rendererC;
window.THREE = THREE;
onMounted(() => {
  const renderer = rendererC.value as RendererPublicInterface;
  renderer.onBeforeRender(() => {
    // detect collisions
    checkCollisions();
    const value = { ...state.value };
    if (value.animation.playing) {
      value.animation.t = value.animation.t + speed;
      if (value.animation.t > 1) {
        value.animation.t = 0;
      }
    } else {
      value.animation.t = value.animation.offset;
    }

    Object.entries(value.loops).forEach(([name, anim]) => {
      if (value.animation.playing && anim.playing) {
        anim.t = (value.animation.t + +anim.offset) % 1;
      } else {
        anim.t = anim.offset;
      }
    });
    state.value = value;
  });
});

function onPlayerMounted(player: THREE.Mesh, name: string) {
  registerCollisions(rendererC.value, player, name);
}

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
.debug {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  color: white;
}
</style>
