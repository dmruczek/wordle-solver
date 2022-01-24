
// var reqs = {
//     positioned: [undefined, 'r', 'i'],
//     outOfPosition: [{letter: 'c', position: 3}],
//     ruledOut: ['a', 'o', 's', 'e', 'd', 'l', 'y', 'b', 'k']
// };

// var reqs = {
//     positioned: [undefined, undefined, 'o'],
//     outOfPosition: [{letter: 'l', position:1}, {letter: 'n', position:3}, {letter: 'l', position:0}],
//     ruledOut: ['a', 'r', 's', 'e', 'c', 't', 'h', 'y']
// };


var letters = ['a',
'b',
'c',
'd',
'e',
'f',
'g',
'h',
'i',
'j',
'k',
'l',
'm',
'n',
'o',
'p',
'q',
'r',
's',
't',
'u',
'v',
'w',
'x',
'y',
'z'];


function doIteration(reqs) {
    filterWords(reqs);
    return findBestWordToGuess();
}

function findBestWordToGuess() {

    let letterStats = {};


    for (let i = 0; i < letters.length; i++) {
        letterStats[letters[i]] = 0;
    }

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < 5; j++) {
            letterStats[words[i].charAt(j)]++;
        }
    }

    var bestWordScore = 0;
    var bestWord = '';

    for (let i = 0; i < words.length; i++) {
        var score = 0;
        var lettersCounted = [];
        for (let j = 0; j < 5; j++) {
            var thisLetter = words[i].charAt(j);
            if (!lettersCounted.includes(thisLetter)) {
                lettersCounted.push(thisLetter);
                score += letterStats[thisLetter];
            }
        }
        if (score > bestWordScore) {
            bestWord = words[i];
            bestWordScore = score;
        }
    }

    // console.log('Best Word: ' + bestWord);
    // console.log('Best Word Score: ' + bestWordScore);

    return bestWord;


}

function filterWords(reqs) {
    var newWords = [];
    for (let i = 0; i < words.length; i++) {
        var thisWord = words[i];
        if (wordFitsRequirements(thisWord, reqs)) {
            newWords.push(thisWord);
        }
    }
    words = newWords;

}

function wordFitsRequirements(word, reqs) {

    for (let i = 0; i < reqs.ruledOut.length; i++) {
        if (word.includes(reqs.ruledOut[i])) {
            return false;
        }
    }

    if (reqs.positioned.length > 0) {
        for (let i = 0; i < reqs.positioned.length; i++) {
            if (reqs.positioned[i] && reqs.positioned[i] !== word.charAt(i)) {
                return false;
            }
        }
    }

    if (reqs.outOfPosition.length > 0) {
        for (let i = 0; i < reqs.outOfPosition.length; i++) {
            var oopReq = reqs.outOfPosition[i];
            if (word.charAt(oopReq.position) === oopReq.letter) {
                return false;
            }
            if (!word.includes(oopReq.letter)) {
                return false;
            }
        }
    }

    return true;

}