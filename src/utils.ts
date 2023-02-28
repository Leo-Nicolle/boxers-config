import { computed } from 'vue';
import * as THREE from 'three';
export function interp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}


export function useModel(props: any, emit: any) {
  return computed({
    get: () => props.modelValue,
    set: (value) => {
    
      console.log("emit", value)
      return emit('update:modelValue', value)
    
    }
  });
}

export function linearInOut(t: number) {
  return t < 0.5 ? 2 * t : 1 - 2 * (t - 0.5);
}


/**
 * Collision detection for every solid object.
 */
export function isColliding(a : THREE.Mesh, b : THREE.Mesh) {
  const bbA = new THREE.Box3().setFromObject(a);
  const bbB = new THREE.Box3().setFromObject(b);
  return bbA.intersectsBox(bbB);
}