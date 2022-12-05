import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
const columns = 9
let crateColumns: string[][] = []
let betterCrateColumns: string[][] = []
let movePart = false

const processCrates = (line: string) => {
    if (line.startsWith('move')) return
    
    // Sort the arrays
    if (line.startsWith(' 1 ')) {
        let sortedColumns: string[][] = new Array(columns)
        for(const row of crateColumns) {
            row.forEach((element, index) => {
                if (element.startsWith(' ')) return
                if (!sortedColumns[index]) {
                    sortedColumns[index] = [element]
                    return
                }
                sortedColumns[index].push(element)
            })
        }

        crateColumns = JSON.parse(JSON.stringify(sortedColumns))
        betterCrateColumns= JSON.parse(JSON.stringify(sortedColumns))
        movePart = true
        return
    }
    const crates = []

    for (let i = 0; i < line.length; i += 4) {
        if (!line[i]) return
        crates.push(line.slice(i+1, i+2))
    }

    crateColumns.push(crates)
}

const moveCrates = (line: string) => {
    if (!line) return
    const instructions = (line.match(/\d+/g) || []).map(n => parseInt(n))

    const quantity = instructions[0]
    const from = instructions[1] - 1
    const to = instructions[2] - 1

    let arrayToBeMoved = []
    for (let i = 0; i < quantity; i++) {
        crateColumns[to].unshift(crateColumns[from][0])
        crateColumns[from].shift()

        arrayToBeMoved.push(betterCrateColumns[from][0])
        betterCrateColumns[from].shift()
    }

    betterCrateColumns[to] = arrayToBeMoved.concat(betterCrateColumns[to])
}

const getTopCrates = (columns: string[][]) => {
    let finalString = ''
    for (const column of columns) {
        finalString = finalString + column[0]
    }

    return finalString
}

const readFile = async () => {
    try {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity
        })

        readlineInterface.on('line', (line) => {
            if (movePart) {
               moveCrates(line)
               return
            }
            processCrates(line)
        })

        readlineInterface.on('close', () => {
            console.log("Part one: " + getTopCrates(crateColumns))
            console.log("Part two: " + getTopCrates(betterCrateColumns))
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

