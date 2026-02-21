import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Location = {
    x : Nat;
    y : Nat;
  };

  module Location {
    public func compare(location1 : Location, location2 : Location) : Order.Order {
      switch (Nat.compare(location1.x, location2.x)) {
        case (#equal) {
          Nat.compare(location1.y, location2.y);
        };
        case (order) { order };
      };
    };
  };

  type BuildingType = {
    #townHall;
    #goldMine;
    #elixirCollector;
    #goldStorage;
    #elixirStorage;
    #barracks;
    #cannon;
    #archerTower;
    #wall;
  };

  type Building = {
    location : Location;
    buildingType : BuildingType;
    level : Nat;
    constructionStart : ?Time.Time;
    constructionEnd : ?Time.Time;
  };

  module Building {
    public func compareByLevel(building1 : Building, building2 : Building) : Order.Order {
      Nat.compare(building1.level, building2.level);
    };
  };

  type TroopType = {
    #barbarian;
    #archer;
    #giant;
  };

  type Troop = {
    troopType : TroopType;
    level : Nat;
    hp : Nat;
    damage : Nat;
    movementSpeed : Nat;
    attackRange : Nat;
  };

  type AttackResult = {
    destructionPercentage : Nat;
    lootGold : Nat;
    lootElixir : Nat;
  };

  type PlayerState = {
    gold : Nat;
    elixir : Nat;
    buildings : Map.Map<Location, Building>;
    troopQueue : List.List<TroopType>;
    lastAttack : ?AttackResult;
    rating : Nat;
  };

  let playerStates = Map.empty<Principal, PlayerState>();

  public shared ({ caller }) func initializePlayer() : async () {
    if (playerStates.containsKey(caller)) {
      Runtime.trap("Player already exists");
    };
    let initialBuildings = Map.empty<Location, Building>();
    let townHall : Building = {
      location = { x = 10; y = 10 };
      buildingType = #townHall;
      level = 1;
      constructionStart = null;
      constructionEnd = null;
    };
    initialBuildings.add({ x = 10; y = 10 }, townHall);

    let state : PlayerState = {
      gold = 1000;
      elixir = 1000;
      buildings = initialBuildings;
      troopQueue = List.empty<TroopType>();
      lastAttack = null;
      rating = 1000;
    };

    playerStates.add(caller, state);
  };

  public query ({ caller }) func getResources() : async (Nat, Nat) {
    switch (playerStates.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?state) { (state.gold, state.elixir) };
    };
  };

  public shared ({ caller }) func placeBuilding(location : Location, buildingType : BuildingType) : async () {
    switch (playerStates.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?state) {
        if (state.buildings.containsKey(location)) {
          Runtime.trap("Location already occupied");
        };
        let building : Building = {
          location;
          buildingType;
          level = 1;
          constructionStart = ?Time.now();
          constructionEnd = ?(Time.now() + 60_000_000_000); // 1 minute construction
        };
        state.buildings.add(location, building);
      };
    };
  };

  public shared ({ caller }) func trainTroop(troopType : TroopType) : async () {
    switch (playerStates.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?state) {
        state.troopQueue.add(troopType);
      };
    };
  };

  public shared ({ caller }) func findMatch() : async Principal {
    let sortedPlayers = playerStates.toArray().sort(
      func(a, b) {
        Nat.compare(a.1.rating, b.1.rating);
      }
    );

    if (sortedPlayers.size() == 0) {
      Runtime.trap("No opponents available");
    };

    sortedPlayers[0].0;
  };

  public shared ({ caller }) func recordAttack(result : AttackResult) : async () {
    switch (playerStates.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?state) {
        let newState : PlayerState = {
          gold = state.gold + result.lootGold;
          elixir = state.elixir + result.lootElixir;
          buildings = state.buildings;
          troopQueue = state.troopQueue;
          lastAttack = ?result;
          rating = state.rating;
        };
        playerStates.add(caller, newState);
      };
    };
  };

  public query ({ caller }) func getBuildings() : async [Building] {
    switch (playerStates.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?state) {
        let buildingsArray = state.buildings.toArray();
        let sortedArray = buildingsArray.sort(
          func(a, b) {
            Building.compareByLevel(a.1, b.1);
          }
        );
        sortedArray.map(func((_, building)) { building });
      };
    };
  };
};
