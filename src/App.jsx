import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'


function App() {
  const [allPokes, setAllPokes] = useState([])
  const [loadPokes, setLoadPokes] = useState('https://pokeapi.co/api/v2/pokemon?limit=16')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)


  const getPokemons = async () => {
    const res = await fetch(loadPokes)
    const data = await res.json()

   setLoadPokes(data.next)
    const tempList = []

   function createPokeObject(result){
    result.forEach(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const data = await res.json()
      
      data.isClicked = false;
     tempList.push(data);
     
    if (tempList.length === result.length) {
      setAllPokes(tempList);
    }
    });
   }
   createPokeObject(data.results)
  }
  const handleCardClick = (name) => {
  setAllPokes(prevPokes => {
    const clickedCard = prevPokes.find(poke =>poke.name ===name)
    if (clickedCard.isClicked){
      alert("gameover 3asba, t3awed?")
      setScore(0)
      const resetPokes = prevPokes.map(poke => ({...poke ,isClicked : false}) )
      const reshuffledPokes = shuffleArray(resetPokes)
      return reshuffledPokes
    }
    else{
      const resetPokes = prevPokes.map(poke => poke.name===name?{...poke,isClicked:true}:poke)
      const newScore = score+1 
      setScore(newScore)
      if (newScore > highScore){
        setHighScore(newScore)
      }
      if (newScore % 16 ===0){
        getPokemons()  
      }
      const reshuffledPokes = shuffleArray(resetPokes)
      return (reshuffledPokes)
      

    }
  });
};

  useEffect(()=>{
    getPokemons()

  },[])
  useEffect(() => {
}, [allPokes])

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

  return (
    <>
    <div className="appContainer">
      <div className="info">
            
      high score: {highScore}
      <br></br>
      score: {score}

    

      </div>
    <div className="cardGrid">
      {allPokes.map(pokemon => (
        <Card
          key={pokemon.name}
          image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
          onClick={()=>handleCardClick(pokemon.name)}
        />
      ))}
    </div>
  </div>
    </>
  )
}

export default App
