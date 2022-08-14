import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

export default function PDFName(props) {
  const [pdfText, setPdfText] = React.useState("");

  // to set the pdf header
  const handlePdfText = (event) => {
    setPdfText(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={12}>
        <Dialog open={props.open} onClose={props.handleDialogClose}>
          <DialogContent>
            <FormControl
              variant="standard"
              sx={{ width: ["25ch", "25ch", "50ch"] }}
            >
              <InputLabel htmlFor="standard-adornment-password">
                What is this expense for ??
              </InputLabel>
              <Input
                id="outlined-name"
                label="Name"
                value={pdfText}
                onChange={handlePdfText}
                variant="standard"
                style={{ marginRight: "20px" }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.handleReport(pdfText);
              }}
              disabled={pdfText == "" ? true : false}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
