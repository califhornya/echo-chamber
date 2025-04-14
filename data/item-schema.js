const ITEMS = {
    nameOne:{                   // "nameOne" is a placeholder, it should be the item's name without spaces
    name: "",                   // actual name of the item
    size: "Small",              // "Small" | "Medium" | "Large"
    cooldown: 0,                // seconds
    ammo: null,                 // null or number
    value: 0,                   // shop cost (optional)
    trigger: "Cooldown",        // "Cooldown" | "Start of Combat" | "On Condition"
    target: "enemy",            // "enemy" | "self" | "enemyItem" | "allyItem" | etc.
  
    // Direct effects
    damage: 0,
    heal: 0,
    shield: 0,
  
    // Status effects
    poison: 0,
    burn: 0,
    slow: {
      targets: 0,
      duration: 0
    },
    freeze: {
      targets: 0,
      duration: 0
    },
    haste: {
      targets: 0,
      duration: 0
    },
  
    // Other mechanics
    critChance: 0,              // % chance to double damage
    multicast: 0,               // # of extra times this fires per trigger
  
    // Extra systems
    enchantments: [],           // e.g., ["Fiery", "Deadly"]
    passiveEffects: [],         // Optional: triggered on condition
    adjacencyBonuses: [],       // Optional: bonuses from neighbors
  
    // Simulation state (runtime values)
    isFrozen: false,
    nextUnfreeze: null,         // timestamp (sec) when it becomes unfrozen
    nextTrigger: 0,             // timestamp (sec) when it can next activate
    currentCooldown: 0,
    currentAmmo: null           // syncs with `ammo` if used
  }
  // here goes another item, and so on
};
  