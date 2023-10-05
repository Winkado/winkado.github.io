let costs = document.getElementById("cost")
let pops = document.getElementById("pops")
let tier5s = document.getElementById("tier5s")
let upgrades = document.getElementById("upgrades")
let geraldo = document.getElementById("geraldo")

let costsOutput = 0
let popsOutput = 0
let cashOutput = 0
let popCash = 0
let tier5sOutput = 0
let upgradesOutput = 0
let geraldoOutput = 0
let power = 0

let powerToDegree = [
    0,
    2000,
    2324,
    2666,
    3027,
    3408,
    3808,
    4228,
    4669,
    5131,
    5615,
    6121,
    6650,
    7203,
    7779,
    8379,
    9004,
    9654,
    10330,
    11032,
    11761,
    12518,
    13302,
    14114,
    14955,
    15825,
    16725,
    17655,
    18616,
    19609,
    20633,
    21689,
    22778,
    23900,
    25056,
    26246,
    27471,
    28732,
    30028,
    31360,
    32729,
    34135,
    35579,
    37061,
    38582,
    40143,
    41743,
    43383,
    45064,
    46786,
    48550,
    50356,
    52205,
    54098,
    56034,
    58014,
    60039,
    62109,
    64225,
    66387,
    68596,
    70853,
    73157,
    75509,
    77910,
    80360,
    82860,
    85410,
    88011,
    90664,
    93368,
    96124,
    98933,
    101795,
    104711,
    107681,
    110706,
    113787,
    116923,
    120115,
    123364,
    126670,
    130034,
    133456,
    136937,
    140478,
    144078,
    147738,
    151459,
    155241,
    159085,
    162991,
    166960,
    170993,
    175089,
    179249,
    183474,
    187764,
    192120,
    200000
]

costs.oninput = function () {
    if (costs.value > 250000) costs.value = 250000
    costsOutput = Math.min(Math.floor(cost.value / 25), 10000)
    calculate()
}
pops.oninput = function () {
    if (pops.value > 16200000) pops.value = 16200000
    popsOutput = Math.min(Math.floor(pops.value / 180), 90000)
    calculate()
}
cash.oninput = function () {
    if (cash.value > 4050000) cash.value = 4050000
    cashOutput = Math.min(Math.floor(cash.value / 45), 90000)
    calculate()
}
tier5s.oninput = function () {
    if (tier5s.value > 12) tier5s.value = 12
    tier5sOutput = Math.min((tier5s.value - 3) * 10000, 90000)
    if (tier5s.value < 3) tier5sOutput = 0
    calculate()
}
upgrades.oninput = function () {
    if (upgrades.value > 100) upgrades.value = 100
    upgradesOutput = Math.min(upgrades.value * 100, 10000)
    calculate()
}
geraldo.oninput = function () {
    if (geraldo.value > 100) geraldo.value = 100
    geraldoOutput = geraldo.value * 2000
    calculate()
}
function updateOnClick() {
    const element = document.activeElement.tagName;
    if (tier5s.value < 3) {
        tier5s.value = 3
        tier5sOutput = Math.min((tier5s.value - 3) * 10000, 90000)
        calculate()
    }
}
function calculate() {
    if (upgrades.value < (tier5s.value - 3) * 4) document.getElementById("warning").innerHTML = `Additional T5s are at least 4 upgrades each`; else document.getElementById("warning").innerHTML = ``;
    if (popsOutput + cashOutput < 90000) popCash = popsOutput + cashOutput; if (popsOutput + cashOutput >= 90000) popCash = 90000 // Logic so Pops and Cash Generated doesn't go over 90k power
    let power = (costsOutput + popCash + tier5sOutput + upgradesOutput + geraldoOutput) // Adds the power from every input together
    for (let i = 0; i < powerToDegree.length; i++) { // Loops through the power required per degree array
        if (power >= powerToDegree[i]) { // Checks if you have enough power
            let degree = i + 1
            if (degree < 100) document.getElementById("degree").innerHTML = `Degree ${degree} (${power - powerToDegree[i]}/${powerToDegree[i + 1] - powerToDegree[i]})` // Shows Degree and Power until next Degree
            if (degree == 100) document.getElementById("degree").innerHTML = `Degree ${degree} (${power - powerToDegree[i]}/0)` // Makes it display Power/0 instead of Power/NaN at Degree 100
            document.getElementById("power").innerHTML = `Total Power (${power}/200000)` // Shows Total Power
            if (power > 201999) {
                document.getElementById("warning_geraldo").innerHTML = `You have ${Math.floor((power - 200000) / 2000)} more totems than necessary<pt>`
            } else {
                document.getElementById("warning_geraldo").innerHTML = ``
            }
        }
    }
}