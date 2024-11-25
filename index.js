const rows = [];
let currentQuestionIndex = -1;

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
    currentQuestionIndex = Math.floor(Math.random() * rows.length);
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

fetchData();
