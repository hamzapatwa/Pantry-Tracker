"use client";

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Box, Stack, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { db } from './firebase'; // Ensure this path is correct

const PantryTracker = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemType, setItemType] = useState('');
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const itemTypes = [
        'Dairy', 'Veggies', 'Fruits', 'Grains', 'Proteins', 'Snacks', 'Beverages',
        'Condiments', 'Spices', 'Baking', 'Canned Goods', 'Frozen Foods', 'Household Items'
    ];

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'pantryItems'));
            const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsList);
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        if (itemName.trim() === '' || itemQuantity.trim() === '' || itemType.trim() === '') return;

        const docRef = await addDoc(collection(db, 'pantryItems'), { name: itemName, quantity: itemQuantity, type: itemType });
        setItems([...items, { id: docRef.id, name: itemName, quantity: itemQuantity, type: itemType }]);
        setItemName('');
        setItemQuantity('');
        setItemType('');
    };

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, 'pantryItems', id));
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = async (id, newQuantity) => {
        const itemDoc = doc(db, 'pantryItems', id);
        await updateDoc(itemDoc, { quantity: newQuantity });
        setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const filteredItems = items.filter(item =>
        (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Box sx={{ p: 3, bgcolor: 'lightblue', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
                    <FoodBankIcon color="primary" sx={{ fontSize: 60 }} />
                    <Typography variant="h2" color="primary">Pantry Tracker</Typography>
                </Stack>
                <Stack spacing={2} direction="row" alignItems="center">
                    <TextField
                        label="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        label="Quantity"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                        variant="outlined"
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            variant="outlined"
                        >
                            {itemTypes.map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addItem}
                        startIcon={<AddShoppingCartIcon />}
                    >
                        Add Item
                    </Button>
                </Stack>
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="outlined"
                    sx={{ mt: 3 }}
                    InputProps={{
                        startAdornment: <SearchIcon />
                    }}
                />
                <List sx={{ mt: 3 }}>
                    {filteredItems.map(item => (
                        <ListItem
                            key={item.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{
                                bgcolor: '#fff',
                                mb: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    bgcolor: '#f0f0f0'
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity}, Type: ${item.type}`}
                            />
                            <TextField
                                label="Update Quantity"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, e.target.value)}
                                variant="outlined"
                                sx={{ ml: 2 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default PantryTracker;
