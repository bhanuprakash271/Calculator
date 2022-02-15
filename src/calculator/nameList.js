import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { booleanNames, amountNames } from './constants';

export default function NameList(props) {
  const [nameList, setNameList] = React.useState({ ...booleanNames });

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(null);


  const handleName = (event) => {
    setName(event.target.value);
  };


  useEffect(() => {
    if (!props.lastValue) {
      handleCalculation(false, false);
    }
  }, [price, nameList])

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleDone = () => {
    handleCalculation(true, false);
    props.handleDone(true);
  };

  const handleChange = (event) => {
    setNameList({
      ...nameList,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCalculation = (doneValue, addClick) => {
    let obj = { ...amountNames };
    if (price !== 0) {
      let count = 0;
      if (nameList['All'] == true) {
        count = Object.keys(nameList).length - 1;
      } else {
        Object.keys(nameList).forEach(item => {
          if (nameList[item] == true) {
            count = count + 1;
          }
        })
      }
      let pricePerPerson = price / count;
      Object.keys(nameList).forEach(item => {
        if (item != 'All' && (nameList[item] == true || nameList['All'] == true)) {
          obj[item] = obj[item] + pricePerPerson;
        }
      })
      props.handleAdd(obj, doneValue, addClick, props.indexValue);
    }
  }

  const handleCompute = () => {
    props.handleAmountChange();
  }

  const handleEdit = () => {
    props.handleDone(false);
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
              disabled={props.isDone}
            /></FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Price</InputLabel>
            <Input
              id="outlined-uncontrolled"
              label="Price"
              value={price}
              type={"number"}
              onChange={handlePrice}
              variant="standard"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              disabled={props.isDone}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormGroup aria-label="position" row>
              {Object.keys(nameList).map(function (key) {
                return (<FormControlLabel
                  control={
                    <Checkbox checked={nameList[key]} onChange={handleChange} name={key} disabled={props.isDone || (nameList['All'] == true && key != 'All')} />
                  }
                  label={key}
                  labelPlacement="bottom"
                />)
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      {!props.isDone && props.lastValue ? <Button variant="outlined" style={{ backgroundColor: "green", marginRight: "10px", color: "white" }} onClick={() => { handleCalculation(false, true) }}>Add</Button> : null}
      {props.lastValue && !props.isDone ? <Button variant="outlined" style={{ backgroundColor: "lightblue", marginRight: "10px", color: "white" }} onClick={() => { handleDone() }}>Done</Button> : null}
      {props.lastValue && props.isDone && !props.isCompute ? <Button variant="outlined" style={{ backgroundColor: "green", marginRight: "10px", color: "white" }} onClick={() => { handleCompute() }}>Compute</Button> : null}
      {props.lastValue && props.isDone && !props.isCompute ? <Button variant="outlined" style={{ backgroundColor: "lightblue", marginRight: "10px", color: "white" }} onClick={() => { handleEdit() }}>Edit</Button> : null}
    </React.Fragment>
  );
}
