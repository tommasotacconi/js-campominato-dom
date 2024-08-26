// FUNZIONI
// funzione che crea una cella con testo interno pari al parametro
// content
function createCell (content) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.append(content);
  return cell;
}

// funzione per generare tot numeri casuali diversi tra loro e che
// non maggiori di un max
function getRandomNumbers (max, totalNumbers) {
  const numbers = [];

  while (numbers.length < totalNumbers) {
    const randNum = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(randNum)) numbers.push(randNum);
  }

  return numbers;
}

// funzione di fine partita, riceve i parametri score per il punteggio
// finale e hasWon, che valuta se l'utente ha vinto
function endGame (scoreNum, hasWon = false) {
  const result = hasWon ? 'vinto' : 'perso';
  const message = `Hai ${result}, hai totalizzato un punteggio di ${scoreNum} punti`
  // alert(message);
  parResult.innerText = message;
  isGameOver = true;
}


// FASE DI PREPARAZIONE
// -Prendo la griglia
const grid = document.getElementById('grid');
// -Prendo il bottone Play
const button = document.querySelector('button');
// -Prendo la select
const select = document.querySelector('select');
// -Prendo il punto per lo score
const score = document.querySelector('.score');
// -Prendo il paragrafo per il risultato finale
const parResult = document.querySelector('.par-result');

// -Imposto delle condizioni iniziali  per poter controllare
// righe e colonne della griglia
const rowsBeg = 10;
const colsBeg = 10;
const rowsInt = 9;
const colsInt = 9;
const rowsExp = 7;
const colsExp = 7;
let totCells;

// imposto il numero di bombe fisso e inizializzo l'array di bombe
const totalBombs = 16;
let bombs;

// -Iniazializzo lo score
let scoreNum = 0;

// -Inizializzo isGameOver;
let isGameOver;

// FASE DI IMPORTAZIONE DATI
// -Attacco un event listener alla select per modificare il valore
// di una variabile che tenga conto del valore della select preso
let selectValue;
select.addEventListener('change', () => {
  selectValue = select.value;
  console.log(selectValue);
});


// FASE DI ELABORAZIONE
// -Attacco un event listener sul bottone play
button.addEventListener('click', function () {
  // -Setto isGameOver a false quando comincio a giocare o rigioco
  isGameOver = false;

  // -Setto scoreNum uguale a 0 per quando rigioco
  scoreNum = 0;

  // -Ripulisco il contenuto di grid, score e parResult
  grid.innerHTML = '';
  score.innerHTML = '';
  parResult.innerHTML = '';

  // -Cambio il testo del button
  if (button.innerText === 'Play' ) button.innerText = 'Play again';

  // -Uso uno switch per gestire i tre casi di difficoltà sulla base
  // del valore di selectValue. Creo per ogni caso una tabella di
  // dimensione differente
  let cellDimensionClass;
  let maxScore;

  switch (selectValue) {
    case 'lvl-1':
      // Calcolo la variabile totCells
      totCells = rowsBeg * colsBeg;
      
      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'beginner';

      // -Genero le bombe
      bombs = getRandomNumbers(totCells, totalBombs);
      console.log(bombs.sort());

      // -Calcolo il massimo punteggio possibile
      maxScore = totCells - totalBombs;
      break;
    case 'lvl-2':
      // -Calcolo la variabile totCells
      totCells = rowsInt * colsInt;
      
      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'intermediate';
      
      // -Genero le bombe
      bombs = getRandomNumbers(totCells, totalBombs);
      console.log(bombs.sort());

      // -Calcolo il massimo punteggio possibile
      maxScore = totCells - totalBombs;
      break;
    case 'lvl-3':
      // Calcolo la variabile totCells
      totCells = rowsExp * colsExp;
      
      // -Determino la classe che dovrà essere assegnta alla cella
      cellDimensionClass = 'expert';
      
      // -Genero le bombe
      bombs = getRandomNumbers(totCells, totalBombs);
      console.log(bombs.sort());

      // -Calcolo il massimo punteggio possibile
      maxScore = totCells - totalBombs;
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
      // -Stampo in console il numero di cella
      console.log(cell.innerText);

      // -La funzione procede solo se la cella non ha classe 'clicked'
      if (isGameOver || cell.classList.contains('clicked')) return;

      // -Verifico se ha preso la bomba
      if (bombs.includes(i + 1)) {
        // -Stampo il messaggio
        console.log('Hai selezionato una bomba, fine della partita.');
        // -Svuoto la cella
        cell.innerText = '';
        // -Aggiungo la classe bomba
        cell.classList.add('bomb');

        // -Chiamo la funzione di fine partita
        endGame(scoreNum, false);
      } else {
        // -Aggiungo la classe 'clicked'
        cell.classList.add('clicked');
        // -Stampo in pagina il punteggio aumentato di uno
        score.innerText = ++scoreNum;
        
        // -Controllo se l'utente ha vinto
        if(scoreNum === maxScore) endGame (scoreNum, true);       
      }
    });
    
    // -Inserisco la cella in pagina
    grid.appendChild(cell);
  }

  console.log(maxScore)
});

