import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
const lowerCaseAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
const upperCaseAlphabet = lowerCaseAlphabet.map(i => i.toUpperCase())
let priority: { [key:string]: number } = {
    first: 0,
    class: 0,
}
let classArr: string[] = []

const countPriority = (letter: string, type: string) => {
    // Calculate priority
    let letterIndex = lowerCaseAlphabet.indexOf(letter)

    // If index is -1 => uppercase
    if (letterIndex === -1) {
        letterIndex = upperCaseAlphabet.indexOf(letter) + 26
    }

    letterIndex++
    priority[type] = priority[type] + letterIndex
}

const partOne = (line: string) => {
    // Take care of the ending new line
    if (!line) return

    const firstCompartment = line.slice(0, line.length/2)
    const secondCompartment = line.slice(line.length/2, line.length)
    let sharedItem: string = ''

    for(const letter of firstCompartment) {
        if (secondCompartment.includes(letter)) {
            sharedItem = letter
        }
    }

    countPriority(sharedItem, 'first')
}

const partTwo = (line: string) => {
    let classItem: string = ''

    if (classArr.length === 3) {
        for(const letter of classArr[0]) {
            if (classArr[1].includes(letter) && classArr[2].includes(letter)) {
                classItem = letter
            }
        }
        
        countPriority(classItem, 'class')
        classArr = []
    }

    classArr.push(line)
}

const readFile = async () => {
    try {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity
        })

        readlineInterface.on('line', (line) => {
            partOne(line)
            partTwo(line)
        })

        readlineInterface.on('close', () => {
            console.log('Priority sum is: ' + priority.first)
            console.log('Class sum is: ' + priority.class)
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

