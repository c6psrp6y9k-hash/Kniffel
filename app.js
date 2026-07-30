// Sollwerte für die Bonusanzeige
const soll = [3, 6, 9, 12, 15, 18];

// Obere Felder
const obereFelder = [
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6"
];

// Untere Felder
const untereFelder = [
    "d3",
    "d4",
    "fh",
    "ks",
    "gs",
    "kn",
    "ch"
];

// Zahl lesen
function wert(id){

    const feld = document.getElementById(id);

    if(!feld) return 0;

    const text = feld.value.replace(",", ".");

    const zahl = parseFloat(text);

    if(isNaN(zahl)) return 0;

    return zahl;

}

// Speichern
function speichern(){

    const alle = document.querySelectorAll("input");

    alle.forEach(feld=>{
        localStorage.setItem(feld.id, feld.value);
    });

}

// Laden
function laden(){

    const alle = document.querySelectorAll("input");

    alle.forEach(feld=>{

        const wert = localStorage.getItem(feld.id);

        if(wert!==null){

            feld.value = wert;

        }

    });

}

// Alles berechnen
function rechnen(){

    let oben = 0;
    let unten = 0;

    let ist = 0;
    let sollPunkte = 0;

    obereFelder.forEach((id,index)=>{

        const feld = document.getElementById(id);

        if(feld.value !== ""){

            ist += wert(id);
            sollPunkte += soll[index];

        }

        oben += wert(id);

    });

    untereFelder.forEach(id=>{

        unten += wert(id);

    });

    const bonus = oben >= 63 ? 35 : 0;

    document.getElementById("oben").textContent = oben;
    document.getElementById("bonus").textContent = bonus;
    document.getElementById("gesamt").textContent = oben + bonus + unten;

    const diff = ist - sollPunkte;

    const bonusDiff = document.getElementById("bonusDiff");

    if(diff >= 0){

        bonusDiff.textContent = "+" + diff;
        bonusDiff.style.color = "green";

    }else{

        bonusDiff.textContent = diff;
        bonusDiff.style.color = "red";

    }

    speichern();

}

// Start
window.onload = function(){

    laden();

    document.querySelectorAll("input").forEach(feld=>{

        feld.addEventListener("input", rechnen);

    });

    rechnen();

};
