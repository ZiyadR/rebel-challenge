import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from 'react-query'
import Splash from "./components/Splash";

const Artists = lazy(() => import("./pages/Artists"));
const ImportArtists = lazy(() => import("./pages/ImportArtists"));


const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'teal', components: ['Button', 'Switch', 'Badge'], }),
  {
    components: {
      FormLabel: {
        baseStyle: {
          color: "gray.500",
        }
      }
    },
  });

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Splash />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Artists />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/import-artists" element={<ImportArtists />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
