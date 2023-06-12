import React, { useState } from 'react';

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  );
};

const VoteButton = ({ selected, handleVote }) => {
  return (
    <button onClick={() => handleVote(selected)}>Vote</button>
  );
};

const Header = ({head}) => {
  console.log()
  return (
    <div>
    <h1>{head}</h1>
    </div>
  )
} 

const MostVotes = () => {
  let maxVotes = -Infinity;
  let anecdoteWithMaxVotes = null;

  for (let i = 0; i < anecdotes.length; i++) {
    if (anecdotes[i].votes > maxVotes) {
      maxVotes = anecdotes[i].votes;
      anecdoteWithMaxVotes = anecdotes[i];
    }
  }

  if (maxVotes === 0) {
    return(
      <p>No votes has been logged</p>
    )
  }
  return(
    <div>
      <p>{anecdoteWithMaxVotes.txt}</p>
      <p>Votes: {anecdoteWithMaxVotes.votes}</p>
    </div>
  )

}

const anecdotes = [
  { txt: 'If it hurts, do it more often.', votes: 0 },
  { txt: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { txt: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { txt: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
  { txt: 'Premature optimization is the root of all evil.', votes: 0 },
  { txt: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
  { txt: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
  { txt: 'The only way to go fast is to go well.', votes: 0 },
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes[selected].votes);

  const handleAnecdotes = () => {
    let number = selected
    console.log("Handling anecdotes...")
    // Laitetaa joka kerta muuttumaan se
    while (number === selected) {
      number = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(number);
    setVotes(anecdotes[number].votes);
  };

  const handleVote = (selected) => {
    console.log("Voted",selected);
    anecdotes[selected].votes += 1; 
    setVotes(anecdotes[selected].votes);
  };

  return (
    <div>
      <Header head={"Anecdote of the day" }/>
      {anecdotes[selected].txt}
      <br />
      <Button handler={handleAnecdotes} text={"Next anecdote"} />
      <br></br>
      <br></br>
      Votes: {votes}
      <br></br>
      <VoteButton selected={selected} handleVote={handleVote} />
      <Header head={"Anecdote with most votes"}/>
      <MostVotes />
    </div>
  );
};

export default App;
