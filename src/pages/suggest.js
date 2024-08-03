// // src/pages/suggest.js
// import { useState } from 'react';
// import axios from 'axios';
import Navbar from '../components/Navbar';

// const SuggestRecipes = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFetchSuggestions = async () => {
//     if (ingredients.length === 0) return; // Avoid fetching if no ingredients

//     setLoading(true);
//     try {
//       const response = await axios.post('/api/recipes', { ingredients });
//       setRecipes(response.data.map(recipe => recipe.recipe));
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleFetchSuggestions();
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1>Suggest Recipes</h1>
//       <input
//         type="text"
//         placeholder="Enter ingredients separated by commas"
//         onChange={(e) => setIngredients(e.target.value.split(',').map(item => item.trim()))}
//         onKeyDown={handleKeyDown} // Listen for Enter key press
//         disabled={loading} // Disable input while fetching
//       />
//       <button onClick={handleFetchSuggestions} disabled={loading}>Get Recipe Suggestions</button>
//       {loading && <p>Loading...</p>}
//       <ul>
//         {recipes.map((recipe, index) => (
//           <li key={index}>
//             <h2>{recipe.label}</h2>
//             <img src={recipe.image} alt={recipe.label} width="200" />
//             <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import React, { useState } from 'react';
import axios from 'axios';
import { 
  AppBar,
  Toolbar,
  Typography,
  Container, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress,
  Box
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});


const SuggestRecipes = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchSuggestions = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/recipes', { 
        ingredients: ingredients.split(',').map(item => item.trim()) 
      });
      setRecipes(response.data.map(recipe => recipe.recipe));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Suggest Recipes
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter ingredients separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleFetchSuggestions()}
          disabled={loading}
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFetchSuggestions} 
          disabled={loading}
        >
          Get Recipe Suggestions
        </Button>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <StyledCardMedia
                  image={recipe.image}
                  title={recipe.label}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {recipe.label}
                  </Typography>
                  <Button 
                    size="small" 
                    color="primary" 
                    href={recipe.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </Button>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SuggestRecipes;