declare module 'bitecs' {
  export type Type =
    'bool' |
    'i8' |
    'ui8' |
    'ui8c' |
    'i16' |
    'ui16' |
    'i32' |
    'ui32' |
    'f32' |
    'f64'

  export const Types: {
    i8: "i8"
    ui8: "ui8"
    ui8c: "ui8c"
    i16: "i16"
    ui16: "ui16"
    i32: "i32"
    ui32: "ui32"
    f32: "f32"
    f64: "f64"
  };

  export type TypedArray =
    Uint8Array |
    Int8Array |
    Uint8Array |
    Uint8ClampedArray |
    Int16Array |
    Uint16Array |
    Int32Array |
    Uint32Array |
    Float32Array |
    Float64Array

  type ArrayByType = {
    ['bool']: boolean[];
    [Types.i8]: Int8Array;
    [Types.ui8]: Uint8Array;
    [Types.ui8c]: Uint8ClampedArray;
    [Types.i16]: Int16Array;
    [Types.ui16]: Uint16Array;
    [Types.i32]: Int32Array;
    [Types.ui32]: Uint32Array;
    [Types.f32]: Float32Array;
    [Types.f64]: Float64Array;
  }

  type ComponentType<T extends ISchema> = {
    [key in keyof T]: T[key] extends Type ? ArrayByType[T[key]] : T[key] extends ISchema ? ComponentType<T[key]> : unknown;
  }

  interface IWorld {
    [key: string]: any
  }

  interface ISchema {
    [key: string]: Type | ISchema
  }

  interface IComponentProp {
    [key: string]: TypedArray
  }

  interface IComponent {
    [key: string]: TypedArray | IComponentProp
  }

  type QueryModifier = (c: (IComponent | IComponentProp)[]) => (world: IWorld) => IComponent | QueryModifier

  type Query = (world: IWorld) => number[]

  type System = (world: IWorld) => void

  export function createWorld(size?: number): IWorld
  export function addEntity(world: IWorld): number
  export function removeEntity(world: IWorld, eid: number): void
  export function registerComponent(world: IWorld, component: IComponent): void
  export function registerComponents(world: IWorld, components: IComponent[]): void
  export function defineComponent<T extends ISchema>(schema?: T): ComponentType<T>
  export function addComponent(world: IWorld, component: IComponent, eid: number): void
  export function removeComponent(world: IWorld, component: IComponent, eid: number): void
  export function hasComponent(world: IWorld, component: IComponent, eid: number): boolean
  export function defineQuery(components: (ComponentType<ISchema> | IComponent | QueryModifier)[]): Query
  export function Changed(c: ComponentType<ISchema>): IComponent | QueryModifier
  export function Not(c: ComponentType<ISchema>): IComponent | QueryModifier
  export function enterQuery(query: Query): Query
  export function exitQuery(query: Query): Query
  export function commitRemovals(world: IWorld): void
  export function defineSystem(update: (world: IWorld) => void): System
  export function defineSerializer(target: IWorld | IComponent | IComponentProp | QueryModifier, maxBytes?: number): (target: IWorld | number[]) => ArrayBuffer
  export function defineDeserializer(target: IWorld | IComponent | IComponentProp | QueryModifier): (world: IWorld, packet: ArrayBuffer) => void
  export function pipe(...fns: ((...args: any[]) => any)[]): (input: any) => any
}