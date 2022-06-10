// ALL ANSWER OPTIONS
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* ALL OUR OPTIONS*/

const optionElements = document.querySelectorAll('.option');
// console.log(optionElements);
//  сам вопрос
const question = document.getElementById('question');  
// номер вопроса
const numberOfQuestion = document.getElementById('number-of-question'),
    // к-во всех вопросов
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); 

    // индекс страницы
let indexOfQuestion,
    // индекс текущего вопроса
    indexOfPage = 0;

    // обёртка для трекера
const answersTracker = document.getElementById('answers-tracker');
    // кнопка Далее 
const btnNext = document.getElementById('btn-next');
// МОДАЛЬНОЕ ОКНО
// итоговый результат викторины
let score = 0;
// к-во правильных ответов
const correctAnswer = document.getElementById('correct-answer'),
//  к-во всех вопросов в модальном окне
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
//  кнопка "начать заново"
    btnTryAgain = document.getElementById('btn-try-again');
// массив с вопросами
const questions = [
    {
        question: 'Куди у Java Script виводяться дані для перевірки та пошуку помилок ?',
        options: [
            'до масиву',
            'до офшору ',
            'до консолі',
            'до спеціального оператора',
        ],
        rightAnswer: 2
    },
    {
        question: 'Якого оператора порівняння у Java Script не існує ?',
        options: [
            'IF',
            'LOL',
            'IF Else',
            'IF Else IF',
        ],
        rightAnswer: 1
    },
    {
        question: 'У які дужки в Java Script укладаються елементи масиву ?',
        options: [
            '( )',
            '{ }',
            '< >',
            '[ ]',
        ],
        rightAnswer: 3
    }
];

// выводим к-во вопросов
numberOfAllQuestions.innerHTML = questions.length; 

// функция при инициализации страницы
const load = () => {
    // сам вопрос
    question.innerHTML = questions[indexOfQuestion].question;
    
    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    //  установка номера текущей страницы
    numberOfQuestion.innerHTML = indexOfPage + 1;
    // увеличение индекса страницы
    indexOfPage++;
};
// массив для уже заданных вопросов
let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    // console.log(randomNumber);
    //  якорь для проверки одинаковых вопросов
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    // console.log(el.target);
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

// удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    // console.log('Конец игры');
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}
const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);


btnNext.addEventListener('click', () => {
    validate();
})
// функция не запускается до загрузки сираницы
window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
