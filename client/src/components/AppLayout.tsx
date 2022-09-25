import { AppBar, Box, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1, pb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Link
                component={RouterLink}
                to="/"
                variant="h5"
                color="inherit"
                underline="none"
              >
                Budgeting
              </Link>

              <Link
                component={RouterLink}
                to="/accounts"
                color="inherit"
                underline="none"
              >
                Accounts
              </Link>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Typography>
              Welcome to Budget Plaid Tool, an HTS Product
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}

export default AppLayout;
