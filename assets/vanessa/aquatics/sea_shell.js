import { baseItem } from "../../base/baseItem.js";

const seaShell = {
    ...baseItem,
    name: "Sea Shell",
    type: "Aquatic",
    cost: 2,
    cooldown: 6,
    target: "self",
    shield: 10, // Base shield value

    // Function to calculate the shield value dynamically
    calculateShield: function (owner) {
        // Count the number of other Acquatic items on the board
        const additionalAcquaticItems = owner.items.filter(item => item.type === "Acquatic" && item.name !== this.name).length;

        // Calculate the total shield value
        const totalShield = this.shield + (additionalAcquaticItems * 10);

        logToPage(`${this.name} gains an additional ${additionalAcquaticItems * 10} Shield from other Acquatic items.`);

        // Update the next trigger time for Sea Shell
        this.nextTrigger = time + this.cooldown;
        logToPage(`${this.name} next trigger updated to ${this.nextTrigger}`);

        return totalShield;
    }
};

export default seaShell;