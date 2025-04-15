# Bazaar Simulator

A simulator for the Bazaar game, based on the deep mechanics from bazaarDB.gg.

## Deep Mechanics

This simulator implements the deep mechanics from bazaarDB.gg, which reveal how the game engine processes each card under the hood. The deep mechanics include:

- **Basic Properties**: Name, type, tier, cost, cooldown, size, trigger, target
- **Direct Effects**: Damage, heal, shield
- **Status Effects**: Poison, burn, freeze, slow, haste
- **Advanced Mechanics**: Critical hit, multicast, ammo, enchantment
- **Special Mechanics**: Custom functions for onTrigger, calculateDamage, calculateShield, etc.
- **Adjacency Mechanics**: Effects that depend on adjacent items
- **Synergy Mechanics**: Effects that depend on item types

## How to Use

### Creating a New Item

1. Use the template in `assets/templates/deep_mechanics_item.js` as a starting point
2. Customize the properties and functions according to the item's mechanics
3. Export the item as the default export

### Importing Items

Items can be imported using the `importItem` function from `utils/item-processor.js`:

```javascript
import { importItem } from './utils/item-processor.js';

const myItem = await importItem('./path/to/item.js');
```

### Processing Items

Items are automatically processed according to the deep mechanics when they are triggered in combat. The processing order is:

1. Properties
2. Direct Effects
3. Status Effects
4. Advanced Mechanics
5. Special Mechanics
6. Adjacency Mechanics
7. Synergy Mechanics

## Directory Structure

- `assets/`: Contains all item definitions
  - `base/`: Contains the base item definition
  - `templates/`: Contains templates for creating new items
  - `curio/`: Contains Curio items
  - `vanessa/`: Contains Vanessa items
- `data/`: Contains data files
  - `deep-mechanics.js`: Defines the deep mechanics structure
  - `items.js`: Contains basic item definitions
  - `bazaar.js`: Imports and exports all items
- `utils/`: Contains utility functions
  - `item-processor.js`: Handles importing and processing items
- `combat.js`: Handles combat simulation
- `main.js`: Entry point for the application

## Adding New Mechanics

To add new mechanics:

1. Update the `MECHANICS` object in `data/deep-mechanics.js`
2. Update the `PROCESSING_ORDER` array in `data/deep-mechanics.js`
3. Update the `processItemMechanics` function in `utils/item-processor.js`
4. Update the `triggerItem` function in `combat.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
