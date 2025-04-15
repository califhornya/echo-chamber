/**
 * Simple Combat System for Bazaar Simulator
 * Based on BazaarDB.gg deep mechanics
 */

// Combat state
let combatLog = [];
let combatCount = 0;

/**
 * Start a combat simulation between two entities
 * @param {Object} player - The player entity
 * @param {Object} monster - The monster entity
 * @returns {Object} - Combat results
 */
export function startSimpleCombat(player, monster) {
  // Create a new log box for this combat session
  createNewLogBox();
  
  // Reset combat log
  combatLog = [];
  
  // Log combat start
  logToPage("Combat Started!");
  
  // Initialize combat state
  let time = 0;
  let playerHp = player.hp;
  let monsterHp = monster.hp;
  let playerShield = player.shield || 0;
  let monsterShield = monster.shield || 0;
  
  // Initialize item cooldowns
  const playerItems = player.items.map(item => ({
    ...item,
    nextTrigger: item.cooldown
  }));
  
  const monsterItems = monster.items.map(item => ({
    ...item,
    nextTrigger: item.cooldown
  }));
  
  // Combat loop
  while (playerHp > 0 && monsterHp > 0 && time < 100) { // Add a time limit to prevent infinite loops
    // Process player items
    processItems(playerItems, playerHp, playerShield, monsterHp, monsterShield, time, "Player", "Monster");
    
    // Process monster items
    processItems(monsterItems, monsterHp, monsterShield, playerHp, playerShield, time, "Monster", "Player");
    
    // Update time
    time++;
    
    // Log current state
    logToPage(`Time ${time}: Player HP: ${playerHp}, Shield: ${playerShield} | Monster HP: ${monsterHp}, Shield: ${monsterShield}`);
  }
  
  // Determine winner
  let result;
  if (playerHp <= 0) {
    logToPage("Monster wins!");
    result = { winner: "Monster", playerHp, monsterHp, time };
  } else if (monsterHp <= 0) {
    logToPage("Player wins!");
    result = { winner: "Player", playerHp, monsterHp, time };
  } else {
    logToPage("Combat ended in a draw!");
    result = { winner: "Draw", playerHp, monsterHp, time };
  }
  
  return result;
}

/**
 * Process items for an entity
 * @param {Array} items - The items to process
 * @param {number} ownerHp - The owner's HP
 * @param {number} ownerShield - The owner's shield
 * @param {number} targetHp - The target's HP
 * @param {number} targetShield - The target's shield
 * @param {number} time - Current time
 * @param {string} ownerName - The owner's name
 * @param {string} targetName - The target's name
 * @returns {Object} - Updated HP and shield values
 */
function processItems(items, ownerHp, ownerShield, targetHp, targetShield, time, ownerName, targetName) {
  // Check each item
  items.forEach(item => {
    // Skip if item is on cooldown
    if (time < item.nextTrigger) {
      return;
    }
    
    // Item is ready to trigger
    logToPage(`${item.name} triggers!`);
    
    // Process item effects
    const result = processItemEffects(item, ownerHp, ownerShield, targetHp, targetShield, ownerName, targetName);
    
    // Update HP and shield values
    ownerHp = result.ownerHp;
    ownerShield = result.ownerShield;
    targetHp = result.targetHp;
    targetShield = result.targetShield;
    
    // Reset cooldown
    item.nextTrigger = time + item.cooldown;
  });
  
  return { ownerHp, ownerShield, targetHp, targetShield };
}

/**
 * Process the effects of an item
 * @param {Object} item - The item to process
 * @param {number} ownerHp - The owner's HP
 * @param {number} ownerShield - The owner's shield
 * @param {number} targetHp - The target's HP
 * @param {number} targetShield - The target's shield
 * @param {string} ownerName - The owner's name
 * @param {string} targetName - The target's name
 * @returns {Object} - Updated HP and shield values
 */
function processItemEffects(item, ownerHp, ownerShield, targetHp, targetShield, ownerName, targetName) {
  // Process damage
  if (item.damage) {
    // Apply damage to target
    if (targetShield > 0) {
      // Shield absorbs damage
      if (item.damage <= targetShield) {
        targetShield -= item.damage;
        logToPage(`${targetName}'s shield absorbs ${item.damage} damage. Remaining shield: ${targetShield}`);
      } else {
        const remainingDamage = item.damage - targetShield;
        targetShield = 0;
        targetHp -= remainingDamage;
        logToPage(`${targetName}'s shield absorbs ${item.damage - remainingDamage} damage. ${targetName} takes ${remainingDamage} damage.`);
      }
    } else {
      // No shield, apply full damage
      targetHp -= item.damage;
      logToPage(`${targetName} takes ${item.damage} damage.`);
    }
  }
  
  // Process shield
  if (item.shield) {
    ownerShield += item.shield;
    logToPage(`${ownerName} gains ${item.shield} shield.`);
  }
  
  // Process heal
  if (item.heal) {
    ownerHp += item.heal;
    logToPage(`${ownerName} heals for ${item.heal} HP.`);
  }
  
  // Process burn
  if (item.burn) {
    if (targetShield > 0) {
      logToPage(`${targetName}'s shield absorbs the burn effect.`);
    } else {
      targetHp -= item.burn;
      logToPage(`${targetName} is burned for ${item.burn} damage!`);
    }
  }
  
  // Process poison
  if (item.poison) {
    targetHp -= item.poison;
    logToPage(`${targetName} is poisoned for ${item.poison} damage!`);
  }
  
  // Process special effects (like Sea Shell's shield bonus)
  if (item.calculateShield) {
    const shieldValue = item.calculateShield({ items: [item] });
    ownerShield += shieldValue;
    logToPage(`${ownerName} gains ${shieldValue} shield from ${item.name}.`);
  }
  
  // Process special effects (like Crusher's Claw's damage based on shield)
  if (item.calculateDamage) {
    const damageValue = item.calculateDamage({ items: [item] });
    if (targetShield > 0) {
      if (damageValue <= targetShield) {
        targetShield -= damageValue;
        logToPage(`${targetName}'s shield absorbs ${damageValue} damage. Remaining shield: ${targetShield}`);
      } else {
        const remainingDamage = damageValue - targetShield;
        targetShield = 0;
        targetHp -= remainingDamage;
        logToPage(`${targetName}'s shield absorbs ${damageValue - remainingDamage} damage. ${targetName} takes ${remainingDamage} damage.`);
      }
    } else {
      targetHp -= damageValue;
      logToPage(`${targetName} takes ${damageValue} damage.`);
    }
  }
  
  return { ownerHp, ownerShield, targetHp, targetShield };
}

/**
 * Log a message to the page
 * @param {string} message - The message to log
 */
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
  
  // Also store in combat log array
  combatLog.push(message);
}

/**
 * Create a new log box for the combat
 */
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