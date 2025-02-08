import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Hero {
  ID: number;
  name: string;
  superPower: string;
  humilityScore: number;
}

function App() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/superheroes')
      .then((response) => {
        setHeroes(response.data);
      })
      .catch((error) => {
        setError('There was an error fetching the heroes.');
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-4">Superheroes</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="space-y-4">
        {heroes.map((hero) => (
          <li key={hero.ID} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{hero.name}</h3>
            <p>
              <strong>Power:</strong> {hero.superPower}
            </p>
            <p>
              <strong>Humility Score:</strong> {hero.humilityScore}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
