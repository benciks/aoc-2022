import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
let perElfCalories: number[] = []
let totalCalories: number[] = []

const processCalories = (line?: string) => {
    // If empty line -> next elf, sum the values
    if (!line) {
        // Temporary variable for getting the sum
        let sumCalories: number = 0

        for(const value of perElfCalories) {
            sumCalories = sumCalories + value
        }

        // We fill array with sums of calories for each elf separately
        totalCalories.push(sumCalories)

        // Empty our array
        perElfCalories = []
        return
    }

    // Otherwise fill array with the values
    perElfCalories.push(parseInt(line))
}

const getHighestValues = () => {
    // Sort array in descending order
    let sortedTotal = totalCalories.sort((a,b) => b - a)

    // Reduce the array to first 3 elements
    sortedTotal = sortedTotal.slice(0, 3);

    let totalSum: number = 0;

    for (const value of sortedTotal) {
        totalSum = totalSum + value
    }

    return {
        first: sortedTotal[0],
        topThree: totalSum
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
            processCalories(line)
        })

        // Log the highest value on close of file
        readlineInterface.on('close', () => {
            const { first, topThree } = getHighestValues()
            console.log('The elf that carries the most has: ' + first + ' calories')
            console.log('Top three elves have sum of calories: ' + topThree)
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

