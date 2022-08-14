import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CalculateFare from "./calculateFare";
import TotalAmount from "./totalAmount";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getAmountNames } from "./constants";
import Report from "./report";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Parent(props) {
  const [countList, setCountList] = React.useState([0]);
  const [priceList, setPriceList] = React.useState([]);
  const [amountList, setAmountList] = React.useState({ ...getAmountNames(props.selectedApt) });
  const [done, setDone] = React.useState(false);
  const [compute, setCompute] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [report, setReport] = React.useState(false);
  const [itemList, setItemList] = React.useState([]);

  // to set done and edit values
  const handleDone = (value) => {
    if (value == false) {
      setEdit(true);
    }
    setDone(value);
  };

  // to store the calculation data after adding every new item
  const handlePrice = (value, isDone, isAdd, index) => {
    let dummyList = [...priceList];
    if (dummyList.length > index) {
      dummyList[index] = value;
    } else {
      dummyList.push(value);
    }
    if (isAdd && !isDone) {
      let dummyCountList = [...countList];
      let newValue = dummyCountList.length + 1;
      dummyCountList.push(newValue);
      setCountList(dummyCountList);
    }
    setPriceList(dummyList);
  };

  // to get the details of items for report
  const handleItemList = (index, name, price, purchasedByList) => {
    let dummyItemList = [...itemList];
    let obj = {
      itemName: name,
      itemPrice: price,
      purchasedBy: purchasedByList,
    };
    if (dummyItemList.length > index) {
      dummyItemList[index] = obj;
    } else {
      dummyItemList.push(obj);
    }
    setItemList(dummyItemList);
  };

  // to calculate the final amount and to scroll to top of the page
  const handleAmount = () => {
    setCompute(true);
    let dummyData = { ...amountList };
    priceList.forEach((price) => {
      Object.keys(price).forEach((item) => {
        dummyData[item] = dummyData[item] + price[item];
      });
    });
    setAmountList(dummyData);
    setReport(true);
    var elmnt = document.getElementById("card");
    elmnt.scrollIntoView();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            style={{ margin: "10px", backgroundColor: "aliceblue" }}
            id="card"
          >
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: "bold" }}
                    style={{ color: "cadetblue" }}
                    gutterBottom
                  >
                    {`Total Amount`}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  {report ? (
                    <Report totalData={amountList} itemData={itemList} />
                  ) : null}
                </Grid>
              </Grid>
              <TotalAmount amountData={amountList} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ margin: "10px", backgroundColor: "antiquewhite" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                style={{ color: "cadetblue" }}
                gutterBottom
              >
                {`Calculate Fare`}
              </Typography>
              {countList.map((item, index) => {
                return (
                  <CalculateFare
                    handleAmountChange={handleAmount}
                    handleAdd={handlePrice}
                    lastValue={countList.length == index + 1}
                    indexValue={index}
                    isDone={done}
                    isCompute={compute}
                    handleDone={handleDone}
                    handleItemList={handleItemList}
                    apt={props.selectedApt}
                  />
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
