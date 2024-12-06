const scores = {
  Red: 0,
  Blue: 0,
  Green: 0,
  Yellow: 0,
}

const OpeningCeremony = (callback) => {
  console.log('Welcome to the Sports Day!')

  setTimeout(() => {
    console.log("Let's the games begin!")
    callback(Race100M)
  }, 1000)
}

const Race100M = (callback) => {
  console.log('\nEvent: 100m Race')
  const raceTimes = {
    Red: Math.random() * 10 + 10,
    Blue: Math.random() * 10 + 10,
    Green: Math.random() * 10 + 10,
    Yellow: Math.random() * 10 + 10,
  }
  const sorted = Object.entries(raceTimes).sort((a, b) => a[1] - b[1])
  scores[sorted[0][0]] += 50
  scores[sorted[1][0]] += 25

  console.log('Race Times:', raceTimes)
  console.log('Updated Scores after 100m Race:', scores)

  setTimeout(() => {
    callback(LongJump)
  }, 1000)
}

const LongJump = () => {
  console.log('\nEvent: Long Jump')

  const colors = Object.keys(scores)
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  scores[randomColor] += 30

  console.log(`${randomColor} wins the Long Jump!`)
  console.log('Updated Scores after Long Jump:', scores)

  setTimeout(() => {
    callback(HighJump)
  }, 1000)
}

const HighJump = () => {
  console.log('\nEvent: High Jump')
  setTimeout(() => {
    const userInput = prompt(
      'Enter the color that had the highest jump (Red, Blue, Green, Yellow):'
    )
    if (userInput && scores[userInput]) {
      scores[userInput] += 20
      console.log(`${userInput} awarded 20 points for High Jump!`)
    } else {
      console.log('No color selected or invalid input. No points awarded.')
    }

    console.log('Updated Scores after High Jump:', scores)
    callback(AwardCeremony)
  }, 1000)
}

const AwardCeremony = () => {
  console.log('\nEvent: Award Ceremony')
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]) // Sort scores descending
  console.log('Final Scores:', scores)
  console.log('Winners:')
  sortedScores.forEach(([color, score], index) => {
    console.log(`${index + 1}. ${color}: ${score} points`)
  })
}
