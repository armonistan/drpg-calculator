function calculateHitChances() {
  const playerSkill = document.getElementById("playerSkill").value;
  const enemyAc = document.getElementById("enemyAc").value;
  const diceType = document.getElementById("diceType").value;
  const critThreshold = document.getElementById("critThreshold").value;

  const diceCombosValues = getAllDiceCombosValues({
    maxDiceValue: diceType,
    numberOfDice: playerSkill,
    critThreshold: critThreshold
  })

  var diceCombosValuesThatHit = {
    nonCrit: [],
    crit: []
  }

  diceCombosValues.nonCrit.forEach(function(nonCritComboValue) {
    if(nonCritComboValue >= enemyAc) {
      diceCombosValuesThatHit.nonCrit.push(nonCritComboValue);
    }
  });

  diceCombosValues.crit.forEach(function(critComboValue) {
    if(critComboValue >= enemyAc) {
      diceCombosValuesThatHit.crit.push(critComboValue);
    }
  });

  var chanceToHit = parseFloat(diceCombosValuesThatHit.nonCrit.length/diceCombosValues.nonCrit.length).toFixed(2)+"%";
  var chanceToCrit = parseFloat(diceCombosValuesThatHit.crit.length/diceCombosValues.crit.length).toFixed(2)+"%";

  document.getElementById("chanceToHit").innerHTML = chanceToHit;
  document.getElementById("chanceToCrit").innerHTML = chanceToCrit;
}

function getAllDiceCombosValues(options) {
  var diceCombosValues = {
    nonCrit: [],
    crit: []
  };
  var dice = [];

  for(var i = 0; i < options.numberOfDice; i++) {
    dice.push(1);
  }

  var options = {
    diceIndex: 0,
    dice: dice,
    diceCombosValues: diceCombosValues,
    maxDiceValue: options.maxDiceValue,
    critThreshold: options.critThreshold
  }

  diceComboCalculator(options);

  return diceCombosValues;

  function diceComboCalculator(options) {
    if(options.diceIndex < options.dice.length-1) {
      for(var i=1; i <= options.maxDiceValue; i++) {
        dice[options.diceIndex] = i;

        diceComboCalculator({
          diceIndex: (options.diceIndex+1),
          dice: options.dice,
          diceCombosValues: options.diceCombosValues,
          maxDiceValue: options.maxDiceValue,
          critThreshold: options.critThreshold
        })
      }
    } else {
      for(var i=1; i <= options.maxDiceValue; i++) {
        options.dice[options.diceIndex] = i;

        var nonCritDiceComboValue = 0;
        var critDiceComboValue = 0;

        options.dice.forEach(function(diceValue) {
          nonCritDiceComboValue += diceValue;

          if(diceValue >= options.critThreshold) {
            critDiceComboValue += diceValue;
          }
        })

        options.diceCombosValues.nonCrit.push(nonCritDiceComboValue);
        options.diceCombosValues.crit.push(critDiceComboValue);
      }
    }

    return;
  }
}

/* sudo code/features to be implemented

  generate random weapons
    user input "rarity"
    define weapons/archetypes
      {
        weapon type
        attck dice bonus
        max attack dice
        damage span
        unique abilities
        ar range
      }
    define perks
    randomly combine archetype with perks

  calculate damage graph of weapon/player
    get all dice combo values
    get commonness of each combo
    take average expected damage and multiply by combo commoness
    combine average expected damages to get expected damages for weapon on whole

  player vs enemy simulator
    tbd
*/
