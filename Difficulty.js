
const Difficulty = document.querySelector('.Difficulty')
const higherScore = JSON.parse(localStorage.getItem("higherScore") || [])


window.addEventListener('load', () => {

    higherScore.map((item) => {
        const name = document.createElement('span')
        name.innerText = item.name
        name.className="higherScore"
        const score = document.createElement('span')
        score.innerText = item.score
        score.classList='higherScore'
        score.classList.add("scoreBox")

        const element = document.createElement('div')
        element.appendChild(name)
        element.appendChild(score)
        element.classList="BoxScore"

        Difficulty.appendChild(element)
    })
})