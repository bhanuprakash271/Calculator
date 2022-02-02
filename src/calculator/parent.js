import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NameList from './nameList';
import TotalAmount from './totalAmount';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Parent() {

    const [countList, setCountList] = React.useState([0]);
    const [priceList, setPriceList] = React.useState([]);
    const [amountList, setAmountList] = React.useState({
        Rajeev: 0.00,
        Nandhan: 0.00,
        Shreyas: 0.00,
        Tirth: 0.00,
        Bhanu: 0.00,
    });

    const handlePrice = (value, isDone) => {
        let dummyList = [...priceList];
        dummyList.push(value)
        setPriceList(dummyList);
        if (!isDone) {
            let dummyCountList = [...countList]
            let newValue = dummyCountList.length + 1;
            dummyCountList.push(newValue);
            setCountList(dummyCountList);
        }
    }

    const handleAmount = () => {
        let dummyData = { ...amountList };
        priceList.forEach(price => {
            Object.keys(price).forEach(item => {
                dummyData[item] = dummyData[item] + price[item];
            })
        })
        setAmountList(dummyData);
        var elmnt = document.getElementById('card');
        elmnt.scrollIntoView();
    }




    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card style={{ margin: "10px", backgroundColor: "aliceblue" }} id="card">
                        <CardContent>
                            <Typography sx={{ fontSize: 16, fontWeight: "bold" }} style={{ color: "black" }} gutterBottom>
                                {`Total Amount`}
                            </Typography>
                            <TotalAmount amountData={amountList} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card style={{ margin: "10px", backgroundColor: "antiquewhite" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16, fontWeight: "bold" }} style={{ color: "black" }} gutterBottom>
                                {`Calculate Fare`}
                            </Typography>
                            {countList.map((item, index) => {
                                return <NameList handleAmountChange={handleAmount} handleAdd={handlePrice} lastValue={countList.length == index + 1} />
                            })}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
