let time = 0;
const step = 1;
let combatInterval = null;
let combatCount = 0; // Track the number of combats

function updateItemCooldown(item, currentTime, owner, target) {
  logToPage(`Checking ${item.name} at time ${currentTime}. Next trigger: ${item.nextTrigger}, Next unfreeze: ${item.nextUnfreeze}`);

  // Skip if the item is frozen
  if (item.nextUnfreeze && item.nextUnfreeze > currentTime) {
    logToPage(`${item.name} is frozen and cannot trigger.`);
    return;
  }

  // Check if it's time to trigger the item
  if (currentTime >= item.nextTrigger) {
    logToPage(`${item.name} is triggering.`);
    triggerItem(item, owner, target);
    item.nextTrigger = currentTime + item.cooldown; // Reset cooldown
    logToPage(`${item.name} next trigger updated to ${item.nextTrigger}`);
  }
}

function updateCombatState(player, monster) {
  // Apply cooldowns and trigger items for player and monster
  player.items.forEach(item => updateItemCooldown(item, time, player, monster));
  monster.items.forEach(item => updateItemCooldown(item, time, monster, player));

  // Apply freeze effects after all items have triggered
  updateFreeze(player.items);
  updateFreeze(monster.items);

  logToPage(`Player Items Next Trigger: ${JSON.stringify(player.items.map(item => ({ name: item.name, nextTrigger: item.nextTrigger })))}`);
  logToPage(`Monster Items Next Trigger: ${JSON.stringify(monster.items.map(item => ({ name: item.name, nextTrigger: item.nextTrigger })))}`);

  // Log the current HP of both player and monster
  logToPage(`Player HP: ${player.hp}`);
  logToPage(`Monster HP: ${monster.hp}`);
  logToPage(`Player Shield: ${player.shield}`);
  logToPage(`Monster Shield: ${monster.shield}`);
  logToPage(`Player Poison: ${player.poison}`);
  logToPage(`Monster Poison: ${monster.poison}`);
  logToPage(`Player Burn: ${player.burn}`);
  logToPage(`Monster Burn: ${monster.burn}`);
  if (player.hp > 0 && monster.hp > 0) {
    logToPage(`Time ${time} > ${time + 1}`);
  }
  
}

export function startCombat(player, monster) {
  // Create a new log box for this combat session
  createNewLogBox();

  logToPage("Combat Started!");

  // Reset time to 0 for a new combat session
  time = 0;

  // Reset item states for all items
  [...player.items, ...monster.items].forEach(item => {
    item.nextTrigger = time + item.cooldown; // Set the first trigger time based on cooldown
    item.nextUnfreeze = null; // Reset freeze state
  });

  // Start the combat loop
  combatInterval = setInterval(() => {
    updateCombatState(player, monster);

    // Increment time after each step
    time += step;

    // Check if combat should end (either player or monster is dead)
    if (player.hp <= 0 || monster.hp <= 0) {
      endCombat(player, monster); // End combat if someone's health reaches 0
    }
  }, 1000); // Update every second (1s = 1000ms)
}

// Function to trigger an item effect (damage, freeze, heal, etc.)
function triggerItem(item, source, target) {
  logToPage(`${item.name} triggered on ${target.name}`);

  // Apply damage if the item does damage
  if (item.damage) {
    let damageToApply = item.damage;

    // If the target has a shield, reduce the damage by the shield value
    if (target.shield > 0) {
      if (damageToApply <= target.shield) {
        target.shield -= damageToApply;
        damageToApply = 0;
      } else {
        damageToApply -= target.shield;
        target.shield = 0;
      }
      let shieldAbsorbed = item.damage - damageToApply;
      logToPage(`${target.name}'s shield absorbs ${shieldAbsorbed} damage. Remaining shield: ${target.shield}`);
    }

    // Apply remaining damage to HP
    if (damageToApply > 0) {
      target.hp -= damageToApply;
      logToPage(`${target.name} takes ${damageToApply} damage.`);
    }
  }

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

  // Apply other effects (e.g., haste, slow) as needed here
}

// Apply freeze effect on items (update pendingFreeze duration)
function applyFreezeEffect(targets, duration, numTargets) {
  // Filter out items that can be frozen
  const possibleTargets = targets.filter(target => target);

  // If numTargets is greater than or equal to possible targets, freeze all
  if (numTargets >= possibleTargets.length) {
    possibleTargets.forEach(target => {
      if (target.nextUnfreeze && target.nextUnfreeze > time) {
        // Extend the freeze duration if already frozen
        target.nextUnfreeze += duration;
        target.nextTrigger += duration; // Delay the next trigger by the freeze duration
      } else {
        // Apply new freeze duration
        target.nextUnfreeze = time + duration;
        target.nextTrigger += duration; // Delay the next trigger by the freeze duration
      }
      logToPage(`${target.name} is now frozen for ${duration} seconds.`);
    });
    return;
  }

  // Randomly select `numTargets` from possible targets
  const selectedTargets = [];
  while (selectedTargets.length < numTargets) {
    const randomIndex = Math.floor(Math.random() * possibleTargets.length);
    const target = possibleTargets[randomIndex];

    // Ensure no duplicate selections
    if (!selectedTargets.includes(target)) {
      selectedTargets.push(target);
    }
  }

  // Apply freeze to the selected targets
  selectedTargets.forEach(target => {
    if (target.nextUnfreeze && target.nextUnfreeze > time) {
      // Extend the freeze duration if already frozen
      target.nextUnfreeze += duration;
      target.nextTrigger += duration; // Delay the next trigger by the freeze duration
    } else {
      // Apply new freeze duration
      target.nextUnfreeze = time + duration;
      target.nextTrigger += duration; // Delay the next trigger by the freeze duration
    }
    logToPage(`${target.name} is now frozen for ${duration} seconds.`);
  });
}

// Update freeze status for each item (reduce freeze duration over time)
function updateFreeze(items) {
  items.forEach(item => {
    // Unfreeze items whose freeze duration has ended
    if (item.nextUnfreeze && item.nextUnfreeze <= time) {
      item.nextUnfreeze = null;
      logToPage(`${item.name} is no longer frozen.`);
    }
  });
}

function endCombat(player, monster) {
  // Clear the combat interval to stop the game loop
  clearInterval(combatInterval);

  // Determine winner based on health
  if (player.hp <= 0 && monster.hp <= 0) {
    logToPage("Player wins!"); // Player wins if both HPs are <= 0
  } else if (player.hp <= 0) {
    logToPage("Monster wins!");
  } else if (monster.hp <= 0) {
    logToPage("Player wins!");
  }

  // potrei resettare qui il game per lo start seguente
}

function applySlowEffect(targets, duration, numTargets) {
  let affected = 0;
  for (let target of targets) {
    if (affected < numTargets) {
      target.cooldown *= 2; // Slow doubles the cooldown of an item
      affected++;
    }
  }
}

function applyHasteEffect(targets, duration, numTargets) {
  let affected = 0;
  for (let target of targets) {
    if (affected < numTargets) {
      target.cooldown /= 2; // Haste halves the cooldown
      affected++;
    }
  }
}

function logToPage(message) {
  const currentLog = document.querySelector(`#log-${combatCount} .log-content`);
  if (currentLog) {
    // Check for specific keywords and add corresponding CSS classes
    let className = "";
    if (message.includes("frozen")) {
      className = "freeze";
    } else if (message.includes("damage")) {
      className = "damage";
    } else if (message.includes("wins")) {
      className = "wins";
    } else if (message.includes("Checking")) {
      className = "checking";
    } else if (message.includes("trigger")) {
      className = "trigger";
    } else if (message.includes("{")) {
      className = "sumup";
    } else if (message.includes("heal")) {
      className = "heal";
    } else if (message.includes("shield")) {
      className = "shield";
    }

    // Create a new span element for the message
    const logMessage = document.createElement("span");
    logMessage.className = `log-message ${className}`;
    logMessage.textContent = message;

    // Append the message to the log
    currentLog.appendChild(logMessage);
    currentLog.appendChild(document.createElement("br")); // Add a line break
    currentLog.scrollTop = currentLog.scrollHeight; // Auto-scroll to the bottom
  }
}

function createNewLogBox() {
  combatCount++; // Increment combat count
  const logsContainer = document.getElementById("logs-container");

  // Create a new log box
  const logBox = document.createElement("div");
  logBox.className = "log-box";
  logBox.id = `log-${combatCount}`;

  // Add a title for the combat
  const title = document.createElement("h2");
  title.textContent = `Combat ${combatCount}`;
  logBox.appendChild(title);

  // Add a <pre> element for the logs
  const logContent = document.createElement("pre");
  logContent.className = "log-content";
  logBox.appendChild(logContent);

  // Append the new log box to the container
  logsContainer.appendChild(logBox);
}

function applyHealEffect(owner, healAmount) {
  owner.hp += healAmount; // Increase the owner's HP
  logToPage(`${owner.name} heals for ${healAmount} HP.`);
}

function applyShieldEffect(owner, shieldAmount) {
  owner.shield += shieldAmount; // Increase the owner's shield value
  logToPage(`${owner.name} gains a shield of ${shieldAmount}.`);
}