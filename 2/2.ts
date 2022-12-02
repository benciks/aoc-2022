import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
let totalScore: number = 0
let desiredScore: number = 0

const inputScores: { [key: string]: number } = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
}

const responseScores: { [key: string]: number } = {
    X: 1,
    Y: 2,
    Z: 3,
}

const partOne = (line: string) => {
    // Take care of the ending new line
    if (!line) return
    
    // Split strings into two substrings
    const choices = line.split(' ')

    // Draws
    if (inputScores[choices[0]] === responseScores[choices[1]]) {
        totalScore = totalScore + responseScores[choices[1]] + 3
        return
    }

    // Wins - Paper, Scissors
    if (inputScores[choices[0]] + 1 === responseScores[choices[1]]) {
        totalScore = totalScore + responseScores[choices[1]] + 6
        return
    }

    // If elf chooses scissors and we choose rock
    if (inputScores[choices[0]] - 2 === responseScores[choices[1]]) {
        totalScore = totalScore + responseScores[choices[1]] + 6
        return
    }

    // Otherwise we lost
    totalScore = totalScore + responseScores[choices[1]]
}

const partTwo = (line: string) => {
    // Take care of the ending new line
    if (!line) return
    
    // Split strings into two substrings
    const choices = line.split(' ')

    if (choices[1] === 'Y') {
        desiredScore = desiredScore + inputScores[choices[0]] + 3
    }

    if (choices[1] === 'Z') {
        if (inputScores[choices[0]] === 3) {
            desiredScore = desiredScore + 7
        } else {
            desiredScore = desiredScore + inputScores[choices[0]] + 1 + 6
        }       
    }

    if (choices[1] === 'X') {
        if (inputScores[choices[0]] === 1) {
            desiredScore = desiredScore + 3 
        } else {
            desiredScore = desiredScore + inputScores[choices[0]] - 1
        }
    }
}

const readFile = async () => {
    try {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity
        })

        // Iterate file line by line
        readlineInterface.on('line', (line) => {
            partOne(line)
            partTwo(line)
        })

        // Log the highest value on close of file
        readlineInterface.on('close', () => {
            console.log('Total score is: ' + totalScore)
            console.log('Desired score is: ' + desiredScore)
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

