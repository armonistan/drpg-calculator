import React from 'react';

type MyProps = { playerSkill: number };

class Landing extends React.Component<{}, { playerSkill: number }> {
  constructor(props: any) {
    super(props);
    this.state = { playerSkill: 1 };
  }

  calculateHitChances() {
    const playerSkill = this.state.playerSkill;
    const enemyAc = 1;//document.getElementById("enemyAc").value;
    const diceType = 6;//document.getElementById("diceType").value;
    const critThreshold = 4;//document.getElementById("critThreshold").value;

    const diceCombosValues = this.getAllDiceCombosValues({
      maxDiceValue: diceType,
      numberOfDice: playerSkill,
      critThreshold: critThreshold
    })

    var diceCombosValuesThatHit = {
      nonCrit: [],
      crit: []
    }

    diceCombosValues.nonCrit.forEach(function(nonCritComboValue) {
      if (nonCritComboValue >= enemyAc) {
        diceCombosValuesThatHit.nonCrit.push(nonCritComboValue);
      }
    });

    diceCombosValues.crit.forEach(function(critComboValue) {
      if (critComboValue >= enemyAc) {
        diceCombosValuesThatHit.crit.push(critComboValue);
      }
    });

    var chanceToHit = (diceCombosValuesThatHit.nonCrit.length / diceCombosValues.nonCrit.length).toFixed(2) + "%";
    var chanceToCrit = (diceCombosValuesThatHit.crit.length / diceCombosValues.crit.length).toFixed(2) + "%";

    //document.getElementById("chanceToHit").innerHTML = chanceToHit;
    //document.getElementById("chanceToCrit").innerHTML = chanceToCrit;
    console.log(chanceToHit);
    console.log(chanceToCrit);
  }

  getAllDiceCombosValues(options: any) {
    var diceCombosValues = {
      nonCrit: [],
      crit: []
    };
    var dice = [];

    for (var i = 0; i < options.numberOfDice; i++) {
      dice.push(1);
    }

    let newOptions: any = {
      diceIndex: 0,
      dice: dice,
      diceCombosValues: diceCombosValues,
      maxDiceValue: options.maxDiceValue,
      critThreshold: options.critThreshold
    }

    diceComboCalculator(newOptions);

    return diceCombosValues;

    function diceComboCalculator(options: any) {
      if (options.diceIndex < options.dice.length - 1) {
        for (var i = 1; i <= options.maxDiceValue; i++) {
          dice[options.diceIndex] = i;

          diceComboCalculator({
            diceIndex: (options.diceIndex + 1),
            dice: options.dice,
            diceCombosValues: options.diceCombosValues,
            maxDiceValue: options.maxDiceValue,
            critThreshold: options.critThreshold
          })
        }
      } else {
        for (var i = 1; i <= options.maxDiceValue; i++) {
          options.dice[options.diceIndex] = i;

          var nonCritDiceComboValue = 0;
          var critDiceComboValue = 0;

          options.dice.forEach(function(diceValue: any) {
            nonCritDiceComboValue += diceValue;

            if (diceValue >= options.critThreshold) {
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

  handleChange(event: any) {
    this.setState({ playerSkill: event.target.value });
  }

  render() {
    return (
      <div>
        <div>
        </div>

        <form onSubmit={this.calculateHitChances}>
            Player Skill: <input value={this.state.playerSkill} onChange={this.handleChange} type="number" /> <br />
            Enemy AC: <input id="enemyAc" type="number" /> <br />
            Dice Type: <input id="diceType" type="number" /> <br />
            Crit Threshold: <input id="critThreshold" type="number" /> <br />
          <input type="submit" value="Submit" />

          <input type="submit" value="Calculate Hit Chances" />
        </form>

        <table>
          <tr>
            <th>Chance To Hit</th>
            <th>Chance To Crit</th>
          </tr>
          <tr>
            <td id="chanceToHit"></td>
            <td id="chanceToCrit"></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Landing;
