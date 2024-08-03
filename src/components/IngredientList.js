import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientsCollectionRef = collection(db, 'ingredients');

    const unsubscribe = onSnapshot(ingredientsCollectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
    }, (error) => {
      console.error("Error fetching documents: ", error);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'ingredients', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {ingredients.map((ingredient, index) => (
        <Grid item xs={12} sm={6} md={4} key={ingredient.id}>
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">{ingredient.ingredient}</Typography>
              <Typography variant="body2">{ingredient.quantity}</Typography>
            </CardContent>
            <IconButton
              color="error"
              onClick={() => handleDelete(ingredient.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default IngredientList;
