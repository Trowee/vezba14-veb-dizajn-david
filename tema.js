function setujKolacic(ime, vrednost, dani) {
    const datum = new Date();
    datum.setTime(datum.getTime() + (dani * 24 * 60 * 60 * 1000));
    const istice = "expires=" + datum.toUTCString();
    document.cookie = `${ime}=${vrednost}; ${istice}; path=/`;
}

function uzmiKolacic(ime) {
    const kolacici = document.cookie.split(';');
    for (let i = 0; i < kolacici.length; i++) {
        let k = kolacici[i].trim();
        if (k.indexOf(ime + "=") === 0) {
            return k.substring((ime + "=").length, k.length);
        }
    }
    return null;
}

function promeniTemu() {
    const link = document.getElementById("tema-stil");
    const trenutnaTema = link.getAttribute("href");
    const novaTema = trenutnaTema === "svetla.css" ? "tamna.css" : "svetla.css";
    link.setAttribute("href", novaTema);
    setujKolacic("tema", novaTema, 30);
}

function promeniFont() {
    const fontLink = document.getElementById("font-stil");
    const aktivan = fontLink.getAttribute("href") === "font.css";
    
    if (aktivan) {
        fontLink.setAttribute("href", "");
        setujKolacic("font", "normalan", 30);
    } else {
        fontLink.setAttribute("href", "font.css");
        setujKolacic("font", "povecan", 30);
    }
}

window.onload = () => {
    const sacuvanaTema = uzmiKolacic("tema");
    if (sacuvanaTema) {
        document.getElementById("tema-stil").setAttribute("href", sacuvanaTema);
    }

    const sacuvanFont = uzmiKolacic("font");
    if (sacuvanFont === "povecan") {
        document.getElementById("font-stil").setAttribute("href", "font.css");
    }
};
