function sumArray(scoresArray) {
    
    let scoresTotal = 0;
    scoresArray.forEach(score => {
        scoresTotal += score;
    });

    return scoresTotal;
}

function calculateAverage(scoresArray) {

    let gamesAverage;
    scoresArray.length == 0
        ? gamesAverage = 0
        : gamesAverage = sumArray(scoresArray) / scoresArray.length;
    
    return gamesAverage;
}

function calculateStandardDeviation(scoresArray){

    let average = calculateAverage(scoresArray);
    let squareDiff = 0;
    scoresArray.forEach(score => {
            squareDiff += (score - average) ** 2;
    });
    
    let gamesStandardDeviation;
    scoresArray.length === 0
        ? gamesStandardDeviation = 0
        : gamesStandardDeviation = Math.sqrt(squareDiff / scoresArray.length);

    return gamesStandardDeviation;
}

export { calculateAverage, calculateStandardDeviation, sumArray }