// src/pages/list.js
import { useState, useEffect } from 'react';
import { db } from '../lib/firebaseConfig';
import Navbar from '../components/Navbar';
import IngredientList from '../components/IngredientList';

const ListIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const snapshot = await db.collection('ingredients').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const handleDelete = async (id) => {
    await db.collection('ingredients').doc(id).delete();
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  return (
    <div>
      <Navbar />
      <h1>List Ingredients</h1>
      <IngredientList ingredients={ingredients} onDelete={handleDelete} />
    </div>
  );
};

export default ListIngredients;
