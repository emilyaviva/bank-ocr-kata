const parser = require("./ocr-parser")

test(`The input test file produces the following five lines:
  000000000
  123456789
  987654321
  420987198
  999999999`, () => {
  expect(parser.parseFile("./test-data.txt")).toStrictEqual(["000000000", "123456789", "987654321", "420987198", "999999999"])
})

test(`The input string
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|

returns 123456789`, () => {
  const input = ['    _  _     _  _  _  _  _ ', '  | _| _||_||_ |_   ||_||_|', '  ||_  _|  | _||_|  ||_| _|', '']
  expect(parser.parseSingleLine(input)).toBe("123456789")
})