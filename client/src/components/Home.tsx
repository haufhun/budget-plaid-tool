import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BudgetCategory from "./BudgetCategory";

export default function Home() {
  const [testBudget, setTestBudget] = useState<any>(null);
  const [nextIndex, setNextIndex] = useState(3);
  const [selectedItem, setSelectedItem] = useState<any>();

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    const response = await axios.post("http://localhost:4090/getBudget", {
      month: "2022-05",
    });
    console.log("Response: ", response);

    setTestBudget(response.data);
  };

  const addCategory = async () => {
    const response = await axios.post("http://localhost:4090/addCategory");
    console.log("Response: ", response);

    setTestBudget(response.data);
  };

  if (!testBudget) return <Typography>Loading Budget...</Typography>;

  return (
    <>
      <Container maxWidth={false}>
        <Stack direction="row" spacing={5}>
          <Box flex={1} />

          <Stack flex={7} spacing={3}>
            <BudgetCategory
              category={testBudget.income}
              selectedItemId={selectedItem?.id}
              setSelectedItem={setSelectedItem}
              nextIndex={nextIndex}
              setNextIndex={setNextIndex}
            />
            {testBudget.categories.map((c: any) => (
              <BudgetCategory
                key={c.name}
                category={c}
                selectedItemId={selectedItem?.id}
                setSelectedItem={setSelectedItem}
                nextIndex={nextIndex}
                setNextIndex={setNextIndex}
              />
            ))}

            <Button fullWidth onClick={addCategory}>
              Add Category
            </Button>
          </Stack>

          <Box flex={4}>
            <Paper elevation={5} sx={{ padding: 2 }}>
              <Button fullWidth onClick={() => setSelectedItem(null)}>
                Clear
              </Button>
              <Typography>Name: {selectedItem?.name}</Typography>
              <Typography>Planned: {selectedItem?.planned}</Typography>
              <Typography>Remaining: {selectedItem?.remaining}</Typography>

              <Typography variant="h6">Transactions</Typography>
              <Divider />
            </Paper>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
