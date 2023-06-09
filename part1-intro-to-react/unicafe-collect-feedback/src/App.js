import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalNumOfFeedback = good + neutral + bad

  // do not display statistics if no feedback has been given
  if (totalNumOfFeedback === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  // return statistics for display if feedback has been given
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalNumOfFeedback} />
          <StatisticLine text="average" value={((good * 1 + neutral * 0 + bad * (-1)) / (totalNumOfFeedback)).toFixed(1)} />
          <StatisticLine text="positive" value={(good / (totalNumOfFeedback) * 100).toFixed(1) + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateCount = (stateSetter, rating) => () => {
    stateSetter(rating + 1)
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <div>
        <h2>give feedback</h2>
        <Button handleClick={updateCount(setGood, good)} text="good" />
        <Button handleClick={updateCount(setNeutral, neutral)} text="neutral" />
        <Button handleClick={updateCount(setBad, bad)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
