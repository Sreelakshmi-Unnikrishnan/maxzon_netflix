import'./Banner.css'
import React,{useEffect, useState} from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../Constants/Constants'

function Banner()
 {
  const [Movie, setMovie] = useState()
    useEffect(()=>
    {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>
        {
            console.log(response.data.results[0])
            setMovie(response.data.results[0])
        })
    },[])
    return (
        <div style={{backgroundImage: `url(${Movie ? imageUrl+Movie.backdrop_path : ""})`}} className='banner'>
            <div className='content'>
                <br/>
            <h1 className='title'>{Movie ? Movie.name : ""}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='description'>{Movie ? Movie.overview : ""}</h1>
            </div> 
            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner