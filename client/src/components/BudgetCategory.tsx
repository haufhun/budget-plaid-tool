import {
  Button,
  Paper,
  Stack,
  Box,
  Typography,
  Card,
  CardActionArea,
  TextField,
} from "@mui/material";
import { useState } from "react";

type CategoryItem = {
  id: string;
  name: string;
  planned: number;
  remaining: number;
  spent?: number;
};

export default function BudgetCategory(props: any) {
  const { category, selectedItemId, setSelectedItem, nextIndex, setNextIndex } =
    props;

  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>(
    category.items
  );

  const addCategory = () => {
    setCategoryItems([
      ...categoryItems,
      {
        id: nextIndex.toString(),
        name: "",
        planned: 0,
        remaining: 0,
      },
    ]);

    setNextIndex(nextIndex + 1);
  };

  return (
    <Paper elevation={5}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ pt: 5, px: 2, pb: 2 }}
      >
        <Box flex={3}>
          <Typography width="100%">{category.name}</Typography>
        </Box>
        <Box flex={1}>
          <Typography sx={{ textAlign: "right" }}>Planned</Typography>
        </Box>
        <Box flex={1}>
          <Typography sx={{ textAlign: "right" }}>Remaining</Typography>
        </Box>
      </Stack>

      <Stack>
        {categoryItems.map((categoryItem) => (
          <Card
            key={categoryItem.id}
            raised={selectedItemId === categoryItem.id}
          >
            <CardActionArea
              sx={{ paddingY: 2 }}
              onClick={() => setSelectedItem(categoryItem)}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ px: 2 }}
                spacing={2}
              >
                <Box flex={3}>
                  <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    value={categoryItem.name}
                    disabled={selectedItemId !== categoryItem.id}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    size="small"
                    variant="filled"
                    inputProps={{ style: { textAlign: "right" } }}
                    value={`$${categoryItem.planned.toFixed(2)}`}
                    disabled={selectedItemId !== categoryItem.id}
                  />
                </Box>
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Typography align="center" sx={{ textAlign: "right" }}>
                    ${categoryItem.remaining.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      {/* Card Footer */}
      <Box sx={{ px: 2, pt: 3, pb: 1 }}>
        <Button onClick={addCategory}>Add Item</Button>
      </Box>
    </Paper>
  );
}
