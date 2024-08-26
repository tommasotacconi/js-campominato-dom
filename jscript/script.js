// FUNZIONI
function createCell (content) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.append(content);
  return cell;
}

// FASE DI PREPARAZIONE
// -Prendo la griglia
const grid = document.getElementById('grid');
// -Prendo il bottone Play
const button = document.querySelector('button');
// -Prendo la select
const select = document.querySelector('select');

// -Imposto delle condizioni iniziali  per poter controllare
// righe e colonne della griglia
const rowsBeg = 10;
const colsBeg = 10;
const rowsInt = 9;
const colsInt = 9;
const rowsExp = 7;
const colsExp = 7;
let totCells;

// FASE DI ELABORAZIONE
// -Attacco un event listener sul bottone play
button.addEventListener('click', function () {
  // -Ripulisco il contenuto di grid
  grid.innerHTML = '';

  // -Cambio il testo del button
  if (button.innerText === 'Play' ) button.innerText = 'Play again';

  // -Uso uno switch per gestire i tre casi di difficoltà sulla base
  // del valore di selectValue. Creo per ogni caso una tabella di
  // dimensione differente
  let cellDimensionClass;
  switch (selectValue) {
    case 'lvl-1':
      // Calcolo la variabile totCells
      totCells = rowsBeg * colsBeg;

      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'beginner';
      break;
    case 'lvl-2':
      // -Calcolo la variabile totCells
      totCells = rowsInt * colsInt;
      
      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'intermediate';
      break;
    case 'lvl-3':
      // Calcolo la variabile totCells
      totCells = rowsExp * colsExp;
      
      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'expert';
      break;
    default:
        alert('Seleziona un livello');
      }
      // -Inserisco dinamicamente le celle con un ciclo for
      // e sfrutto la funzione createCell() precedentemente creata
      for (let i = 0; i < totCells; i++) {
        const cell = createCell(i + 1);
        
        // -Inserisco la classe che dimensiona la cella
        cell.classList.add(cellDimensionClass);
        
        // -Attacco un event listener alla cella che faccia cambiare
        // il suo colore quando cliccata e che stampi in console il suo
        // numero
        cell.addEventListener('click', function () {
          cell.classList.toggle('clicked');
          console.log(cell.innerText);
        })
        
        // -Inserisco la cella in pagina
        grid.appendChild(cell);
      }
});

// -Attacco un event listener alla select per modificare il valore
// di una variabile che tenga conto del valore della select preso
let selectValue;
select.addEventListener('change', function () {
  selectValue = select.value;
  console.log(selectValue);
});
