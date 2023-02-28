import {
  Vector3
} from "three";


export type Point3 = { x: number, y: number, z: number };
export type Arm = {
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
  name: string;
}
export type ArmState = Omit<ArmProps, "position" | "t" | "angle" | "name">;

export interface PlayerProps {
  tLeft: number;
  tRight: number;
  position: Point3;
  shoulderWidth: number;
  elbowAngle: number;
  neckLength: number;
  arm: ArmState;
  namesInverted?: boolean;
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

// export type armNames = "left1" | "right1" | "left2" | "right2";
// export type colliderNames = "hand" | "head" | "body" | "arm" | "frontarm";
export const colliderNames = ["head", "body", "armright", "frontarmright", "handright", "armleft", "frontarmleft", "handleft"] as const;
export type Collider = {
  bbs: THREE.Box3[];
  meshes: THREE.Mesh[]
};

export type Colliders = Record<typeof colliderNames[number], { bb: THREE.Box3; mesh: THREE.Mesh }>;
// export type Arms = Record<
//   armNames,
//   { group: THREE.Group; bbs: THREE.Box3[]; meshes: THREE.Mesh[] }
// >;
