const rows = [];
let currentQuestionIndex = -1;
const usedIndexes = new Set();

async function fetchData() {
    try {
        const response = await fetch('https://mlx-prep.12v.workers.dev/');
        const data = await response.json();
        transformData(data);
        displayNextQuestion();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function transformData(data) {
    console.log(data.values);
    data.values.forEach((row) => {
        rows.push({
            stage: row[0],
            question: row[1],
            answer: row[2] || "[No answer yet]"
        });
    });
}

function displayNextQuestion() {
    if (usedIndexes.size === rows.length) {
        document.getElementById('content').innerHTML = `
            <p style="font-size:18px; padding:10px;">You have gone through all the questions!</p>
            <button id="resetButton" style="display:block; width:100%; padding:10px; font-size:16px;">Start Over</button>
        `;
        document.getElementById('resetButton').addEventListener('click', resetQuestions);
        return;
    }

    do {
        currentQuestionIndex = Math.floor(Math.random() * rows.length);
    } while (usedIndexes.has(currentQuestionIndex));

    usedIndexes.add(currentQuestionIndex);

    const question = rows[currentQuestionIndex].question.replace(/\n/g, '<br>');
    const answer = rows[currentQuestionIndex].answer.replace(/\n/g, '<br>');
    document.getElementById('content').innerHTML = `
        <button id="nextButton" style="display:block; width:100%; padding:10px; font-size:16px;">Next Question</button>
        <p style="font-size:18px; padding:10px;">${question}</p>
        <button id="revealButton" style="display:block; width:100%; padding:10px; font-size:16px;">Reveal</button>
        <p id="answer" style="display:none; font-size:18px; padding:10px;">${answer}</p>
    `;
    document.getElementById('revealButton').addEventListener('click', revealAnswer);
    document.getElementById('nextButton').addEventListener('click', displayNextQuestion);
}

function revealAnswer() {
    document.getElementById('answer').style.display = 'block';
}

function resetQuestions() {
    usedIndexes.clear();
    displayNextQuestion();
}

fetchData();
