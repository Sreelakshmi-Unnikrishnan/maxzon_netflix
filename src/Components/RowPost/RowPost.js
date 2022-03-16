import React,{useState,useEffect} from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, imageUrl } from '../../Constants/Constants'
import Youtube from 'react-youtube'

function RowPost(props) {
    const [movies, setmovies] = useState([])
     const [urlid, seturlid] = useState('')
   useEffect(() => {
       axios.get(props.url).then(response=>
       {
         console.log(response.data)
         setmovies(response.data.results)
       }).catch(Error=>
        {
            alert('network error')
        })
   }, [])
   const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handlemovie = (id) =>
  {
        console.log(id)
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>
            {
                console.log(response.data)
                if(response.data.results.length !==0)
                {
                    seturlid(response.data.results[0])
                }
                else
                {
                    console.log('Array empty')
                }
            })
  }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj)=>
                

                <img onClick={()=>handlemovie(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl+obj.backdrop_path}`}/>
                )}
            </div>
            {urlid && <Youtube opts={opts} videoId={urlid.key}/>}
        </div>
    )
}

export default RowPost
