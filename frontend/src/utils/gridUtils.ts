import { Location } from '@/backend';

export function worldToGrid(x: number, z: number): Location {
  return {
    x: BigInt(Math.round(x)),
    y: BigInt(Math.round(z)),
  };
}

export function gridToWorld(location: Location): [number, number] {
  return [Number(location.x), Number(location.y)];
}

export function snapToGrid(x: number, z: number): [number, number] {
  return [Math.round(x), Math.round(z)];
}
