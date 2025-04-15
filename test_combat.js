/**
 * Test file for the simplified combat system
 * Demonstrates different combat scenarios with various item combinations
 */

import { startSimpleCombat } from './simple_combat.js';
import { ITEMS } from './data/items.js';
import { BAZAAR } from './data/bazaar.js';

// Function to run a test combat
function runTestCombat(player, monster, testName) {
  console.log(`Running test: ${testName}`);
  
  // Create a new log box for this test
  const logsContainer = document.getElementById("logs-container");
  const logBox = document.createElement("div");
  logBox.className = "log-box";
  logBox.id = `test-${testName}`;
  
  // Add a title for the test
  const title = document.createElement("h2");
  title.textContent = `Test: ${testName}`;
  logBox.appendChild(title);
  
  // Add a <pre> element for the logs
  const logContent = document.createElement("pre");
  logContent.className = "log-content";
  logBox.appendChild(logContent);
  
  // Append the new log box to the container
  logsContainer.appendChild(logBox);
  
  // Run the combat
  const result = startSimpleCombat(player, monster);
  
  // Log the result
  console.log(`Test ${testName} result:`, result);
  
  return result;
}

// Test 1: Basic combat with LongSword vs SmallShield
function testBasicCombat() {
  const player = {
    name: "Player",
    hp: 100,
    shield: 0,
    items: [ITEMS.LongSword]
  };
  
  const monster = {
    name: "Monster",
    hp: 100,
    shield: 0,
    items: [ITEMS.SmallShield]
  };
  
  return runTestCombat(player, monster, "Basic Combat");
}

// Test 2: Combat with Sea Shell and Crusher's Claw
function testAquaticCombat() {
  const player = {
    name: "Player",
    hp: 150,
    shield: 0,
    items: [BAZAAR.sea_shell]
  };
  
  const monster = {
    name: "Monster",
    hp: 150,
    shield: 0,
    items: [BAZAAR.crusher_claw]
  };
  
  return runTestCombat(player, monster, "Aquatic Combat");
}

// Test 3: Combat with multiple items
function testMultipleItems() {
  const player = {
    name: "Player",
    hp: 200,
    shield: 0,
    items: [ITEMS.LongSword, ITEMS.FireSword, ITEMS.SmallShield]
  };
  
  const monster = {
    name: "Monster",
    hp: 200,
    shield: 0,
    items: [ITEMS.IcyStaff, ITEMS.FrostStaff, BAZAAR.crusher_claw]
  };
  
  return runTestCombat(player, monster, "Multiple Items");
}

// Export the test functions
export { testBasicCombat, testAquaticCombat, testMultipleItems }; 