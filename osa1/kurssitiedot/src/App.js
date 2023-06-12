// Kaikki muuttujat alla



const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

// Sama mutta toisella tavalla tehtynä.
// Muutin vaan suoraa taulukkoon ne olioiksi.
const parts = [
  {name:part1,exercises:exercises1},
  {name:part2,exercises:exercises2},
  {name:part3,exercises:exercises3}
]

const course = {
  name: 'Half Stack application development',
  parts : parts
}

const Header = (props) => {
  console.log("Header Called\n",props.course);
  console.log(props);
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Content = (props) => {
  console.log("Content called\n");
  console.log(props)
  const content = props.content
  return (
    <div>
      <Part name={content[0].name} count={content[0].exercises}/>
      <Part name={content[1].name} count={content[1].exercises}/>
      <Part name={content[2].name} count={content[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  console.log("Parts called");
  return (
    <p>{props.name} : {props.count}</p>
  )
}

const Total = (props) => {
  let sum = 0;
  const parts = props.content
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
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts}/>
    </div>
  )
}

export default App