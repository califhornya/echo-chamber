import { startCombat } from './combat.js';
import { combatCoconutCrab } from './combat.js';
import { ITEMS } from './data/items.js';
import { renderResult } from './render.js';
import { BAZAAR } from './data/bazaar.js'; 

document.getElementById("start-btn").addEventListener("click", () => {
  console.log("Button clicked!");
  const player = {
    name: "Player",
    hp: 57,
    shield: 0,
    poison: 0,
    burn: 0,
    items: [ITEMS.LongSword, ITEMS.FireSword]
  };

  const monster = {
    name: "Monster",
    hp: 21,
    shield: 0,
    poison: 0,
    burn: 0,
    items: [ITEMS.FireSword, ITEMS.FrostStaff]
  };

  const coconutCrab = {
    name: "Coconut Crab",
    hp: 120,
    shield: 0,
    poison: 0,
    burn: 0,
    items: [BAZAAR.crusher_claw, ITEMS.SmallShield]
  };

  const result = startCombat(player, monster);
  /* const result = combatCoconutCrab(player, coconutCrab); */
  renderResult(result);
});
