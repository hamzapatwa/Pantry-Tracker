import { Box, Stack } from "@mui/material";

const item = ['tomato', 'maham', 'garlic aoli'];

export default function Home() {
  return (
      <Box
          width={"100vw"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
      >
        <Stack width="800px" height="600px" spacing={2}>
          {item.map((i) => (
              <Box
                  key={i}
                  width={"100vw"}
                  height={"100vh"}
                  display={"flex"}
                  justifyContent={"center"}
                  bgcolor={"white"}
              >
                {i}
              </Box>
          ))}
        </Stack>
      </Box>
  );
}
