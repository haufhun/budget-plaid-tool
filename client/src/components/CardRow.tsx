import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack, TextField } from "@mui/material";

export default function CardRow(props: any) {
  const { incomeItem } = props;

  return (
    <Card>
      <CardActionArea>
        <Stack direction="row" justifyContent="space-between" sx={{ px: 2 }}>
          <Box flex={3}>
            <TextField size="small" value={incomeItem.name} />
          </Box>
          <Box
            flex={1}
            sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <TextField
              size="small"
              sx={{ alignSelf: "flex-end" }}
              value={`$${incomeItem.planned.toFixed(2)}`}
            />
          </Box>
          <Box flex={1}>
            <Typography sx={{ textAlign: "right" }}>
              ${incomeItem.received.toFixed(2)}
            </Typography>
          </Box>
        </Stack>

        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
