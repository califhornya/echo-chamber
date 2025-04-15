import { importItem } from '../utils/item-processor.js';

// Import items using the item processor
const crusherClaw = await importItem('../assets/curio/weapons/crusher_claw.js');
const seaShell = await importItem('../assets/vanessa/aquatics/sea_shell.js');

export const BAZAAR = {
    crusher_claw: crusherClaw,
    sea_shell: seaShell,
    // Add more items as needed
};