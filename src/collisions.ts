import * as THREE from "three";
import { armNames, Arms } from "./types";

let loaded = false;
const players: Record<string, THREE.Mesh> = {};
let arms: Arms;
const boxes: THREE.BoxHelper[] = [];
export function registerCollisions(renderer: THREE.Renderer, player: THREE.Mesh, name: string) {
  players[name] = player;
  if (Object.keys(players).length < 2) return;

  renderer.scene.traverse((c: THREE.Mesh) => {
    // c.matrixAutoUpdate = true;
  });
  const { player1, player2 } = players;

  function getArm(player: THREE.Mesh, name: string) {
    const group = player.children.find(
      (c) => c.name === name
    ) as unknown as THREE.Group;
    const names = ["arm", "frontarm", "hand"];
    const meshes: THREE.Mesh[] = [];
    const bbs: THREE.Box3[] = [];
    group.traverse((c) => {
      if (c.type === "Group" || !names.includes(c.name)) return;
      bbs.push(new THREE.Box3().setFromObject(c));
      meshes.push(c as THREE.Mesh);
    });
    return {
      group,
      meshes,
      bbs,
    };
  }

  arms = {
    left1: getArm(player1, "left"),
    right1: getArm(player1, "right"),
    left2: getArm(player2, "left"),
    right2: getArm(player2, "right"),
  };
  Object.values(arms).forEach((arm) => {
    arm.meshes.forEach((m) => {
      const box = new THREE.BoxHelper(m, 0xffff00);
      renderer.scene.add(box);
      boxes.push(box);
    });
    arm.group.traverse((m) => {
      if (m.name === "hand") {
        // m.material.color.setHex(0x0000ff);
      }
    });
  });
  loaded = true;
}
export function checkCollisions() {
  boxes.forEach((b) => b.update());
  if(!loaded) return;
  Object.entries(arms).forEach(([name, { meshes, bbs }]) => {
    arms[name as armNames].bbs = meshes.map((cc) =>
      new THREE.Box3().setFromObject(cc)
    );
    meshes.forEach((m) => {
      m.material.color.set(0x00ff00);
      m.geometry.computeBoundingSphere();
      m.geometry.computeBoundingBox();
      m.updateMatrix();
    });
  });
  const { left1, right1, left2, right2 } = arms;

  left1.bbs.forEach((bb1, i) => {
    right2.bbs.forEach((bb2, j) => {
      if (bb1.intersectsBox(bb2)) {
        console.log("hit", left1.meshes[i].name, right2.meshes[j].name);
        left1.meshes[i].material.color.setHex(0xff0000);
        right2.meshes[j].material.color.setHex(0xff0000);
      }
    });
    left2?.bbs.forEach((bb2, j) => {
      if (bb1.intersectsBox(bb2)) {
        console.log("hit", left1.meshes[i].name, left2.meshes[j].name);
        left1.meshes[i].material.color.setHex(0xff0000);
        left2.meshes[j].material.color.setHex(0xff0000);
      }
    });
  });

} 
