import {
  Vector3
} from "three";


export type Point3= {x: number, y: number, z: number};
export type Arm ={
  position: Vector3;
  rotation: Vector3;
}

export interface ArmProps {
  frontArmLength: number;
  armLength: number;
  position: Point3;
  t: number;
}