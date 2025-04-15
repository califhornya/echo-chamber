export function scalingDamageHighestShield(item, owner, target) {
    // Find the highest shield value among the owner's items
    const highestShield = owner.items.reduce((max, item) => {
        return item.shield && typeof item.shield === "number" ? Math.max(max, item.shield) : max;
    }, 0);

    // Log the calculated damage
    logToPage(`${item.name} calculates damage based on the highest shield value of the owner's items: ${highestShield}`);

    return {
        damage: highestShield, // Dynamic damage based on the highest shield value
        heal: 0, // No healing
        shield: 0 // No shielding
    };
}