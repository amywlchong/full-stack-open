const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const errorLogger = (...params) => {
  console.error(...params)
}

module.exports = {
  info, errorLogger
}
