import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
let marker = 0
let message = 0

const processMarker = (line: string) => {
    if (!line) return
    for (let i = 0; i < line.length; i++) {
        let substr = line.slice(i, i+4)
        const unique = new Set(substr).size

        if (unique === 4) {
            marker = i+4
            break
        }
    } 
}

const processMessage = (line: string) => {
    if (!line) return
    for (let i = 0; i < line.length; i++) {
        let substr = line.slice(i, i+14)
        const unique = new Set(substr).size

        if (unique === 14) {
            message = i+14
            break
        }
    } 
}

const readFile = async () => {
    try {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity
        })

        readlineInterface.on('line', (line) => {
            processMarker(line)
            processMessage(line)
        })

        readlineInterface.on('close', () => {
            console.log("Part one: " + marker)
            console.log("Part two: " + message)
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

