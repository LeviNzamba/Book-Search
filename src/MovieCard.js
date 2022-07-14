import React from 'react'
import nophoto from './nophoto.jpg'
const MovieCard = (props) => {
  return (
    <div style={{margin:"10vh 1vw",padding:'2%',border:"1px solid black",borderRadius:"5px"}}>
        {props.coverImage  !== undefined &&

          <span>
            <img src={"https://covers.openlibrary.org/b/olid/" + props.coverImage  + "-L.jpg"} alt={props.title} width="200"/>

          </span>
        }
        {props.coverImage === undefined &&
      
            <span>
            <img src={nophoto} alt={props.title} width="200"/>

          </span>
        }
        <h5>Title: {props.title}</h5>
        <h5>Author: {props.author}</h5>
        
       <h5>Original Publish Date: {props.firstPublishYear}</h5>

        
        {props.publishDates !== undefined &&
            <div>
              <h5>Other Publish Dates: </h5>
              {props.publishDates.map((date, i) => <span>
                  <span>{date}, {props.publishYears[i]}. </span>
                </span>
              )
              }
            </div>
         
       
        }
    </div>
  )
}


export default MovieCard;