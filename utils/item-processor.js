/**
 * Item Processor Utility
 * Handles importing and processing items according to the deep mechanics
 */

import { MECHANICS, PROCESSING_ORDER, validateItem, processItem } from '../data/deep-mechanics.js';
import { baseItem } from '../assets/base/baseItem.js';

/**
 * Creates a new item based on the base item and the provided properties
 * @param {Object} properties - The properties of the item
 * @returns {Object} - The new item
 */
export function createItem(properties) {
  // Start with the base item
  const item = { ...baseItem };
  
  // Apply the provided properties
  Object.keys(properties).forEach(key => {
    item[key] = properties[key];
  });
  
  // Validate the item
  if (!validateItem(item)) {
    console.error(`Invalid item: ${item.name}`);
    return null;
  }
  
  return item;
}

/**
 * Imports an item from a file
 * @param {string} path - The path to the item file
 * @returns {Promise<Object>} - The imported item
 */
export async function importItem(path) {
  try {
    // Dynamic import of the item
    const itemModule = await import(path);
    const item = itemModule.default || itemModule;
    
    // Validate the item
    if (!validateItem(item)) {
      console.error(`Invalid item: ${item.name}`);
      return null;
    }
    
    return item;
  } catch (error) {
    console.error(`Error importing item from ${path}:`, error);
    return null;
  }
}

/**
 * Processes an item according to the deep mechanics
 * @param {Object} item - The item to process
 * @param {Object} owner - The owner of the item
 * @param {Object} target - The target of the item
 * @returns {Object} - The processed item
 */
export function processItemMechanics(item, owner, target) {
  // Process each mechanic category in order
  PROCESSING_ORDER.forEach(category => {
    // Skip if the category doesn't exist in the item
    if (!MECHANICS[category]) return;
    
    // Process each mechanic in the category
    Object.keys(MECHANICS[category]).forEach(mechanic => {
      // Skip if the mechanic doesn't exist in the item
      if (!item[mechanic]) return;
      
      // Process the mechanic based on its type
      const mechanicType = MECHANICS[category][mechanic];
      
      if (mechanicType === "function" && typeof item[mechanic] === "function") {
        // Execute the function
        item[mechanic](owner, target);
      } else if (mechanicType === "array" && Array.isArray(item[mechanic])) {
        // Process each item in the array
        item[mechanic].forEach(arrayItem => {
          if (typeof arrayItem === "function") {
            arrayItem(owner, target);
          }
        });
      }
      // Add more processing logic for other types as needed
    });
  });
  
  return item;
}

/**
 * Imports all items from a directory
 * @param {string} directory - The directory to import items from
 * @returns {Promise<Object>} - An object containing all imported items
 */
export async function importAllItems(directory) {
  // This would require a server-side component to read the directory
  // For now, we'll return an empty object
  return {};
}

/**
 * Applies adjacency bonuses to an item
 * @param {Object} item - The item to apply adjacency bonuses to
 * @param {Array} adjacentItems - The adjacent items
 * @returns {Object} - The item with adjacency bonuses applied
 */
export function applyAdjacencyBonuses(item, adjacentItems) {
  // Skip if the item doesn't have adjacency mechanics
  if (!item.adjacentBonus) return item;
  
  // Apply the adjacency bonus
  item.adjacentBonus(adjacentItems);
  
  return item;
}

/**
 * Applies synergy bonuses to an item
 * @param {Object} item - The item to apply synergy bonuses to
 * @param {Array} allItems - All items in the game
 * @returns {Object} - The item with synergy bonuses applied
 */
export function applySynergyBonuses(item, allItems) {
  // Skip if the item doesn't have synergy mechanics
  if (!item.synergyBonus || !item.synergyTypes) return item;
  
  // Filter items by the synergy types
  const synergyItems = allItems.filter(i => 
    item.synergyTypes.includes(i.type) && i !== item
  );
  
  // Apply the synergy bonus
  item.synergyBonus(synergyItems);
  
  return item;
} 