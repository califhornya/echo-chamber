import { baseItem } from "../base/baseItem.js";

const crusherClaw = {
    ...baseItem,
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
    }
};

export default crusherClaw;