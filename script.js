const initialRowCount = 3;

function calculatePricePer100UD(priceInput, quantityInput, pricePer100UDCell) {
  let price = parseFloat(priceInput.value.replace(/[^\d,.]/g, '').replace(',', '.')); // Extract numeric value with decimals
  price = isNaN(price) ? 0 : price.toFixed(2);

  const quantity = parseInt(quantityInput.value);

  if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
    const pricePer100UD = (price * 100 / quantity).toFixed(3).replace('.', ',');
    pricePer100UDCell.innerText = 'R$ ' + pricePer100UD;
  }
}

function addProductRow() {
  const table = document.getElementById('productTable');
  const newRow = table.insertRow(-1);
  newRow.innerHTML = `
    <td><input type="text" placeholder="Produto"></td>
    <td>
      <input type="text" onfocus="moveCursorToEnd(this)" pattern="[0-9]*" oninput="formatPriceColumnNumber(event)" placeholder="R$ 0,00">
    </td>
    <td><input type="text" pattern="[0-9]*" oninput="calculatePricePer100UD(this.parentElement.previousElementSibling.children[0], this, this.parentElement.nextElementSibling)" placeholder="1"></td>
    <td>R$ 0,000</td>
    <td><button class="clear" onclick="clearRow(this)">Limpar</button> <button onclick="removeRow(this)">Remover</button></td>
  `;

}

function clearRow(button) {
  const row = button.closest('tr');
  row.querySelector('input').value = '';
  row.querySelector('td:nth-child(4)').innerText = 'R$ 0,000';
}

function removeRow(button) {
  const row = button.closest('tr');
  row.remove();
}

function formatPriceColumnNumber(event) {
  const input = event.target;
  let value = input.value.replace(/[^0-9]/g, ''); // Remove non-digit characters

  if (value === '' || /^0+$/.test(value)) {
    input.value = '';
    return;
  }

  value = value.replace(/^0+/, '');

  if (value.length === 1) {
    value = '00' + value;
  } else if (value.length === 2) {
    value = '0' + value;
  }

  // Add comma before the last two digits
  value = 'R$ ' + value.slice(0, -2) + ',' + value.slice(-2);

  input.value = value;
  calculatePricePer100UD(input, input.parentElement.nextElementSibling.children[0], input.parentElement.nextElementSibling.nextElementSibling);
}

function clearTable() {
  const table = document.getElementById('productTable');
  table.innerHTML = '';
  for (let i = 0; i < initialRowCount; i++) {
    addProductRow();
  }
}

function moveCursorToEnd(input) {
  const length = input.value.length;
  input.setSelectionRange(length, length);
}

// Initialize table with initial rows
clearTable();
