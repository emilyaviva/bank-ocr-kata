const fs = require('fs')
const _ = require('lodash')

/*
  Numbers may be represented as a multiline string, from top to bottom, of three three-character strings
  The numbers look like this:
    _  _     _  _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|| |
  ||_  _|  | _||_|  ||_| _||_|

  A line of numbers is followed by an obligatory blank line.
*/

const NUMBERS = _.invert({
  "1": "   " +   
       "  |" +
       "  |",
  "2": " _ " +
       " _|" +
       "|_ ",
  "3": " _ " +
       " _|" +
       " _|",
  "4": "   " +   
       "|_|" +
       "  |",
  "5": " _ " +
       "|_ " +
       " _|",
  "6": " _ " +
       "|_ " +
       "|_|",
  "7": " _ " +
       "  |" +
       "  |",
  "8": " _ " +
       "|_|" +
       "|_|",
  "9": " _ " +
       "|_|" +
       " _|",
  "0": " _ " +
       "| |" +
       "|_|"
})

function parseSingleLine(line) {
  // Takes a single line (an array of four strings) and returns a number

  // There must be four lines of characters, the final subline must be blank, and the first three sublines must have 27 characters
  if (line.length !== 4) throw "Malformed input: the line does not have four sublines"
  if (line[3] !== "") throw "Malformed input: the last subline is not blank"
  if (line[0].length !== 27) throw "Malformed input: expected the first subline to have length 27, got " + line[0].length
  if (line[1].length !== 27) throw "Malformed input: expected the second subline to have length 27, got " + line[1].length
  if (line[2].length !== 27) throw "Malformed input: expected the third subline to have length 27, got " + line[2].length

  // Chunk the line into 3x3 arrays of strings
  const top = _.chunk(line[0], 3).map(a => a.join(''))
  const middle = _.chunk(line[1], 3).map(a => a.join(''))
  const bottom = _.chunk(line[2], 3).map(a => a.join(''))

  let output = ""

  _.times(9, i => {
    output += NUMBERS[top[i] + middle[i] + bottom[i]]
  })

  return output
}

function parseFile(file) {
  // Reads in a single file containing four-line blocks of OCR numbers and returns it

  const lines = fs.readFileSync(file).toString().split('\n')
  if (lines.length <= 0 && lines.length % 4 !== 0) throw "Malformed file: expected a number of lines divisible by 4, got " + lines.length

  return _.chunk(lines, 4).map(a => parseSingleLine(a))
}

module.exports.parseSingleLine = parseSingleLine
module.exports.parseFile = parseFile