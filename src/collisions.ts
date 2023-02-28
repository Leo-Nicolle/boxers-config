import * as THREE from "three";
import { Colliders, colliderNames } from "./types";

let loaded = false;
// const players: Record<string, THREE.Mesh> = {};
let colliders1: Colliders = {};
let colliders2: Colliders = {};


const boxes: THREE.BoxHelper[] = [];
export function registerCollisions(renderer: THREE.Renderer, player: THREE.Mesh, name: string) {
  // players[name] = player;
  // if (Object.keys(players).length < 2) return;

  // renderer.scene.traverse((c: THREE.Mesh) => {
  //   // c.matrixAutoUpdate = true;
  // });
  // const { player1, player2 } = players;
  function getColliders(colliders: Colliders, parent: THREE.Mesh) {
    const meshes: THREE.Mesh[] = [];
    const bbs: THREE.Box3[] = [];
    parent.traverse((c) => {
      if (!colliderNames.includes(c.name)) return;
      colliders[c.name] = {
        bb: new THREE.Box3().setFromObject(c),
        mesh: c
      }
    });
  }

  getColliders(name === 'player1' ? colliders1 : colliders2, player)
  Object.values(colliders1)
    .concat(Object.values(colliders2))
    .forEach(({ mesh }) => {
      const box = new THREE.BoxHelper(mesh, 0xffff00);
      renderer.scene.add(box);
      boxes.push(box);
      if (mesh.name === "handright") {
        mesh.material.color.setHex(0x0000ff);
      }
      if (mesh.name === "handleft") {
        mesh.material.color.setHex(0xff00ff);
      }
    });
  loaded = !!Object.keys(colliders2).length && !!Object.keys(colliders1).length;
}
export function checkCollisions() {
  boxes.forEach((b) => b.update());
  if (!loaded) return;
  Object.entries(colliders1).forEach(([name, { mesh, bb }]) => {
    colliders1[name].bb.setFromObject(mesh);
    mesh.material.color.set(0x00ff00);
    mesh.geometry.computeBoundingSphere();
    mesh.geometry.computeBoundingBox();
    mesh.updateMatrix();
  });

  Object.entries(colliders2).forEach(([name, { mesh, bb }]) => {
    colliders2[name].bb.setFromObject(mesh);
    mesh.material.color.set(0x00ff00);
    mesh.geometry.computeBoundingSphere();
    mesh.geometry.computeBoundingBox();
    mesh.updateMatrix();
  });

  Object.entries(colliders1).forEach(([name1, { mesh: mesh1, bb: bb1 }]) => {
    Object.entries(colliders2).forEach(([name2, { mesh: mesh2, bb: bb2 }]) => {
      if (!bb1.intersectsBox(bb2)) return;
      // console.log("hit", left1.meshes[i].name, right2.meshes[j].name);
      mesh1.material.color.setHex(0xff0000);
      mesh2.material.color.setHex(0xff0000);
    });
  });
} 
