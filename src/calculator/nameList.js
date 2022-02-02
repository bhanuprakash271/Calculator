import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export default function NameList(props) {
  const [nameList, setNameList] = React.useState({
    Rajeev: false,
    Nandhan: false,
    Shreyas: false,
    Tirth: false,
    Bhanu: false,
  });

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(null);
  const [isDone, setIsDone] = React.useState(false);
  const [isCompute, setIsCompute] = React.useState(true);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleDone = () => {
    setIsDone(true);
    handleCalculation(true);
  };

  const handleChange = (event) => {
    setNameList({
      ...nameList,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCalculation = (doneValue) => {
    let obj = {
      Rajeev: 0.00,
      Nandhan: 0.00,
      Shreyas: 0.00,
      Tirth: 0.00,
      Bhanu: 0.00,
    }
    if (price !== 0) {
      let count = 0;
      Object.keys(nameList).forEach(item => {
        if (nameList[item] == true) {
          count = count + 1;
        }
      })
      let pricePerPerson = price / count;
      Object.keys(nameList).forEach(item => {
        if (nameList[item] == true) {
          obj[item] = obj[item] + pricePerPerson;
        }
      })
      props.handleAdd(obj, doneValue);
    }
  }

  const handleCompute = () => {
    setIsCompute(false);
    props.handleAmountChange();
  }


  return (
    <React.Fragment>
      <Grid container spacing={2} style={{ paddingTop: "20px" }}>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Name</InputLabel><Input
              id="outlined-name"
              label="Name"
              value={name}
              onChange={handleName}
              variant="standard"
              style={{ marginRight: "20px" }}
              disabled={!props.lastValue || isDone}
            /></FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Price</InputLabel>
            <Input
              id="outlined-uncontrolled"
              label="Price"
              value={price}
              onChange={handlePrice}
              variant="standard"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              disabled={!props.lastValue || isDone}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormGroup aria-label="position" row>
              {Object.keys(nameList).map(function (key) {
                return (<FormControlLabel
                  control={
                    <Checkbox checked={nameList[key]} onChange={handleChange} name={key} disabled={!props.lastValue || isDone} />
                  }
                  label={key}
                  labelPlacement="bottom"
                />)
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      {!isDone && props.lastValue ? <Button variant="outlined" style={{ backgroundColor: "lightblue", marginRight: "10px", color: "white" }} onClick={() => { handleCalculation(false) }}>Add</Button> : null}
      {props.lastValue && !isDone ? <Button variant="outlined" style={{ backgroundColor: "green", marginRight: "10px", color: "white" }} onClick={() => { handleDone() }}>Done</Button> : null}
      {props.lastValue && isDone && isCompute ? <Button variant="outlined" style={{ backgroundColor: "blue", marginRight: "10px", color: "white" }} onClick={() => { handleCompute() }}>Compute</Button> : null}
    </React.Fragment>
  );
}
