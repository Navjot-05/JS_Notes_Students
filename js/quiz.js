/**
 * Student Interactive Quiz Engine
 * Renders multiple-choice questions, validates answers, gives instant feedback, and tracks score.
 */

const quizState = {
  userAnswers: {},
  score: 0,
  isFinished: false
};

document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();
});

function renderQuiz() {
  const container = document.getElementById('quiz-questions-container');
  const scoreCard = document.getElementById('quiz-score-card');
  if (!container) return;

  if (scoreCard) scoreCard.style.display = 'none';

  let html = '';
  QUIZ_QUESTIONS.forEach((q, index) => {
    html += `
      <div class="quiz-card" id="quiz-card-${q.id}">
        <div class="quiz-question-number">Question ${index + 1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-question-text">${q.question}</div>
        <div class="quiz-options" id="quiz-options-${q.id}">
    `;

    q.options.forEach((opt, optIndex) => {
      html += `
        <button class="quiz-option" onclick="handleQuizAnswer(${q.id}, ${optIndex})">
          <span style="font-weight: 700; width: 20px;">${String.fromCharCode(65 + optIndex)}.</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `;
    });

    html += `
        </div>
        <div class="quiz-explanation" id="quiz-exp-${q.id}">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function handleQuizAnswer(questionId, selectedIndex) {
  const q = QUIZ_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  // Prevent multiple answers for same question
  if (quizState.userAnswers[questionId] !== undefined) return;

  quizState.userAnswers[questionId] = selectedIndex;
  const isCorrect = selectedIndex === q.correct;
  if (isCorrect) quizState.score++;

  const optionsContainer = document.getElementById(`quiz-options-${questionId}`);
  if (!optionsContainer) return;

  const buttons = optionsContainer.querySelectorAll('.quiz-option');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    btn.style.cursor = 'default';

    if (idx === q.correct) {
      btn.classList.add('correct');
      btn.innerHTML += ' <span style="margin-left:auto;">✅ Correct</span>';
    } else if (idx === selectedIndex && !isCorrect) {
      btn.classList.add('incorrect');
      btn.innerHTML += ' <span style="margin-left:auto;">❌ Incorrect</span>';
    }
  });

  // Reveal explanation
  const expEl = document.getElementById(`quiz-exp-${questionId}`);
  if (expEl) expEl.style.display = 'block';

  // Check if all answered
  if (Object.keys(quizState.userAnswers).length === QUIZ_QUESTIONS.length) {
    showQuizResults();
  }
}

function showQuizResults() {
  quizState.isFinished = true;
  const scoreCard = document.getElementById('quiz-score-card');
  const scoreText = document.getElementById('quiz-final-score');
  const feedbackText = document.getElementById('quiz-feedback-text');

  if (!scoreCard || !scoreText) return;

  const total = QUIZ_QUESTIONS.length;
  const score = quizState.score;
  const percent = Math.round((score / total) * 100);

  scoreText.textContent = `${score} / ${total} (${percent}%)`;

  let feedback = '';
  if (percent === 100) {
    feedback = '🏆 Outstanding! You have mastered the JavaScript fundamentals!';
  } else if (percent >= 80) {
    feedback = '🌟 Great job! You have a solid understanding of JavaScript basics.';
  } else if (percent >= 60) {
    feedback = '👍 Good effort! Review the sections where you made mistakes and try again.';
  } else {
    feedback = '📚 Keep studying! Review the documentation lessons and re-take the quiz.';
  }

  if (feedbackText) feedbackText.textContent = feedback;
  scoreCard.style.display = 'block';
  scoreCard.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
  quizState.userAnswers = {};
  quizState.score = 0;
  quizState.isFinished = false;
  renderQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Quiz restarted! Good luck.');
}
