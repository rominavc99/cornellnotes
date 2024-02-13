import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function CardNote({ titulo, fecha }) {
  return (
    <Card
      sx={{ minWidth: 200, boxShadow: "none", backgroundColor: "transparent" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {fecha}
        </Typography>
        <Typography color="text.secondary">{titulo}</Typography>
      </CardContent>
    </Card>
  );
}
