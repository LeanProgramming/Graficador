const canvas = document.getElementById("grafica");
const ctx = canvas.getContext("2d");
const dibujar = document.querySelector("#dibujar");
const cant_f = document.getElementById("cant_f");
const frequencyInput = document.getElementById("frequency");
const amplitudeInput = document.getElementById("amplitude");
const phaseInput = document.getElementById("phase");

const frequency = Number(frequencyInput.value);
const amplitude = Number(amplitudeInput.value);
const phase = Number(phaseInput.value);

let grafico = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Función sinusoidal",
        borderColor: "blue",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 3,
      },
      y: {
        type: "linear",
        min: -amplitude,
        max: amplitude,
      },
    },
    datasets: {
      line: {
        pointRadius: 0, // disable for all `'line'` datasets
      },
    },
    elements: {
      point: {
        radius: 0, // default to disabled in all datasets
      },
    },
  },
});

function dibujarGrafica() {
  let frequencyInput = document.getElementById("frequency");
  let amplitudeInput = document.getElementById("amplitude");
  let phaseInput = document.getElementById("phase");

  let frequency = Number(frequencyInput.value);
  let amplitude = Number(amplitudeInput.value);
  let phase = Number(phaseInput.value);

  let data = [];
  let señales = Number(document.getElementById("cant_f").innerHTML);
  let k = señales * 2;
  for (let i = 0; i < canvas.width; i++) {
    let x = (i / canvas.width) * Math.PI;
    let y = 0;
    for (let j = 0; j <= k; j++) {
      if (j % 2 != 0) {
        y += (amplitude * (1 / j) * Math.sin(2 * Math.PI * frequency * j * x + phase) );
      }
    }
    data.push({ x, y });
  }

  grafico.data.datasets[0]['data'] = data;
  grafico.options.scales.y = {
    type: "linear",
    min: -amplitude,
    max: amplitude,
  }
  grafico.update();
}

//dibujarGrafica();

dibujar.addEventListener("click", function (event) {
  event.preventDefault();
  canvas.innerHTML = "";
  dibujarGrafica();
});

const agregaFrec = document.querySelector("#agregar");
const quitarFrec = document.querySelector("#quitar");

agregaFrec.addEventListener("click", (event) => {
  f = Number(document.getElementById("cant_f").innerHTML);
  f++;
  cant_f.innerHTML = f;
});

quitarFrec.addEventListener("click", (event) => {
  f = Number(document.getElementById("cant_f").innerHTML);
  f--;
  cant_f.innerHTML = f;
});