function useCallback(callback) {
    const sentences = [1, 2, 3];
    sentences.forEach((sentence, index) => {
        setTimeout(() => callback(sentence), 500 * (index + 1)); // Delay increases with each sentence
    });
}

function callback(sentence) {
    console.log(sentence); // Print the sentence
}

// Execute useCallback with the callback as the argument
useCallback(callback);
