import { useState, useEffect } from 'react'
import Header from './components/Header'
import MovieCard from './components/MovieCard'
import AddItemForm from './components/AddItemForm'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Завантажуємо тестові дані
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then(res => res.json())
      .then(data => {
        const formattedMovies = data.map(m => ({
          id: m.id,
          title: m.title.substring(0, 20),
          genre: "Фільм",
          poster: `https://picsum.photos/seed/${m.id}/200/300`
        }))
        setMovies(formattedMovies)
        setIsLoading(false)
      })
  }, [])

  const addMovie = (newMovie) => setMovies([newMovie, ...movies])
  const deleteMovie = (id) => setMovies(movies.filter(m => m.id !== id))

  return (
    <div className="app-container">
      <Header />
      <AddItemForm onAdd={addMovie} />
      {isLoading ? <h2>Завантаження...</h2> : (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onDelete={deleteMovie} />
          ))}
        </div>
      )}
    </div>
  )
}
export default App