import { useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки
    
    if (!title.trim()) {
      alert("Будь ласка, введіть назву фільму");
      return;
    }

    // Створюємо новий об'єкт фільму
    const newMovie = {
      id: Date.now(), // Унікальний ID на основі часу
      title: title,
      genre: "Додано користувачем",
      poster: `https://picsum.photos/seed/${Math.random()}/200/300`
    };

    onAdd(newMovie); // Передаємо фільм у головний стан (App.jsx)
    setTitle('');    // Очищаємо поле після додавання
  };

  return (
    <section style={{ textAlign: 'center', marginBottom: '30px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <input 
          type="text" 
          placeholder="Назва нового фільму..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ 
            padding: '10px', 
            borderRadius: '5px 0 0 5px', 
            border: 'none', 
            width: '250px' 
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            borderRadius: '0 5px 5px 0', 
            border: 'none', 
            backgroundColor: '#ff4757', 
            color: 'white', 
            cursor: 'pointer' 
          }}
        >
          Додати
        </button>
      </form>
    </section>
  );
}