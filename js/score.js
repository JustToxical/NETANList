/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let baseScore;

    // Use the new Desmos-based formula
    if (rank > 55 && rank <= 150) {
        baseScore = 56.191 * Math.pow(2, (54.147 - (rank + 3.2)) * (Math.log(60) / 99)) + 6.273;
    } else {
        // Fallback to original formula (can be adjusted for other rank ranges)
        baseScore = (-24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    let score = baseScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    score = Math.max(0, score);

    if (percent !== 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    const scale = 1;

    if (!('' + num).includes('e')) {
        return +(Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale));
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
