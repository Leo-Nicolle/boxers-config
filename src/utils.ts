import { computed } from 'vue';
import {merge} from 'lodash';

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

