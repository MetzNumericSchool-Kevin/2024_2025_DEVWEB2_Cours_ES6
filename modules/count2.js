// Une autre façon possible de faire un module réutilisable avec un état
// Qui peut être isolé à chaque fois que l'on souhaite créer, par exemple, un compteur
export default function createCounter(defaultCountValue = 0) {
    let count = defaultCountValue;

    return {
        increment() {
            count++;
        },
        decrement() {
            count--;
        },
        countValue() {
            return count;
        }
    }
}