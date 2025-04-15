import { baseItem } from "../../base/baseItem.js";

async function generateItemFile(url) {
  try {
    // Extract ID and item name from the URL
    const urlParts = url.split('/');
    const itemId = urlParts[urlParts.length - 2]; // Gets the ID part
    const itemName = urlParts[urlParts.length - 1]; // Gets the name part
    
    // Fetch data from the URL
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Create a camelCase variable name from the item name
    const varName = itemName.charAt(0).toLowerCase() + 
                   itemName.slice(1).replace(/\s+/g, '');
    
    // Generate the JavaScript code for the item
    const itemCode = `import { baseItem } from "../../base/baseItem.js";

const ${varName} = {
    ...baseItem,
    name: "${data.name || itemName}",
    type: "${data.type || baseItem.type}",
    tier: "${data.tier || baseItem.tier}",
    cooldown: ${data.cooldown ?? baseItem.cooldown},
    size: ${data.size ?? baseItem.size},
    trigger: "${data.trigger || baseItem.trigger}",
    target: "${data.target || baseItem.target}",
    damage: ${data.damage ?? baseItem.damage},
    poison: ${data.poison ?? baseItem.poison},
    burn: ${data.burn ?? baseItem.burn},
    heal: ${data.heal ? 'true' : 'false'},
    shield: ${data.shield ? 'true' : 'false'},
    
    // If there are tier values, include them
    ${data.tierValues ? `tierValues: ${JSON.stringify(data.tierValues, null, 4)}` : ''}
};

export default ${varName};`;

    return itemCode;
  } catch (error) {
    console.error("Error generating item file:", error);
    return null;
  }
}

// Usage example
const url = "https://bazaardb.gg/card/46nxqodmnenhc19lqqherkuv7/Clamera";
generateItemFile(url).then(fileContent => {
  if (fileContent) {
    console.log("Generated file content:");
    console.log(fileContent);
    
    // In a real application, you might save this to a file
    // or display it in a text area for the user to copy
  }
});