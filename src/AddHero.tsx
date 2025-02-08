import {useState } from 'react';
import axios from 'axios';

function AddHero() {
  const [name, setName] = useState('');
  const [superPower, setSuperPower] = useState('');
  const [humilityScore, setHumilityScore] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !superPower || !humilityScore) {
      setError('All fields are required');
      return;
    }

    if ( humilityScore < 0 || humilityScore > 10) {
      setError('Humility score must be between 0 and 10');
      return;
    }


    // Attempt to send a POST request to add a new superhero; 
    // if successful, update the success state and reset the form, 
    // else display an error message.
    try {
      const heroData = {
        name,
        superPower,
        humilityScore: humilityScore
      };

      const response = await axios.post('http://localhost:3000/superheroes', heroData);
      setSuccess(response.data);
      setError(null); 
      setName('');
      setSuperPower('');
      setHumilityScore(0);
    } catch (error) {
      setError('Error adding superhero');
      setSuccess(null);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Add New Superhero</h2>
      
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Super Power</label>
          <input
            type="text"
            value={superPower}
            onChange={(e) => setSuperPower(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Humility Score (0-10)</label>
          <input
            type="number"
            value={humilityScore}
            onChange={(e) => setHumilityScore(Number(e.target.value))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            min="0"
            max="10"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Superhero
        </button>
      </form>
    </div>
  )
}

export default AddHero;
