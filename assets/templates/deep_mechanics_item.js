/**
 * Template for a new item that follows the deep mechanics
 * Based on bazaarDB.gg deep mechanics
 */

import { baseItem } from "../../base/baseItem.js";

const deepMechanicsItem = {
    ...baseItem,
    name: "Deep Mechanics Item",
    type: "Template",
    tier: "Bronze",
    cost: 5,
    cooldown: 3,
    size: 1,
    trigger: "Cooldown",
    target: "enemy",

    // Direct effects
    damage: 10,
    heal: 0,
    shield: 0,

    // Status effects
    poison: 0,
    burn: 0,
    freeze: false,
    freezeDuration: 0,
    freezeTargets: 0,
    slow: false,
    slowDuration: 0,
    slowTargets: 0,
    haste: false,
    hasteDuration: 0,
    hasteTargets: 0,

    // Advanced mechanics
    crit: 0,
    multicast: 0,
    ammo: 0,
    enchantment: "null",

    // Special mechanics
    onTrigger: function(owner, target) {
        // Custom function to run when item triggers
        console.log(`${this.name} triggered on ${target.name}`);
        
        // Return the effects to apply
        return {
            damage: this.damage,
            heal: this.heal,
            shield: this.shield
        };
    },

    calculateDamage: function(owner, target) {
        // Custom function to calculate damage
        let damage = this.damage;
        
        // Apply critical hit
        if (Math.random() < this.crit / 100) {
            damage *= 2;
            console.log(`${this.name} critical hit!`);
        }
        
        return damage;
    },

    calculateShield: function(owner) {
        // Custom function to calculate shield
        return this.shield;
    },

    // Adjacency mechanics
    adjacentItems: [],
    adjacentBonus: function(adjacentItems) {
        // Custom function to calculate bonus from adjacent items
        let bonus = 0;
        
        adjacentItems.forEach(item => {
            if (item.type === this.type) {
                bonus += 2;
            }
        });
        
        return bonus;
    },

    // Synergy mechanics
    synergyTypes: ["Template"],
    synergyBonus: function(synergyItems) {
        // Custom function to calculate bonus from synergy
        let bonus = 0;
        
        synergyItems.forEach(item => {
            bonus += 1;
        });
        
        return bonus;
    }
};

export default deepMechanicsItem; 