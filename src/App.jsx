import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'


function App() {
  const [allPokes, setAllPokes] = useState([])
  const [loadPokes, setLoadPokes] = useState('https://pokeapi.co/api/v2/pokemon?limit=16')

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
    setAllPokes(
      prevPokes => prevPokes.map(
        poke => poke.name===name ? {...poke,isClicked:true}:poke
      )
    )

  }
  useEffect(()=>{
    getPokemons()

  },[])
  useEffect(() => {
}, [allPokes])

console.log(allPokes)
  return (
    <>
    <div className="appContainer">
      <div className="info"></div>
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
