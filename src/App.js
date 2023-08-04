import {useState, useEffect} from "react";
import { movieList } from "./utils.js/movieList";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";


export default function App() {
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY

  const [movie, setMovie] = useState(null)
  
  useEffect(() => {
    
    const fetchMovie = async (searchTerm) =>{
      //* turn the search term into an array 
      const searchArr = searchTerm.split('')

      //* getting a random letter from the search array
      const idx =  Math.floor(Math.random() * searchArr.length);
      const randomMovie = searchArr[idx]

      //* a random letter is picked on every refresh of the page
      try{
        const movie = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${randomMovie}`
        );
        const data = await movie.json()
        setMovie(data)

      }catch(e){
        console.log(e)
      }
      
    }
    fetchMovie("clueless");
  }, []);
  
  const getMovie = async searchTerm => {
    try{
      //* display random movie if no search term is provided
      const movieIndx =  Math.floor(Math.random() * movieList.length);
      const randomMovie = movieList[movieIndx]

      if(searchTerm === '') {

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${randomMovie}`
        );

        const data = await response.json()
        setMovie(data)

      } else {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm }`
        );
        const data = await response.json()
        setMovie(data)
      }
    } catch(e){
      console.log(e)
    }
  }
  return (
    <div className="App">
      <Form moviesearch={getMovie}/>
      <MovieDisplay movie={movie}/>
    </div>
  );
}