let count = 0;

function increment() {
    // count += 1; ou
    count++;
}

function decrement() {
    // count -= 1; ou
    count--;
}

function countValue() {
    return count;
}

// Je peux faire des exports nommés en une seule ligne
export { countValue, increment, decrement }