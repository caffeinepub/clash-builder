import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    x: bigint;
    y: bigint;
}
export interface Building {
    constructionEnd?: Time;
    level: bigint;
    constructionStart?: Time;
    buildingType: BuildingType;
    location: Location;
}
export type Time = bigint;
export interface AttackResult {
    lootElixir: bigint;
    lootGold: bigint;
    destructionPercentage: bigint;
}
export enum BuildingType {
    goldMine = "goldMine",
    townHall = "townHall",
    barracks = "barracks",
    wall = "wall",
    elixirStorage = "elixirStorage",
    goldStorage = "goldStorage",
    cannon = "cannon",
    archerTower = "archerTower",
    elixirCollector = "elixirCollector"
}
export enum TroopType {
    barbarian = "barbarian",
    giant = "giant",
    archer = "archer"
}
export interface backendInterface {
    findMatch(): Promise<Principal>;
    getBuildings(): Promise<Array<Building>>;
    getResources(): Promise<[bigint, bigint]>;
    initializePlayer(): Promise<void>;
    placeBuilding(location: Location, buildingType: BuildingType): Promise<void>;
    recordAttack(result: AttackResult): Promise<void>;
    trainTroop(troopType: TroopType): Promise<void>;
}
