import Chart from 'chart.js/auto';

/**
 * Function to compute the score based on the new formula
 * @param {Number} rank Position on the list
 * @returns {Number}
 */
function computeScore(rank) {
    if (rank > 150) return 0;
    if (rank > 75) return 6.273 + 56.191 * Math.pow(2, (54.147 - (rank + 3.2)) * (Math.log(50) / 99));
    if (rank > 55) return 212.61 * Math.pow(1.036, 1 - rank) + 25.071;
    if (rank > 35) return 166.611 * Math.pow(1.0099685, Math.pow(2, -rank)) - 31.152;
    return 149.61 * Math.pow(1.168, 1 - rank) + 100.39;
}

const ranks = Array.from({ length: 151 }, (_, i) => i);
const scores = ranks.map(computeScore);

const ctx = document.getElementById('scoreChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ranks,
        datasets: [{
            label: 'Score vs Rank',
            data: scores,
            borderColor: 'blue',
            fill: false,
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Rank' } },
            y: { title: { display: true, text: 'Score' } }
        }
    }
});

