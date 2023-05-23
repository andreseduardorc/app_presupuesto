class GastoUsuario {
	constructor(nombre, monto) {
		this.nombre = nombre;
		this.monto = monto;
	}
}

let listadoGastos = [];
let btnCalcular = document.getElementById("btnCalcular");
let inputPresupueto = document.getElementById("inputPresupueto");
let presupuesto = document.getElementById("presupuesto");
let totalGastos = document.getElementById("totalGastos");
let saldo = document.getElementById("saldo");
let btnAnadir = document.getElementById("btnAnadir");
let inputNombreGasto = document.getElementById("inputNombre");
let inputMontoGasto = document.getElementById("inputMonto");
let bodyTabla = document.getElementById("bodyTabla");

function agregarGasto(nombre, monto) {
	let gasto = new GastoUsuario(nombre, monto);
	listadoGastos.push(gasto);
	let saldoActual = actualizarSaldo();

	if (saldoActual < 0) {
		listadoGastos.pop();
		alert("Monto insuficiente, ingrese más dinero");
	} else {
		let gastoActualizado = calcularTotalGastos();
		totalGastos.innerHTML = formatCurrency(gastoActualizado);
	}

	actualizarTabla();
}

function actualizarTabla() {
	let html = "";
	listadoGastos.forEach((gasto, index) => {
		html += `
			<tr>
				<td>${gasto.nombre}</td>
				<td>${gasto.monto}</td>
				<td style="cursor: pointer;"><i class="far fa-trash-alt" onclick="eliminar(${index})"></i></td>
			</tr>
		`;
	});

	bodyTabla.innerHTML = html;
	actualizarSaldo();
}

function eliminar(index) {
	listadoGastos.splice(index, 1);
	let gastoActualizado = calcularTotalGastos();
	totalGastos.innerHTML = formatCurrency(gastoActualizado);
	actualizarTabla();
}

function actualizarSaldo() {
	let pptoResumen = presupuesto.innerHTML.replaceAll(".", "");
	let gastosResumen = calcularTotalGastos();
	let nuevoSaldo = pptoResumen - gastosResumen;
	saldo.innerText = formatCurrency(nuevoSaldo);
	return nuevoSaldo;
}

function calcularTotalGastos() {
	return listadoGastos.reduce((acumulador, valorActual) => acumulador + valorActual.monto, 0);
}

function formatCurrency(value) {
	return String(value).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

btnCalcular.addEventListener("click", function () {
	presupuesto.innerHTML = formatCurrency(inputPresupueto.value);
	actualizarSaldo();
	presupuesto.innerHTML > 0 ? btnAnadir.removeAttribute("disabled") : btnAnadir.setAttribute("disabled", true);
});

btnAnadir.addEventListener("click", function () {
	let nombre = inputNombreGasto.value;
	let monto = parseInt(inputMontoGasto.value);
	agregarGasto(nombre, monto);
	actualizarTabla();
});
