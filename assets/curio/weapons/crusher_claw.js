import { baseItem } from "../base/baseItem.js";

const crusherClaw = {
    ...baseItem,
    name: "Crusher's Claw",
    type: "Acquatic",
    cooldown: 3,
    size: 2,
    trigger: "Cooldown",
    target: "enemy",
    tierValues: {
        Bronze: { shieldBonus: 2 },
        Silver: { shieldBonus: 4 },
        Gold: { shieldBonus: 6 },
        Diamond: { shieldBonus: 8 }
    },

    // Function to set the item's tier
    setTier: function (userTier) {
        if (this.tierValues[userTier]) {
            this.tier = userTier; // Update the tier
            logToPage(`${this.name} is now ${userTier} tier.`);
        } else {
            logToPage(`Invalid tier: ${userTier}`);
        }
    },

    // Function to apply the shield bonus to all shield items
    applyShieldBonus: function (owner) {
        const bonus = this.tierValues[this.tier].shieldBonus; // Get the shield bonus based on the tier
        owner.items.forEach(item => {
            if (item.shield > 0) { // Check if the item provides a shield
                item.shield += bonus; // Apply the bonus
                logToPage(`${item.name} gains +${bonus} Shield from ${this.name}.`);
            }
        });
    },

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