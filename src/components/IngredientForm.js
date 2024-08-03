import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';  // Import Firestore
import { TextField, Button, Typography, Box } from '@mui/material';

const IngredientForm = ({ onIngredientAdded }) => {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert quantity to a number
    const parsedQuantity = parseFloat(quantity);

    // Validate that quantity is a positive number
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      console.error("Quantity must be a positive number");
      return;
    }

    try {
      // Reference to the ingredients collection
      const ingredientsCollectionRef = collection(db, 'ingredients');

      // Add a new document to the collection with a unique ID
      await addDoc(ingredientsCollectionRef, { ingredient, quantity: parsedQuantity });

      // Notify the parent component and reset the form
      onIngredientAdded();
      setIngredient('');
      setQuantity('');
    } catch (error) {
      console.error("Error adding ingredient: ", error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '16px',
        boxShadow: 3,
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Add Ingredient
      </Typography>
      <TextField
        label="Ingredient"
        variant="outlined"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        step="any"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '16px' }}
      >
        Add
      </Button>
    </Box>
  );
};

export default IngredientForm;
