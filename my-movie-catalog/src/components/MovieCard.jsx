export default function MovieCard({ movie, onDelete }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <button onClick={() => onDelete(movie.id)}>Видалити</button>
    </div>
  )
}