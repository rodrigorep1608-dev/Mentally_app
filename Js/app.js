



// Quiz state variables
let currentQuestion = 0;
let answers = [];
let supabaseClient = null;

// Quiz questions
const questions = [
    {
        question: "😊 How would you describe your overall mood today?",
        options: [
            { text: "🌟 Very positive and energetic", value: 5 },
            { text: "😊 Generally good", value: 4 },
            { text: "😐 Neutral, neither good nor bad", value: 3 },
            { text: "😔 Somewhat low or down", value: 2 },
            { text: "😢 Very low or struggling", value: 1 }
        ]
    },
    {
        question: "😴 How has your sleep been recently?",
        options: [
            { text: "✨ Excellent, sleeping well", value: 5 },
            { text: "😌 Pretty good, mostly restful", value: 4 },
            { text: "😪 Okay, some disruptions", value: 3 },
            { text: "😵 Poor, trouble sleeping", value: 2 },
            { text: "😫 Very poor, barely sleeping", value: 1 }
        ]
    },
    {
        question: "😰 How are your stress levels?",
        options: [
            { text: "🧘 Very low, feeling relaxed", value: 5 },
            { text: "😌 Manageable", value: 4 },
            { text: "😐 Moderate stress", value: 3 },
            { text: "😓 High stress", value: 2 },
            { text: "😱 Overwhelming stress", value: 1 }
        ]
    },
    {
        question: "🤝 How connected do you feel to others?",
        options: [
            { text: "💕 Very connected and supported", value: 5 },
            { text: "😊 Generally connected", value: 4 },
            { text: "😐 Somewhat connected", value: 3 },
            { text: "😔 Feeling isolated", value: 2 },
            { text: "😞 Very isolated and alone", value: 1 }
        ]
    },
    {
        question: "⚡ How is your motivation and energy for daily activities?",
        options: [
            { text: "🚀 High energy and motivated", value: 5 },
            { text: "💪 Good energy most days", value: 4 },
            { text: "😐 Average, doing whanpm it I need to", value: 3 },
            { text: "😴 Low motivation", value: 2 },
            { text: "😞 Very low, struggling to function", value: 1 }
        ]
    }
];

// Initialize Supabase when page loads
window.addEventListener('load', function() {
    try {
        //if () {
            const SUPABASE_URL = 'https://jmaxlblmncctabomgfqw.supabase.co';
            console.log(SUPABASE_URL);
            const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYXhsYmxtbmNjdGFib21nZnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjU1MjksImV4cCI6MjA3NjcwMTUyOX0.faBQy2IyUPv8MNsDjyqs_uhVQIPlCZaVmdJP8jKD-AA";
            console.log(SUPABASE_ANON_KEY);
            console.log('jshdjsk:', supabase);
            const { createClient } = supabase;
            supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
        //} else {
        //    console.log('Supabase not loaded, quiz will work without database');
        //}
    } catch (error) {
        console.error('Error initializing Supabase:', error);
    }
});

// Start quiz
function startQuiz() {
    console.log('Starting quiz...');
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');
    currentQuestion = 0;
    answers = [];
    showQuestion();
}

// Show current question
function showQuestion() {
    console.log('Showing question', currentQuestion);
    const q = questions[currentQuestion];
    
    const counterEl = document.getElementById('questionCounter');
    const questionEl = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!counterEl || !questionEl || !optionsDiv) {
        console.error('Required elements not found');
        return;
    }
    
    counterEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = q.question;
    
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectAnswer(option, index);
        optionsDiv.appendChild(button);
    });
    
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
    updateProgressBar();
}

// Select answer
function selectAnswer(option, index) {
    console.log('Answer selected:', option);
    // Store answer with question text
    answers[currentQuestion] = {
        questionText: questions[currentQuestion].question,
        answerText: option.text,
        value: option.value
    };
    
    // Highlight selected option
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[index].classList.add('selected');
    
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }
}

// Next question
function nextQuestion() {
    console.log('Moving to next question');
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Show results
// Show results
async function showResults() {
    console.log('Showing results');
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    const totalScore = answers.reduce((sum, ans) => sum + ans.value, 0);
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    let resultCategory, resultIcon, resultTitle, resultMessage, needsSupport;
    
    if (percentage >= 80) {
        resultCategory = "Doing Great";
        resultIcon = "🌟";
        resultTitle = "You're Doing Great!";
        resultMessage = "Your responses indicate you're in a good mental health space. Keep up the positive habits and self-care practices!";
        needsSupport = false;
    } else if (percentage >= 60) {
        resultCategory = "Doing Well";
        resultIcon = "😊";
        resultTitle = "You're Doing Well";
        resultMessage = "You're managing well overall, though there may be some areas to pay attention to.";
        needsSupport = false;
    } else if (percentage >= 40) {
        resultCategory = "Some Challenges";
        resultIcon = "😐";
        resultTitle = "Facing Some Challenges";
        resultMessage = "It seems you're experiencing some difficulties. You might benefit from reaching out for support.";
        needsSupport = true;
    } else {
        resultCategory = "Need Support";
        resultIcon = "💙";
        resultTitle = "Consider Reaching Out";
        resultMessage = "Your responses suggest you may be struggling. Please know you're not alone, and support is available.";
        needsSupport = true;
    }

    // Display result on screen
    document.getElementById('resultIcon').textContent = resultIcon;
    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultMessage').innerHTML =
        `<p>${resultMessage}</p><p><strong>Your Score: ${totalScore}/${maxScore}</strong></p>`;

    // Support section (optional)
    if (needsSupport) {
        document.getElementById('supportSection').innerHTML = `
            <div class="support-box">
                <h3>📞 Support Resources</h3>
                <ul>
                    <li><strong>Crisis Hotline:</strong> Call 988 (US) or your local crisis line</li>
                    <li><strong>Text Support:</strong> Text "HELLO" to 741741</li>
                    <li><strong>Online Chat:</strong> Visit <a href="https://www.7cups.com" target="_blank">7cups.com</a></li>
                </ul>
            </div>`;
    }

    // Save to database (quiz_responses)
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    console.log('user:', user);
    console.log("supa:", supabaseClient);
    if (user && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('quiz_responses')
                .insert([{
                    user_id: user.user_id,
                    total_score: totalScore,
                    result_category: resultCategory,
                    needs_support: needsSupport,
                    emoji: resultIcon,
                    category: "Mental Health Check"
                }]);

            if (error) {
                console.error('❌ Error saving quiz response:', error);
            } else {
                console.log('✅ Quiz response saved successfully:', data);
                // Reload quiz history if on dashboard
                if (typeof loadQuizHistory === 'function') {
                    loadQuizHistory();
                }
            }
        } catch (err) {
            console.error('⚠️ Database error:', err);
        }
    } else {
        console.warn('⚠️ No user logged in or Supabase not initialized — result not saved.');
    }
}

// Check if user is logged in before allowing them to rate
function checkLoginBeforeRating() {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    
    if (user) {
        // User is logged in, redirect to rating page
        window.location.href = 'rating.html';
    } else {
        // User is not logged in, show alert and redirect to login
        alert('You must be logged in to rate the experience.');
        window.location.href = 'login.html';
    }
}

// Restart quiz
function restartQuiz() {
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    currentQuestion = 0;
    answers = [];
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

console.log('Quiz app.js loaded successfully');