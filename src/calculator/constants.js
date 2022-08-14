const ardenAmountNames = {
  Rajeev: 0.0,
  Nandan: 0.0,
  Shreyas: 0.0,
  Tirth: 0.0,
  Bhanu: 0.0,
};

const ardenBooleanNames = {
  Rajeev: false,
  Nandan: false,
  Shreyas: false,
  Tirth: false,
  Bhanu: false,
  All: false,
};

const tivoliAmountNames = {
  Charan: 0.0,
  Raghava: 0.0,
  Santhan: 0.0,
  Jaswant: 0.0,
  Bhanu: 0.0,
  Chandu: 0.0,
};

const tivoliBooleanNames = {
  Charan: false,
  Raghava: false,
  Santhan: false,
  Jaswant: false,
  Bhanu: false,
  Chandu: false,
  All: false,
};

export const getBooleanNames = (value) => {
  if (value == 0) {
    return ardenBooleanNames;
  } else {
    return tivoliBooleanNames;
  }
};

export const getAmountNames = (value) => {
  if (value == 0) {
    return ardenAmountNames;
  } else {
    return tivoliAmountNames;
  }
};
