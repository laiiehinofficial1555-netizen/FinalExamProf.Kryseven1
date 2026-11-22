//  rate chea domlai car hx moto
const RATES = {
  car: { normal: 500, over: 1000 },
  moto: { normal: 200, over: 300 },
};

const LIMIT = 8;
//   1$ = 4000r
const EXCHANGE = 4000;

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calculate(showError) {
  const vehicle = document.getElementById("vehicle").value;
  const timeIn = document.getElementById("timeIn").value;
  const timeOut = document.getElementById("timeOut").value;
  const error = document.getElementById("error");
  error.textContent = "";

  if (!timeIn || !timeOut) {
    document.getElementById("riel").value = "";
    document.getElementById("usd").value = "";
    if (showError) error.textContent = "Enter hour in out";
    return;
  }
  //  do morng chea neati vinh 1 * 60mn
  let minutes = toMinutes(timeOut) - toMinutes(timeIn);
  if (minutes <= 0) minutes += 24 * 60; //id dol midnight

  const hours = Math.ceil(minutes / 60);
  const rate = RATES[vehicle];

  let riel;
  if (hours <= LIMIT) {
    riel = hours * rate.normal;
  } else {
    riel = hours * rate.over;
  }

  document.getElementById("riel").value = riel.toLocaleString() + " ៛";
  document.getElementById("usd").value = (riel / EXCHANGE).toFixed(2) + " $";
}

["vehicle", "timeIn", "timeOut"].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("input", () => calculate(false));
  el.addEventListener("change", () => calculate(false));
});

document
  .getElementById("calc")
  .addEventListener("click", () => calculate(true));
