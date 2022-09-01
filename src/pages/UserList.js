import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';
import Card from '../components/Card';


const UserList = () => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        let moviesId = window.localStorage.movies 
        ? window.localStorage.movies.split(",")
        : [];
        for(let i = 0; i < moviesId.length; i++) {
            axios
            .get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`)
                .then((res) => setListData((listData) => [...listData, res.data]));
        }
    }, []);
    return (
        <div className='user-list-page'>
            <Header />
            <h2>Coup de coeur 
                <span role="img" aria-label='coeur'> 💖</span>
            </h2>
            <div className="result">
               {listData.length > 0 ? (
                   listData.map((movie, index) => <Card movie={movie} key={index}/>)
               ) : ( 
                    <h2>Aucun favoris pour le moment</h2>
               )}
            
            </div>
        </div>
    );
};

export default UserList;