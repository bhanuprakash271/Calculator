import React from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import PieChart from './pieChart';
import BarChart from './barChart';


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
                        <FormControl fsx={{ m: 1, width: '25ch' }} >
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id={key}
                                value={Math.round(props.amountData[key] * 100) / 100}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                disabled
                            />
                        </FormControl>
                    </Grid>
                </Grid>)
            })}
            {/* <div style={{ marginTop: "50px" }}>
                <PieChart data={props.amountData} />
            </div> */}
            <div style={{ marginTop: "50px" }}>
                <BarChart data={props.amountData} />
            </div>
        </React.Fragment>
    );
}
