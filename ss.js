// If the item has a burn effect, apply it (shield absorbs burn)
if (item.burn > 0) {
    if (target.shield > 0) {
      logToPage(`${target.name}'s shield absorbs the burn effect.`);
    } else {
      logToPage(`${target.name} is burned!`);
      target.hp -= item.burn; // Apply burn damage
    }
  }

  // If the item has a poison effect, apply it (poison ignores shield)
  if (item.poison > 0) {
    logToPage(`${target.name} is poisoned!`);
    target.hp -= item.poison; // Apply poison damage
  }

  // If the item has a freeze effect, apply it
  if (item.freeze) {
    if (item.target === "enemyItem") {
      applyFreezeEffect(target.items, item.freezeDuration, item.freezeTargets);
    } else if (item.target === "selfItem") {
      logToPage(`${item.name} is freezing ${source.name}'s items.`);
      applyFreezeEffect(source.items, item.freezeDuration, item.freezeTargets);
    }
  }

  // If the item has a heal effect, apply it
  if (item.heal) {
    applyHealEffect(source, item.heal);
  }

  // If the item has a shield effect, apply it
  if (item.shield) {
    applyShieldEffect(source, item.shield);
  }