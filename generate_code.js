// define sample function to randomly return an item in an array
function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

// define generatePassword function
function generateCode() {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = []
    collection = collection.concat(lowerCaseLetters.split(''))
    collection = collection.concat(upperCaseLetters.split(''))
    collection = collection.concat(numbers.split(''))

  // start generating password
  let code = ''
  for (let i = 1; i <= 5; i++) {
    code += sample(collection)
  }

  // return the generated password
  return code
}

module.exports = generateCode