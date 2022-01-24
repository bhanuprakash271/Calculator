import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function TotalAmount(props) {
    return (
        <React.Fragment>

            {Object.keys(props.amountData).map(function (key) {
                return (<Grid container spacing={2} style={{ paddingTop: "20px" }}>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }} style={{ color: "black" }} gutterBottom>
                            {key}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField id={key} label="Amount" variant="outlined" value={Math.round(props.amountData[key] * 100) / 100} disabled />
                    </Grid>
                </Grid>)
            })}
        </React.Fragment>
    );
}
