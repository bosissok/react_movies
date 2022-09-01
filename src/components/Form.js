import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Form = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('film');
    const [sortGoodBad, setSortGoodBad] = useState("badToGood");

    useEffect(() => {
        axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=a90613881384032d9317e2eee7b6fc0e&query=${search}&language=fr-FR`
            )
            .then((res) => setMovies(res.data.results))
    }, [search])
    return (
       <div className="form-component">
           <div className="form-container">
               <form>
                   <input 
                        type="text" 
                        placeholder="Entrez le titre d'un film" 
                        id='search-input'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                   />
                    <input type='submit' value='Rechercher' />
               </form>
               <div className="btn-sort-container">
                   <div className="btn-sort" 
                        id="goodToBad" 
                        onClick={() => setSortGoodBad("goodToBad")}
                    >
                       Top<span>→</span>
                    </div>
                   <div className="btn-sort" 
                        id="badToGood" 
                        onClick={() => setSortGoodBad("badToGood")}
                    >
                       Flop<span>→</span>
                    </div>
               </div>
           </div>
           <div className="result">
                {movies
                    .slice(0,12)
                    .sort((a, b) => { 
                        if(sortGoodBad === "goodToBad") {
                            return b.vote_average - a.vote_average;
                        } else if (sortGoodBad === "badToGood") {
                            return a.vote_average - b.vote_average;
                        } else {
                            return  a.vote_average - b.vote_average;
                        }
                    })
                    .map((movie) => 
                         <Card movie={movie} key={movie.id} />
                )}
           </div>
       </div>
    ); 
};

export default Form;