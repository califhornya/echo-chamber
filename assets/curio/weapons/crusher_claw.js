import { baseItem } from "../../base/baseItem.js";

const crusherClaw = {
    ...baseItem,
    name: "Crusher's Claw",
    type: "Acquatic",
    cooldown: 9,
    size: 2,
    trigger: "Cooldown",
    target: "enemy",
    tierValues: {
        Bronze: { shieldBonus: 2 },
        Silver: { shieldBonus: 4 },
        Gold: { shieldBonus: 6 },
        Diamond: { shieldBonus: 8 }
    },
    effect: "scalingDamage" // Reference to the effect logic

    /* // Function to set the item's tier
    setTier: function (userTier) {
        if (this.tierValues[userTier]) {
            this.tier = userTier; // Update the tier
            logToPage(`${this.name} is now ${userTier} tier.`);
        } else {
            logToPage(`Invalid tier: ${userTier}`);
        }
    }, */

    /* // Function to apply the shield bonus to all shield items
    applyShieldBonus: function (owner) {
        const bonus = this.tierValues[this.tier].shieldBonus; // Get the shield bonus based on the tier
        owner.items.forEach(item => {
            if (item.shield > 0) { // Check if the item provides a shield
                item.shield += bonus; // Apply the bonus
                logToPage(`${item.name} gains +${bonus} Shield from ${this.name}.`);
            }
        });

        // Update the next trigger time for Crusher's Claw
        this.nextTrigger = time + this.cooldown;
        logToPage(`${this.name} next trigger updated to ${this.nextTrigger}`);
    }, */

    /* // Dynamic effect logic specific to this item
    scalingDamage: function (owner, target) {
        // Find the highest shield value among the owner's items
        const highestShield = owner.items.reduce((max, item) => {
            // Ensure the item has a valid shield value
            if (item.shield && typeof item.shield === "number") {
                return item.shield > max ? item.shield : max;
            }
            return max;
        }, 0);

        // Log the calculated damage
        logToPage(`${this.name} calculates damage based on the highest shield value of the owner's items: ${highestShield}`);

        // Update the next trigger time for Crusher's Claw
        this.nextTrigger = time + this.cooldown;
        logToPage(`${this.name} next trigger updated to ${this.nextTrigger}`);

        return {
            damage: highestShield, // Dynamic damage based on the highest shield value
            heal: 0, // No healing
            shield: 0 // No shielding
        };
    } */
};

export default crusherClaw; 