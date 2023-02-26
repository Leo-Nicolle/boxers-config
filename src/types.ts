import {
  Vector3
} from "three";
import { Ref } from "vue";


export type Point3= {x: number, y: number, z: number};
export type Arm ={
  position: Vector3;
  rotation: Vector3;
}

export interface ArmProps {
  angle: number;
  frontArmLength: number;
  armLength: number;
  position: Point3;
  t: number;
  maxRotation: number;
}
export type ArmState =Omit<ArmProps, "position" | "t" | "angle">;

export interface PlayerProps {
  tLeft: number;
  tRight: number;
  position: Point3;
  shoulderWidth: number;
  elbowAngle: number;
  neckLength: number;
  arm: ArmState;
}
export type PlayerState = Omit<PlayerProps, "tLeft" | "tRight" | "position">;
export interface Animation {
  playing: boolean;
  offset: number;
  t: number;
}
export interface UIProps {
  animations: number[];
  labels: string[];
}

export interface State {
  loops: Record<string, Animation>;
  animation: Animation;
  player: PlayerState;
}