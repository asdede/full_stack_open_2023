import { useState } from 'react'

const Header = (props) => {
  console.log("Header created\n",props.txt);
  return (
    <div>
      <h1>{props.txt}</h1>
    </div>
  )
}

const Button = ({handler,text}) => {
  console.log("Button created");
  console.log(handler,text);
  return (
    <button onClick={handler}>
      {text}
    </button>
  )

}

const SetStats = (props) => {
  console.log("Statistics:");
  console.log(props);
  if ((props.pos + props.neg + props.net) == 0){
    return (
      <p>No feedback given</p>
    )
  }
  const advStats = AdvancedStats(props)
  console.log(advStats)

  return (
    <table>
      <tbody>
        <tr>
          <td>Positive: &emsp;</td>
          <td>{props.pos}</td>
        </tr>
        <tr>
          <td>Neutral: &emsp;</td>
          <td>{props.net}</td>
        </tr>
        <tr>
          <td>Negative: &emsp;</td>
          <td>{props.neg}</td>
        </tr>
        <tr>
          <td>All: &emsp;</td>
          <td>{advStats.all}</td>
        </tr>
        <tr>
          <td>Average: &emsp;</td>
          <td>{advStats.avg}</td>
        </tr>
        <tr>
          <td>Positives: &emsp;</td>
          <td>{advStats.percent} %</td>
        </tr>
      </tbody>
    </table>
  )

}

const AdvancedStats = (props) => {
  let negSum = props.neg * -1
  console.log("Calculating advanced stats with variables:")
  console.log(props.pos,negSum,props.net)
  let all = (props.pos + props.neg + props.net);
  let avg = Number((props.pos + negSum) / all).toFixed(2);
  console.log("All",all,"Avg",avg);
  let posPercent = Number((props.pos * 100)/all).toFixed(2)
  console.log("Percentage of positives =",posPercent)
  return {all:all,
          avg:avg,
          percent:posPercent}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlePosClick = () => {
    console.log("clicked 'good', good before",good)
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    console.log("Neutral clicked");
    setNeutral(neutral + 1);
  }
  
  const handleBadClick = () => {
    console.log("Bad clicked")
    setBad(bad + 1)
  }

  return (
    <div>
      <Header txt={"Give Feedback"}/>
      <Button handler={handlePosClick} text={"positive"}/>
      <Button handler={handleNeutralClick} text={"neutral"} />
      <Button handler={handleBadClick} text={"negative"}/>
      <Header txt={"Statistics"}/>
      <SetStats pos={good} net={neutral} neg={bad}/>

    </div>
  )
}

export default App;
