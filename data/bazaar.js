const baseItem = {
    name: "null",
    type: "null",
    rarity: "null",
    cost: 0,
    cooldown: 0,
    size: 1,
    trigger: "Cooldown",
    target: "enemy",

    damage: 0,
    poison: 0,
    burn: 0,
    heal: false,
    shield: false,

    freeze: false,
    freezeDuration: 0,
    freezeTargets: 0,
    nextUnfreeze: null,

    slow: false,
    slowDuration: 0,
    slowTargets: 0,

    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    crit: 0, 
    multicast: 0,
    nextTrigger: 0, 

    ammo: 0, // For items with limited uses
    enchantment: "null" // e.g. "Heavy", "Icy", "Turbo" etc.
}

export const BAZAAR = {
    CrusherClaw: {
        ...baseItem,
        //only values that differ from baseItem are listed here
        name: "Crusher's Claw",
        cooldown: 3,
        size: 2,
        trigger: "Cooldown",
        target: "enemy",
    
        // Dynamic effect logic specific of this item
        scalingDamage: (owner, target) => {
          // Calculate damage based on the highest shield value of the owner's items, like the effect of this item says
          // "Deals damage equal to the highest shield value of your items"
          const highestShield = owner.items.reduce((max, item) => {
            return item.shield > max ? item.shield : max;
          }, 0);
    
          return {
            damage: highestShield, // Dynamic damage
            heal: 0, // No healing
            shield: 0 // No shielding
          };
        },

        heavyEnchantment: {
            ...CrusherClaw,
            slow: true,
            slowDuration: 2,
            slowTargets: 2,
        },

        icyEnchantment: {
            ...CrusherClaw,
            freeze: true,
            freezeDuration: 2,
            freezeTargets: 1,
        }

        //here go the other 5-6 enchantments functions
    }
}