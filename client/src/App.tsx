import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";
import AppLayout from "./components/AppLayout";
import PlaidTest from "./components/PlaidTest";
import SimpleTest from "./components/SimpleTest";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route
              path="/"
              element={<Typography variant="h3">Welcome!</Typography>}
            /> */}
            <Route path="/" element={<PlaidTest />} />
            <Route path="/simpleTest" element={<SimpleTest />} />
            <Route path="/accounts" element={<Accounts />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
