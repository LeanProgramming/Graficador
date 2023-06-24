/*const canvas = document.getElementById("grafica");
const ctx = canvas.getContext("2d");

function dibujarGrafica() {
  
  const frecuencias = document.querySelectorAll(".frequency");
  const amplitudes = document.querySelectorAll(".amplitude");
  const fases = document.querySelectorAll(".phase");
  let frecuencia = 0;
  let amplitud = 0;
  let fase = 0;
  for(i = 0; i < frecuencias.length; i++) {
    frecuencia += parseFloat(frecuencias[i].value);
  }
  for(i = 0; i < amplitudes.length; i++) {
    amplitud += parseFloat(amplitudes[i].value);
  }
  for(i = 0; i < fases.length; i++) {
    fase += parseFloat(fases[i].value);
  }
  

  //const frecuencia = parseFloat(document.querySelector(".frequency").value);
  //const amplitud = parseFloat(document.querySelector(".amplitude").value);
  //const fase = parseFloat(document.querySelector(".phase").value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar ejes
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width * 0.1, 0);
  ctx.lineTo(canvas.width * 0.1, canvas.height);
  ctx.stroke();

  // Dibujar función sinusoidal
  
  const cantSeñales = document.querySelectorAll("form");
  ctx.beginPath();
  for (let x = 0; x <= canvas.width; x++) {
    let k = -1
    let formulaSeñal = (amplitud * Math.sin(2 * Math.PI * frecuencia * (x / (canvas.width * 0.9)) + fase));
    let offsetY = canvas.height /  2;
    let zoom = canvas.height/8;
    let y = 0;
    for(let i = 0; i < cantSeñales.length; i++) {
      k += 2;
      y += (parseFloat(amplitudes[i].value) * (4/Math.PI) * (1/k) * Math.sin(2 * Math.PI * k *parseFloat(frecuencias[i].value) * (x / (canvas.width * 0.9)) - parseFloat(fases[i].value)))
    }
    y = y * zoom + offsetY;
    if (x === 0) {
      ctx.moveTo(x + canvas.width * 0.1, y);
    } else {
      ctx.lineTo(x + canvas.width * 0.1, y);
    }
  }
  ctx.stroke();

  // Dibujar etiquetas
  let valor = 4
  for (let i = 0; i <= 8; i++) {
    const y = (canvas.height / 8) * i;
    ctx.fillText(valor, canvas.width * 0.04, y);
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.1 - 5, y);
    ctx.lineTo(canvas.width * 0.1 + 5, y);
    ctx.stroke();
    valor -= 1;
  }
  for (let i = 1; i <= 8; i++) {
    const x = (canvas.width * 0.9 / 4) * i + canvas.width * 0.1;
    ctx.fillText(i, x - 5, canvas.height / 2 + 20);
    ctx.beginPath();
    ctx.moveTo(x, canvas.height / 2 - 5);
    ctx.lineTo(x, canvas.height / 2 + 5);
    ctx.stroke();
  }
}

const dibujar = document.querySelector("#dibujar");
dibujar.addEventListener("click", (event) => {
  event.preventDefault();
  dibujarGrafica();
});

const agregaFrec = document.querySelector("#agregar");
const formulario = `
<form>
  <label for="frequency">Frecuencia:</label>
  <input type="number" class="frequency" name="frequency" min="0" max="1000" step="0.1" value="1.0">

  <label for="amplitude">Amplitud:</label>
  <input type="number" class="amplitude" name="amplitude" min="0" max="100" step="0.1" value="1.0">

  <label for="phase">Fase:</label>
  <input type="number" class="phase" name="phase" min="-180" max="180" step="0.1" value="0.0">        
</form>`;
const divDatos = document.querySelector("#ingreso_datos");

agregaFrec.addEventListener("click", (event) => {
  const nuevoDiv = document.createElement("div");
  nuevoDiv.innerHTML = formulario;
  divDatos.appendChild(nuevoDiv);
})
*/

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