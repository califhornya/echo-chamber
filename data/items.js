export const ITEMS = {
  LongSword: {
    name: "Longsword",
    cooldown: 2,
    size: 2,
    trigger: "Cooldown",
    target: "enemy",

    damage: 10,
    poison: 0,
    burn: 0,

    freeze: false,
    freezeDuration: 0,
    freezeTargets: 0,
    nextUnfreeze: null, // Replace isFrozen with nextUnfreeze

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0,
    heal: false,
    shield: 1,

    nextTrigger: 0
  },

  IcyStaff: {
    name: "Icy Staff",
    cooldown: 4,
    size: 1,
    trigger: "Cooldown",
    target: "enemyItem",

    damage: 0,
    poison: 0,
    burn: 0,

    freeze: true,
    freezeDuration: 2,
    freezeTargets: 1,
    nextUnfreeze: null, // Replace isFrozen with nextUnfreeze

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0,
    heal: false,
    shield: false,

    nextTrigger: 0
  },

  FireSword: {
    name: "Fire Sword",
    cooldown: 2,
    size: 1,
    trigger: "Cooldown",
    target: "enemy",

    damage: 12,
    poison: 0,
    burn: 0,

    freeze: false,
    freezeDuration: 0,
    freezeTargets: 0,
    nextUnfreeze: null, // Replace isFrozen with nextUnfreeze

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0,
    heal: false,
    shield: false,

    nextTrigger: 0
  },

  FrostStaff: {
    name: "Frost Staff",
    cooldown: 3,
    size: 1,
    trigger: "Cooldown",
    target: "enemyItem",

    damage: 0,
    poison: 0,
    burn: 0,

    freeze: true,
    freezeDuration: 1,
    freezeTargets: 1,
    nextUnfreeze: null, // Replace isFrozen with nextUnfreeze

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0,
    heal: false,
    shield: false,

    nextTrigger: 0
  },

  SmallShield: {
    name: "Small Shield",
    cooldown: 3,
    size: 1,
    trigger: "Cooldown",
    target: "selfItem",

    damage: 0,
    poison: 0,
    burn: 0,

    freeze: false,
    freezeDuration: 0,
    freezeTargets: 0,
    nextUnfreeze: null, // Replace isFrozen with nextUnfreeze

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0,
    heal: false,
    shield: 1,

    nextTrigger: 0
  }
};
