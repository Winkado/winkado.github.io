let costs: HTMLInputElement | null = document.getElementById("cost");
let pops: HTMLInputElement | null = document.getElementById("pops");
let tier5s: HTMLInputElement | null = document.getElementById("tier5s");
let upgrades: HTMLInputElement | null = document.getElementById("upgrades");
let geraldo: HTMLInputElement | null = document.getElementById("geraldo");

let costsOutput: number = 0;
let popsOutput: number = 0;
let cashOutput: number = 0;
let popCash: number = 0;
let tier5sOutput: number = 0;
let upgradesOutput: number = 0;
let geraldoOutput: number = 0;
let power: number = 0;

let powerToDegree: number[] = [
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
];

costs?.addEventListener("input", function () {
    if (costs.value > 250000) costs.value = "250000";
    costsOutput = Math.min(Math.floor(Number(costs.value) / 25), 10000);
    calculate();
});

pops?.addEventListener("input", function () {
    if (pops.value > 16200000) pops.value = "16200000";
    popsOutput = Math.min(Math.floor(Number(pops.value) / 180), 90000);
    calculate();
});

cash?.addEventListener("input", function () {
    if (cash.value > 4050000) cash.value = "4050000";
    cashOutput = Math.min(Math.floor(Number(cash.value) / 45), 90000);
    calculate();
});

tier5s?.addEventListener("input", function () {
    if (tier5s.value > 12) tier5s.value = "12";
    tier5sOutput = Math.min((Number(tier5s.value) - 3) * 10000, 90000);
    if (tier5s.value < 3) tier5sOutput = 0;
    calculate();
});

upgrades?.addEventListener("input", function () {
    if (upgrades.value > 100) upgrades.value = "100";
    upgradesOutput = Math.min(Number(upgrades.value) * 100, 10000);
    calculate();
});

geraldo?.addEventListener("input", function () {
    if (geraldo.value > 100) geraldo.value = "100";
    geraldoOutput = Number(geraldo.value) * 2000;
    calculate();
});

function updateOnClick() {
    const element = document.activeElement?.tagName;
    if (tier5s.value < 3) {
        tier5s.value = "3";
        tier5sOutput = Math.min((Number(tier5s.value) - 3) * 10000, 90000);
        calculate();
    }
}

function calculate() {
    if (upgrades.value < (Number(tier5s.value) - 3) * 4) {
        document.getElementById("warning")!.innerHTML = `Additional T5s are at least 4 upgrades each`;
    } else {
        document.getElementById("warning")!.innerHTML = ``;
    }
    if (popsOutput + cashOutput < 90000) {
        popCash = popsOutput + cashOutput;
    }
    if (popsOutput + cashOutput >= 90000) {
        popCash = 90000;
    }
    let power = costsOutput + popCash + tier5sOutput + upgradesOutput + geraldoOutput;
    for (let i = 0; i < powerToDegree.length; i++) {
        if (power >= powerToDegree[i]) {
            let degree = i + 1;
            if (degree < 100) {
                document.getElementById("degree")!.innerHTML = `Degree ${degree} (${power - powerToDegree[i]}/${powerToDegree[i + 1] - powerToDegree[i]})`;
            }
            if (degree == 100) {
                document.getElementById("degree")!.innerHTML = `Degree ${degree} (${power - powerToDegree[i]}/0)`;
            }
            document.getElementById("power")!.innerHTML = `Total Power (${power}/200000)`;
            if (power > 201999) {
                document.getElementById("warning_geraldo")!.innerHTML = `You have ${Math.floor((power - 200000) / 2000)} more totems than necessary<pt>`;
            } else {
                document.getElementById("warning_geraldo")!.innerHTML = ``;
            }
        }
    }
}