import React, { useState, useEffect} from "react"
import './App.css';
import MovieCard from "./MovieCard";

function App() {

  const[data, setData] = useState("")  
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState("")
  const[search, setSearch] = useState(false)
  const[bookSearchTitle, setBookSearchTitle] = useState("")
 

  const searchForBooks = () =>{
    fetch(`https://openlibrary.org/search.json?q=${bookSearchTitle.replace(' ','+')}`)
    .then((response) =>response.json())
    .then((data) => {
        let items = data.docs.splice(0,99)
        data.docs = items
        console.log(data)
        setLoading(false)
        setData(data)
    }
    ) 
      
    .then(() => setLoading(false))
  }

  const sortByTitleAscending = () =>{
    let tempData = data
    tempData.docs.sort((a, b) => (a.title > b.title) ? 1 : -1)
    setData({...data,docs:tempData.docs})
  }
  const sortByTitleDescending = () => {
    let tempData = data
    tempData.docs.sort((a, b) => (a.title > b.title) ? -1 : 1)
    setData({...data,docs:tempData.docs})
  }
  const sortByPublishedAscending = () => {
    
    let tempData = data
    tempData.docs.sort((a, b) => (a.first_publish_year < b.first_publish_year) ? -1 : 1)
    console.log(tempData)
    setData({...data,docs:tempData.docs})

  }
  const sortByPublishedDescending = () => {
    
    let tempData = data
    tempData.docs.sort((a, b) => (a.first_publish_year > b.first_publish_year) ? -1 : 1)
    setData({...data,docs:tempData.docs})
  }


  return (
    
    <div className="App">
      <div style={{textAlign:"center",background:"rgba(0,0,0,0.4)",padding:"10vh"}}>
          <h1>The Book Seeker</h1>
            <input onChange={(e) => setBookSearchTitle(e.target.value)}></input>
            <button onClick={searchForBooks}>
                search</button>

                <div>
        <div>
          <h4>Sort By Title:</h4>
          <button onClick={sortByTitleAscending}>Ascending</button>
          <button onClick={sortByTitleDescending}>Descending</button>
        </div>
        <div>
          <h4>Sort By Date:</h4>
          <button onClick={sortByPublishedAscending}>Ascending</button>
          <button onClick={sortByPublishedDescending}>Descending</button>
        </div>
      </div>
      </div>
      
      
      {data.docs !== undefined && data.docs.map((item, i) =>{
         return <MovieCard key={i}
          title={item.title}
          author = {item.author_name}
          firstPublishYear = {item.first_publish_year}
          publishDates = {item.publish_date}
          publishYears = {item.publish_year}
          isbn = {item.isbn}
          coverImage= {item.cover_edition_key}
          
          />
        })}
    </div>
  );
}

export default App;
