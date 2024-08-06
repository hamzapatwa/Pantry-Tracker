'use client'
import { Box, Stack, Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { useEffect } from "react";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const item = ['tomato', 'maham', 'garlic aoli', 'ur mom', 'my mom', 'everyones mom'];

export default function Home() {
    useEffect(() => {
        const items = collection(firestore, 'pantry');
        console.log(items.data());
    }, []);

    return (
        <Box
            width={"100vw"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <Box border={'1px solid #333'}>
                <Box width="800px" height="100px" bgcolor="lightblue" >
                    <Typography variant="h2" color="#333" textAlign="center">
                        Pantry Items
                    </Typography>
                </Box>
                <Stack width="800px" height="600px" spacing={2} overflow="auto">
                    {item.map((i) => (
                        <Box
                            key={i}
                            sx={{
                                width: "100%",
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "white"
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="#333"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {i}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
