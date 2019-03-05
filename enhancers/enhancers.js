// https://github.com/JamieHall1962/testing-i/pull/1


module.exports = {
    success,
    fail,
    repair
  };

// create a test item
const item = {
    name: 'Iron Sword',
    originalName: 'Iron Sword',
    type: 'weapon',
    durability: 100,
    enhancement: 0,
}

// make the levels into an array
const enhLevels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'PRI','DUO','TRI','TET','PEN'];


// repair first. It's the easiest

function repair(item){
    item.durability = 100;
    return item
}


// if a call to the success method is fired we want to do it,
// or throw an error with a message saying why we couldn't


function success(item){
    if (item.durability < 25 && 0 < item.enhancement < 14) {
        throw new Error("If the item's enhancement is 14 or lower, the item cannot be enhanced if the durability is below 25.")
    }
    if (item.durability < 10 && item.enhancement >= 15) {
        throw new Error("If the item's enhancement is 15 or higher, the item cannot be enhanced if the durability is below 10.")
    }
    item.enhancement = item.enhancement + 1
    if(item.enhancement < 16){
        item.name = `[+${enhLevels[item.enhancement]}] ${item.originalName}`;

    }
    else if (item.enhancement > 15){
        item.name = `[${enhLevels[item.enhancement]}] ${item.originalName}`;
    }
    if(item.enhancement > 20){
        throw new Error("The item's `enhancement` can be a number 0 through 20 (PEN). Maximum level has been reached.")
    }
    return item
}

// Similarly, if a call to the fail method is fired we want to do it,
// or throw an error with a message saying why we couldn't


function fail(item){
    if(item.type === 'armor' && item.enhancement <= 5){
        throw new Error("Enhancing an armor up to 5 cannot fail.")
    }
    if(item.type === 'weapon' && item.enhancement <= 7){
        throw new Error("Enhancing a weapon up to 7 cannot fail.")
    }
    if(0 <= item.enhancement <= 14 && item.durability < 20){
        throw new Error("The durability of an item cannot be less than 20 when the item's enhancement level is between +0 and +14.")
       
    }
    if(item.enhancement >= 15 && item.enhancement<20 && item.durability <0){
        throw new Error("The durability of an item cannot be less than 0 when the item's enhancement level is between +15 and TET.")
      
    }
    if(item.enhancement > 15){
        item.enhancement = item.enhancement - 1;
        item.durability = item.durability - 10;
        item.name = `[${enhLevels[item.enhancement]}] ${item.originalName}`
    }

    if(item.enhancement <= 15){
        // item.enhancement = item.enhancement - 1;
        item.durability = item.durability - 5;
        item.name = `[+${enhLevels[item.enhancement]}] ${item.originalName}`
    }
   
    return item
}


