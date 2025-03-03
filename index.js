function exempleAvecFetch() {
  // Etape 1 : utilisation de la méthode .then pour transmettre une fonction de rappel
  // Qui sera executée (plus tard) quand la promesse sera résolue
  fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => {
    // response est une information qui nous provient de la fonction fetch, qui est un objet
    // qui représente une réponse d'une requête HTTP

    console.log("Promesse fetch résolue");

    // Sur cet objet, on a une méthode JSON, qui nous permet de parser (traduire) le contenu de la réponse
    // Qui est du texte vers un objet JSON
    //
    // Cette méthode json() nous retourne également une promesse
    return response.json()
  }).then(function(data) {
    console.log("Promesse provenant du response.json() résolue");
    console.log(data);
    return data.abilities.thisMethodDoesNotExist(); // Je lance une erreur de manière arbitraire pour l'exemple
  }).then(function (abilities) {
    // On peut faire ce qu'on appelle du chaînage de promesse
    console.log(abilities);
    // .catch permet de capturer une erreur provenant d'une promesse
  }).catch(function (error) {
    console.log("Un soucis provenant d'une des promesses", error);
  }).finally(function () {
    console.log("Je suis exécuté quoi qu'il soit arrivé avant, succès de la promesse ou erreur.");
  });
}

// exempleAvecFetch();

// Voyons ici un exemple de création de votre propre promesse
function voyageTemporel(destination, delai) {
  // La création d'une promesse se fait par l'instanciation de l'objet (ou classe) Promise
  // Le constructeur de la promesse attend que vous lui transmettiez une fonction qui sera exécuté
  // de manière synchrone et vous transmettra deux informations :
  //    - une fonction à exécuter quand vous considérez que votre tâche s'est faite correctement
  //    - une fonction à exécuter quand vous considérez que votre tâche a échouée 
  return new Promise(function (resolve, reject) {
    console.log("Voyage temporel en cours vers... ", destination);
    // On va simuler une opération asynchrone avec setTimeout
    setTimeout(function () {
      console.log("setTimeout terminé ! Résolution de la promesse");
      
      if (Math.random() > 0.5) {
        // Ici nous considérons que notre voyage dans le temps a fonctionné
        // On résoud la promesse
        resolve(destination);
      } else {
        // Ici nous considérons que le voyage temporel à échoué
        reject("Il y avait du fromage fondue dans l'appareil !");
      }
    }, delai * 1000);
  })
}

// Dès que vous utilisez la syntaxe avec await
// Vous devez indiquer que la fonction dans laquelle vous utilisez await est asynchrone
// Avec le mot clé async
async function mainProgram() {
  console.log("Début du voyage temporel");

  voyageTemporel("Epoque romaine", 2)
    // Ici l'indentention est juste, ça évite une lecture trop lourde
    // Si on mettait ceci directement derrière la méthode ou la fonction qui retourne une Promesse
    .then(function (dest) {
      console.log("Voyage temporel terminé vers " + dest);
    })
    .catch(function (raison) {
      console.log("Un problème avec le voyage temporel ", raison)
    })

  try {
    // Syntaxe async/await sucre syntaxique pour faire exactement la même chose
    const destination = await voyageTemporel("Epoque Jurassique", 1);
    console.log(destination);
    // Dans le cas où la promesse est rejetée, une erreur est soulevée par JavaScript
    // Que vous capturez avec un try ... catch
  } catch (error) {
    console.log("Un problème avec le voyage temporel ", error)
  }
}

// mainProgram();

// JavaScript évolue avec le temps
// Et de nouvelles fonctionnalités apparaissent avec le temps
// Et aussi des syntaxes alternatives pour écrire plus rapidement
//
// Je vous donne certains exemples utiles que vous utiliserez probablement souvent
// https://quickref.me/es6.html
//
// Mais il existe beaucoup d'autres fonctionnalités modernes
//
// Ici nous voyons des syntaxes modernes ES6 (ou ES2015)
// ES = EcmaScript, qui sont les spécifications de comment doit fonctionner JavaScript
// EcmaScript a donc plusieurs versions, que les navigateurs, ou l'écosystème NodeJS se met à jour pour respecter ces spécifications
//
// Les spécifications sont décrites par l'organisation ECMA International
//
// https://fr.wikipedia.org/wiki/ECMAScript
/**
 * Interpolation de chaîne de caractères
 */
const prenom = "John";
const nom = "Doe";

// Concaténation classique avec l'opérateur +
// console.log("Bonjour " + prenom + " " + nom);

// Interpolation
// Fonctionne par l'utilisation des backticks `
// console.log(`Bonjour ${prenom} ${nom}`);

// On peut faire aussi du multi-lignes
// console.log(`
//     Bonjour
//         ${prenom} ${nom}
//             L'indentation (tab, espace, etc.) sera respectée si affichée
// `);

/**
 * Décomposition (destructuring)
 */

// Affectation par décomposition

// Exemple sans la décomposition
const tuple = ["Nikola", "Tesla"];
const first = tuple[0];
const second = tuple[1];

// Syntaxe d'affectation par décomposition
// prenom2 prendra la valeur à l'indice 0 du tableau
// nom2 prendra la valeur à l'indice 1 du tableau
const [prenom2, nom2] = tuple;

// On peut choisir les éléments que l'on souhaite décomposer du tableau
const [,color1,,color2] = ["Red", "Green", "Blue", "Purple"];
// console.log(color1, color2);

// Une autre syntaxe pour aller choisir spécifiquement des éléments d'un tableau et les affecter à des variables
const { [1]: color3, [3]: color4 } = ["Red", "Green", "Blue", "Purple"];
// console.log(color3, color4);

// La décomposition s'applique aussi aux objets

const person = {
  firstname: "Brigitte",
  name: "Macron",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
  job: {
    name: "Femme du Président",
    entreprise: "Acme Corp",
    skills: ["HTML", "CSS", "JS"],
  },
};

// Exemple sans la  décomposition
const firstname3 = person.firstname;
const lastname3 = person.name;

// Syntaxe avec la décomposition
// const { firstname, name } = person;

// Si je souhaite renommer mes variables autrement que par les clés que je décompose
const { firstname: prenom3, name: nom3 } = person;

// console.log(prenom3, nom3);

// Je peux aller décomposer en profondeur dans mes objets
const { name: personName, job } = person
const { name: jobName } = job

// console.log(personName, jobName);

// Cette décomposition en profondeur je peux la faire en une ligne
const { name: personName2, job: { name: jobName2, skills: [skillA] } } = person;

// console.log(personName, jobName2, skillA);

// La décomposition peut se faire dans les paramètres d'une fonction

// Un exemple sans la décomposition du paramètre
function fullname(person) {
  return person.firstname + " " + person.name;
}

// Avec la décomposition du paramètre
function fullname2({ firstname, name }) {
  return firstname + " " + name;
}

// console.log(fullname(person), fullname2(person));

// Il peut être intéréssant à l'avenir d'observer qu'il est parfois beaucoup
// plus pratique et lisible de travail avec un objet en paramètre d'une fonction,
// Plutôt qu'une liste de paramètres dont on ne comprend pas forcément la fonction
//

// Par exemple, nous comprenons moins bien cette utilisation :
databaseConnect(1, "FHUEIHFZUO", true)

// Que celle ci
databaseConnect({
  nbPool: 1,
  url: "FHUEIHFZUO",
  debug: true,
})

// La décomposition d'un paramètre nous permet de travailler facilement avec
// des variables locales à la fonction, comme si c'était les différents paramètres de notre fonction
function databaseConnect({ nbPool, url, debug }) {}

/**
 * Opérateur de reste ...
 */

// Il peut être intéréssant de vouloir récupérer le reste de notre décomposition

const [red, green, ...restOfColors] = ["Red", "Green", "Blue", "Purple"];

// console.log(red, green, restOfColors);

// On peut faire l'opérateur de reste sur des objets
const fruit = {
  name: "Banane",
  color: "Yellow",
  calory: 80,
  weight: 200,
  price: 1.5,
  type: "Cavendish"
}

const { name: fruitName, color: fruitColor, ...bananaInfos } = fruit;

// console.log(fruitName, fruitColor, bananaInfos);

// Nous pouvons aussi le faire sur des fonctions
function fruitInfo({ name, color, ...infos }) {
  console.log(name, color, infos);
}

// fruitInfo(fruit);

// Nous pouvons aussi utiliser cet opérateur pour récupérer le reste des paramètres
function somme(...numbers) {
  let s = 0;

  numbers.forEach(function(n) {
    s += n
  });

  return s;
};

// Exemple avec reduce (pour voir un autre algo...)
function somme2(...numbers) {
  return numbers.reduce(function(total, currentNumber) {
    return total + currentNumber;
  }, 0);
}

// console.log(
//   somme(1, 2, 5),
//   somme(1, 2, 5, 6, 9, 10)
// )

function f(param1, param2, ...restOfParam) {
  console.log(param1, param2, restOfParam);
}

// Affichera 1, 2 et [3, 4, 5]
// f(1, 2, 3, 4, 5); 

/**
 * Fonctions fléchées
 */

const multiplicationA = function (a, b) {
  return a * b;
};

// Version fléchée
const multiplicationB = (a, b) => {
  return a * b;
};

// Version fléchée avec return implicite
// Quand le corps de notre fonction ne fait qu'une seule instruction, nous pouvons ignorer les { } et le mot-clé return.
const multiplicationC = (a, b) => a * b;

// Néanmoins si nous souhaitons avoir un return implicite d'un objet, il faudra l'entourer de parenthèses dans ce cas particulier
// pour que nos {} ne soient pas considérées comme le corps de notre fonction mais bien la déclaration d'un objet
const getCoordinates = () => ({ x: 0, y: 0 });

// Même chose que d'écrire
const getCoordinates2 = () => {
  return { x: 0, y: 0 };
};

/**
 * Object shorthand syntax
 */

// Imaginons que je souhaites créer un objet à partir de variables, dont les noms sont les mêmes
// Par exemple les coordonnées x et y
function makeCoordinateObject(x, y) {
  return {
    x: x,
    y: y,
  };
}

// Dans ce cas de figure, nous pouvons écrire une syntaxe raccourcie d'assignement d'une valeur à une clé
// C'est complètement similaire à la fonction précédente
function makeCoordinateObject2(x, y) {
  return { x, y };
}

/**
 * syntaxe de dispersion (spread)
 */

// Il est possible de "disperser" le contenu d'objets ou de tableaux
// dans de nouveaux objets ou tableaux avec l'opérateur de diffusion ... (oui le même que l'opérateur de reste)

let users = ["userA", "userB", "userC"];

// Fusionner des tableaux avec la méthode concat (avant l'syntaxe de dispersion)
let newUsers = ["userD"].concat(users, ['userE', 'userF']);

// Fusionner des tableaux avec l'syntaxe de dispersion
newUsers = [
  "userD",
  ...users,
  "userE",
  "userF",
]

// Cela fonctionne aussi avec les obets
let voiture = {
  marque: "Peugeot",
  modele: "508",
  couleur: "Blanche",
}

// Un exemple avec la méthode Object.assign (avant syntaxe de dispersion)
let voiture2 = Object.assign({}, voiture, { annee: 2020, couleur: "Noir" })

// Fusionner des objets avec l'syntaxe de dispersion
voiture2 = {
  couleur: "Rose", // Cette clé va se faire écraser par "couleur: Blanche" de voiture, puis couleur: "Noir"
  ...voiture,
  annee: 2020,
  couleur: "Noir", // Ecrasement de clé, la valeur de couleur dans l'objet sera "Noir"
}

// console.log(voiture2)

const sum = (n1, n2) => n1 + n2;
const nombres = [1, 4, 7, 9];

// Sans syntaxe de dispersion
sum(nombres[0], nombres[1]);

// Avec syntaxe de dispersion
// C'est comme si nous faisions sum(1, 4)
// La fonction actuelle n'ayant que 2 paramètres, en l'état de définition de la dite fonction,
// On aura accès qu'aux deux premiers nombres du tableaux
sum(...nombres) // 1 + 4

/**
 * Les modules (import/export)
 */

//
// Vous devez mettre l'extension du fichier
// Mais dans d'autres contextes (Typescript, React, utilisation d'un bundler comme Vite, Webpack, etc.)
// Il n'est pas forcément nécéssaire de mettre l'extension
//
// Le nom de votre import par défaut est arbitraire
// import NomDuModule from CheminDuModule
// L'import par défaut ne fonctionn que si il y un export par défaut dans le module
import Calculatrice from "./modules/calculatrice.js";
// Ici on fait des imports nommés
// On choisi ce que l'on souhaite extraire de notre module
//
// Pour un export, si vous souhaitez renommé un membre de cet export
// On utilise le mot-clé "as"
import { somme as somme3, multiplication } from "./modules/calculatrice.js";

// Dans le cas où je souhaite importer tous les membres d'un module
// qui ont été exporté avec le mot-clé export (dans le cas où il n'y a pas eu d'export default)
// On peut utiliser cette syntaxe
import * as Calculatrice2 from "./modules/calculatrice.js";

Calculatrice.somme(1, 2);

somme3(1, 2);
multiplication(1, 2);

Calculatrice2.somme();

import { increment, decrement, countValue } from "./modules/count.js";

increment();
increment();
increment();

decrement();

// console.log(countValue());

import CounterBuilder from "./modules/count2.js";

const countA = CounterBuilder();
const countB = CounterBuilder(3);

countA.increment();
countB.decrement();

// console.log(
//   countA.countValue(), // 1
//   countB.countValue(), // 2
// )