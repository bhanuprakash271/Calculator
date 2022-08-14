import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Parent from "./parent";

export default function Apartment() {
  const [apt, setApt] = React.useState(null);

  const handleApt = (value) => {
    setApt(value);
  };

  return (
    <React.Fragment>
      {apt != null ? (
        <Parent selectedApt={apt} />
      ) : (
        <marquee style={{ color: "#040805", fontSize: "25px" }}>
          Please contact for any changes.
        </marquee>
      )}
      {apt == null ? (
        <Grid container spacing={2}>
          <Grid item xs={0} md={3} align="center"></Grid>
          <Grid item xs={12} md={6} align="center">
            <Card
              style={{ margin: "10px", backgroundColor: "#3F4641" }}
              id="card"
            >
              <CardContent>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#C8CAB8",
                  }}
                  gutterBottom
                >
                  Select Apartment
                </Typography>
              </CardContent>
              <div>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#309755",
                    color: "white",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    handleApt(0);
                  }}
                >
                  Arden
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#309755",
                    color: "white",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    handleApt(1);
                  }}
                >
                  Tivoli
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xs={0} md={3} align="center"></Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
