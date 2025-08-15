/**
 * Numbers of decimal digits to round to
 */
const scale = 2;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (percent > 100) percent = 100;
    if (percent < minPercent) return 0;

    let baseScore;

    // Piecewise formula (1 ≤ rank ≤ 150)
    if (rank >= 1 && rank <= 3) {
        baseScore = (-18.2899079915 * rank) + 368.2899079915;
    } else if (rank > 3 && rank <= 20) {
        baseScore = ((326.1 * Math.exp(-0.0871 * rank)) + 51.09) * 1.037117142;
    } else if (rank > 20 && rank <= 35) {
        baseScore = ((250 - 83.389) * Math.pow(1.0099685, 2 - rank) - 31.152) * 1.0371139743;
    } else if (rank > 35 && rank <= 55) {
        baseScore = 1.0371139743 * ((212.61 * Math.pow(1.036, 1 - rank)) + 25.071);
    } else if (rank > 55 && rank <= 100) {
        baseScore = 1.03905131 * ((185.7 * Math.exp(-0.02715 * rank)) + 14.84);
    } else {
        // Fallback formula (outside defined range)
        baseScore = 0;
    }

    // Apply percent-based scaling
    let scaledScore = baseScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    scaledScore = Math.max(0, scaledScore);

    if (percent !== 100) {
        return round(scaledScore - scaledScore / 3);
    }

    return round(scaledScore);
}

export function round(num) {
    const scale = 2;

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
