import { startCombat } from './combat.js';
import { ITEMS } from './data/items.js';
import { renderResult } from './render.js';

document.getElementById("start-btn").addEventListener("click", () => {
  console.log("Button clicked!");
  const player = {
    name: "Player",
    hp: 57,
    shield: 0, // Initial shield value
    poison: 0,
    burn: 0,
    items: [ITEMS.LongSword, ITEMS.IcyStaff]
  };

  const monster = {
    name: "Monster",
    hp: 21,
    shield: 0, // Initial shield value
    poison: 0,
    burn: 0,
    items: [ITEMS.FireSword, ITEMS.FrostStaff]
  };

  const result = startCombat(player, monster);
  renderResult(result);
});
