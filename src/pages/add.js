// src/pages/add.js
import { useState } from 'react';
import { db } from '../lib/firebaseConfig';
import Navbar from '../components/Navbar';
import IngredientForm from '../components/IngredientForm';

const AddIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const handleIngredientAdded = async () => {
    const snapshot = await db.collection('ingredients').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setIngredients(data);
  };

  return (
    <div>
      <Navbar />
      <h1>Add Ingredients</h1>
      <IngredientForm onIngredientAdded={handleIngredientAdded} />
    </div>
  );
};

export default AddIngredients;
