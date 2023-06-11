
const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const parts = [
  {content:part1,exercises:exercises1},
  {content:part2,exercises:exercises2},
  {content:part3,exercises:exercises3}
]

const Header = (props) => {
  console.log("Header Called\n",props.course);
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Content = () => {
  console.log("Content called\n")
  const content = parts
  return (
    <div>
      <Part name={content[0].content} count={content[0].exercises}/>
      <Part name={content[1].content} count={content[1].exercises}/>
      <Part name={content[2].content} count={content[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  console.log("Parts called");
  return (
    <p>{props.name} : {props.count}</p>
  )
}

const Total = () => {
  let sum = 0;
  console.log("Total called\nstarted from",sum);

  parts.forEach(sumExercises);

  function sumExercises (item) {
    sum += item.exercises
  }
  console.log("Function sumExercises completed, sum now",sum);
  return (
    <p>Number of exercises = {sum}</p>
  )

}

const App = () => {


  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App