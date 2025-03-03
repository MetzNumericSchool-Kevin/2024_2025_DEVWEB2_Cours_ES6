console.log("Execution du fichier Calculatrice.js")

// Tout ce qui n'a pas été exporté dans un module
// (ou exposé à l'aide d'une fonction)
// Ne sera pas accessible à l'extérieur de ce module
//
// Nous avons donc une forme d'encapsulation (globale dans ce cas)
const unNombre = 2;

// Le mot clé export permet d'exporter de manière isolée
// Une fonction, ou une variable, etc.
export function somme(a, b) {
    return a + b;
}

export function multiplication(a, b) {
    return a * b;
}

export function soustraction(a, b) {
    return a - b;
}

// J'exporte, par défaut un objet contenant toutes mes fonctions
// Un seul export par défaut par fichier
// L'export par défaut n'est pas obligatoire, c'est un choix
export default {
    somme,
    multiplication,
    soustraction
}