import React from 'react';

const Card = ({movie}) => {
    const dateFormater = (date) => {
  
      if(movie.release_date !== "" && date !== undefined) {
        // console.log(movie.release_date);
        let [yy, mm, dd] = date.split("-");
        return [dd,mm,yy].join("/");
      } else {
        return "Inconnue";
      }
    }

    const genreFinder = () => {
        let genreArray = [];

        for(let i = 0; i < movie.genre_ids.length ; i++) {
            switch(movie.genre_ids[i]) {
                case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
            }
        }
            return genreArray.map((genre) => <li key={genre}>{genre}</li>)
    }

    const addStorage = () => {
      
       let stored = window.localStorage.movies 
       ?  window.localStorage.movies.split(',')
       : [];

       stored.push(movie.id);
       window.localStorage.movies = stored;
        
        }

        const deleteStorage = () => {
          let storedData = window.localStorage.movies.split(',');
          // console.log(storedData);
          
          let newData = storedData.filter((id) => id !== movie.id);
          console.log(newData);

          window.localStorage.movies = newData;
        }

    return (
        <div className="card">
            <img 
                src={
                    movie.poster_path 
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
                    : "./img/poster.jpg"
                }
                alt='poster'
            />
            <h2 >{movie.title}</h2>
            { dateFormater ? <h5>Sorti le : {dateFormater(movie.release_date)} </h5> : "" }
            <h4>
                Note : {movie.vote_average}/10 <span role="img" aria-label='start'>⭐️</span>
            </h4> 
            <ul>
              { movie.genre_ids 
                ? genreFinder() 
                : movie.genres.map((genre, index) => 
                  <li key={index}>{genre.name}</li>
                ) 
              }
              
              </ul>
            {movie.overview ? <h3>Synopsis</h3> : ""}
            <p>{movie.overview}</p>
            {movie.genre_ids ?(

            <div className="btn" onClick={() => addStorage()} >
                Ajouter aux coups de coeur
            </div>
            ) : (
            <div className="btn" onClick={() => {
              deleteStorage();
              window.location.reload();
            }}>
                Supprimer de la liste
            </div>
            )}
        </div>
    );
};

export default Card;