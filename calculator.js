function calculateHitChances() {
  const playerSkill = document.getElementById("playerSkill").value;
  const enemyAc = document.getElementById("enemyAc").value;
  const diceType = 6;
  const critThreshold = document.getElementById("critThreshold").value;

  var chanceToHit = "?";
  var chanceToCrit = "?"

  document.getElementById("chanceToHit").innerHTML = chanceToHit;
  document.getElementById("chanceToCrit").innerHTML = chanceToCrit;
}
