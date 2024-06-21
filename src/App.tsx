import { useEffect, useState } from 'react'
import prisma from './client';
import './App.css'

export function sum(a: number, b: number) {
  return a + b
}



async function getMovies() {
  const response = await fetch('http://localhost:3000/');
  const movies = response.json;
  return movies
}




function App() {
  const [movie, setMovie] = useState({ title: "", description: "" })









  return (
    <>
      <label>
        Movie Title:
        <input value={movie.title} onChange={(e) => { setMovie({ ...movie, title: e.target.value }); handleNewMovie() }} />
      </label>
      <label>
        Movie Description:
      </label>
      <input />
      <button>post your movie </button>
      <div>{movies}</div>

    </>
  )
}



export default App
