const initialRowCount = 3;

document.addEventListener('DOMContentLoaded', () => {
  clearTable();
});

function calculatePricePer100UD(row) {
  let priceInput = row.children[1];
  let quantityInput = row.children[2];
  let pricePer100UDInput = row.children[3];
  let price = parseFloat(priceInput.value.replace(/[^\d,.]/g, '').replace(',', '.'));
  price = isNaN(price) ? 0 : price.toFixed(2);
  
  const quantity = parseInt(quantityInput.value);
  
  if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
    const pricePer100UD = (price * 100 / quantity).toFixed(3).replace('.', ',');
    pricePer100UDInput.value = 'R$ ' + pricePer100UD;
  }
}

function addProductRow() {
  const table = document.getElementById('productTable');
  const newRow = document.createElement('div');
  newRow.classList.add('product-item');
  newRow.innerHTML = `
    <input type="text" placeholder="Produto">
    <input type="text" pattern="[0-9]*" oninput="formatPriceColumnNumber(event)" placeholder="Preço">
    <input type="text" pattern="[0-9]*" oninput="calculatePricePer100UD(this.parentElement)" placeholder="Quantidade">
    <input type="text" pattern="[0-9]*" readonly="readonly" oninput="formatPriceColumnNumber(event)" placeholder="R$ 0,000">
  `;
  table.appendChild(newRow);
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
  calculatePricePer100UD(input.parentElement)
}

function clearTable() {
  const table = document.getElementById('productTable');
  table.innerHTML = '';
  for (let i = 0; i < initialRowCount; i++) {
    addProductRow();
  }
}

document.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
});

document.addEventListener('touchmove', (event) => {
  const currentX = event.touches[0].clientX;
  const diffX = currentX - startX;
  if (diffX < -50) {
    // Swipe left detected
    const row = event.target.closest('.product-item');
    if (row) {
      row.classList.add('swipe-delete');
      setTimeout(() => {
        row.remove();
      }, 300); // Wait for the animation to finish before removing the row
    }
  }
});
