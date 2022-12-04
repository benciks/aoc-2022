import * as fs from 'fs'
import * as readline from 'readline'

const fileName = 'input.txt'
let totalContained: number = 0
let totalIntersections: number = 0

const isSuperSet = (set: Set<number>, subset: Set<number>) => {
    for (const element of subset) {
        if (!set.has(element)) {
            return false
        }
    }
    return true
}

const setIntersection = (setA: Set<number>, setB: Set<number>) => {
    const intersection = new Set()
    for (const element of setB) {
        if (setA.has(element)) {
            intersection.add(element)
        }
    }
    return intersection
}

const partOne = (firstSet: Set<number>, secondSet: Set<number>) => {
    if (isSuperSet(firstSet, secondSet) || isSuperSet(secondSet, firstSet)) {
        totalContained++
    }
}

const partTwo = (firstSet: Set<number>, secondSet: Set<number>) => {
    if (setIntersection(firstSet, secondSet).size || setIntersection(secondSet, firstSet).size) {
        totalIntersections++
    }
}

const processRanges = (line: string) => {
    if (!line) return
    const sections = line.split(',')

    let firstSector = sections[0].split('-').map(i => Number(i))
    let secondSector = sections[1].split('-').map(i => Number(i))

    firstSector = [...new Array(firstSector[1] - firstSector[0]+1).keys()].map(i => i + firstSector[0])
    secondSector = [...new Array(secondSector[1] - secondSector[0]+1).keys()].map(i => i + secondSector[0])

    const firstSet = new Set(firstSector)
    const secondSet = new Set(secondSector)

    partOne(firstSet, secondSet)
    partTwo(firstSet, secondSet)
}

const readFile = async () => {
    try {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity
        })

        readlineInterface.on('line', (line) => {
            processRanges(line)
        })

        readlineInterface.on('close', () => {
            console.log('Part one: ' + totalContained)
            console.log('Part two: ' + totalIntersections)
        })
    } catch (err) {
        console.error(err)
    }
}

readFile()

