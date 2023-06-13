const CalcTotal = ({parts}) => {
  //Calculates total ammount of exercies/course
  const total = parts.reduce(
    (s,p) => s + p.exercises,0
  );

  console.log("Total calculated:",total)
  return (
    <p><b>Total of {total} exercies</b></p>
  )

}

const Parts = ({parts}) => {
    console.log("Creating parts list...")
    return (
      <ul>
      {parts.map(part => 
        <li key={part.id}>{part.name} : {part.exercises}</li>)}
      </ul>
    )
  }

const Course = ({courses}) => {
  console.log("Creating course...")
  return (
    <div>
      {courses.map(course =>
      <div key={course.id}>
          <h2>{course.name}</h2>
          <Parts parts={course.parts}/>
          <CalcTotal parts={course.parts}/>
        </div>
        )}

    </div>
  )

}
  
  
  const Courses = ({courses}) => {
    console.log("Creating courses...")
    return (
      <div>
        <Course courses={courses}/>
      </div>
  
    )
  }

export default Courses;