import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import IngredientForm from '../components/IngredientForm';
import IngredientList from '../components/IngredientList';
import { db } from '../lib/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientAdded, setIngredientAdded] = useState(false);

  const fetchIngredients = async () => {
    try {
      const ingredientsCollectionRef = collection(db, 'ingredients');
      const snapshot = await getDocs(ingredientsCollectionRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const handleIngredientAdded = () => {
    setIngredientAdded(prev => !prev); // Toggle state to trigger list refresh
  };

  useEffect(() => {
    fetchIngredients(); // Fetch ingredients on component mount
  }, []);

  useEffect(() => {
    if (ingredientAdded) {
      fetchIngredients(); // Fetch ingredients when ingredientAdded changes
    }
  }, [ingredientAdded]);

  return (
    <div>
      <Navbar />
     <br/>

      <IngredientForm onIngredientAdded={handleIngredientAdded} />
     <br/>
      <div style={{ padding: '0 16px' }}>
      <IngredientList ingredients={ingredients} />
    </div>
     <br/>
      
    </div>
  );
};

export default Home;
