const Header = ({courseName}) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

const Part = ({partName, numOfExercises}) => {
  return (
      <p>{partName} {numOfExercises}</p>
  )
}

const Content = ({courseParts}) => {
  return (
    <div>
      <Part partName={courseParts[0].name} numOfExercises={courseParts[0].exercises}/>
      <Part partName={courseParts[1].name} numOfExercises={courseParts[1].exercises}/>
      <Part partName={courseParts[2].name} numOfExercises={courseParts[2].exercises}/>
    </div>
  )
}

const Total = ({courseParts}) => {
  const totalNum = courseParts[0].exercises + courseParts[1].exercises + courseParts[2].exercises

  return (
    <div>
      <p>Number of exercises {totalNum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content courseParts={course.parts}/>
      <Total courseParts={course.parts}/>
    </div>
  )
}

export default App
