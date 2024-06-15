const url = 'https://opentdb.com/api.php?amount=10&type=multiple'
let correctAnswerIndex, data
let questionIndex = 0
let isSelected = false
let scores = 0
const divAnswers = document.querySelectorAll(".answer")
const BoxScores = document.querySelector(".BoxScores")
const questionNumber = document.querySelector(".questionNumber")
const next = document.querySelector(".next")
const finish = document.querySelector(".finish")


async function GetData() {
    const response = await fetch(url);
    const data = await response.json();
    return NewFormatData(data.results);
}

function NewFormatData(data) {
    const formatData = data.map((item) => {
        const ObjectQuestion = { 'question': item.question }
        const answers = item.incorrect_answers
        const correctIndex = Math.floor(Math.random() * 4)
        answers.splice(correctIndex, 0, item.correct_answer)
        ObjectQuestion.answers = answers
        ObjectQuestion.correctIndex = correctIndex
        return ObjectQuestion
    })
    return formatData
}
function ShowQuestion() {
    const { question, answers, correctIndex } = data[questionIndex]
    const divQuestion = document.querySelector(".question")
    divQuestion.innerText = question
    correctAnswerIndex = correctIndex
    console.log(correctAnswerIndex);

    divAnswers.forEach((element, index) => {
        element.innerText = answers[index]
        element.addEventListener("click", (e) => ClickBtn(e, index))
    });
    document.querySelector(".loading").style.display = "none"

}


function ClickBtn(e, index) {
    if (isSelected) return
    const correct = index == correctAnswerIndex ? true : false
    if (correct) {
        isSelected = true
        e.target.classList.add("correct")
        scores++
        BoxScores.innerText = scores
    }
    else {
        isSelected = true
        e.target.classList.add("incorrect")
        divAnswers[correctAnswerIndex].classList.add("correct")
    }
}
next.addEventListener('click', () => {
    console.log(questionIndex, data.length);
    if (questionIndex < data.length) {
        if (isSelected) {
            questionIndex++
            questionNumber.innerText = questionIndex + 1
            isSelected = false
            ShowQuestion()
            divAnswers.forEach((element, index) => {
                console.dir(element);
                element.classList.remove("correct", "incorrect")
            });

        }
    }
    else {
        console.log(okkkk);
        localStorage.setItem("score", scores)
        window.location.assign("/end.html")
    }
})
finish.addEventListener('click', () => {
    console.log("000000000");
    localStorage.setItem("score", scores)
    window.location.assign("/end.html")
})

window.addEventListener("load", async () => {
    data = await GetData()
    ShowQuestion()

})

