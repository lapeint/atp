  // Définition de l'environnement
  const rows = 5;
  const cols = 10;

  const environment = [
    ['0', ' ', ' ', 'H', ' ', ' ', ' ', ' ', ' ', '1'],
    [' ', 'H', ' ', ' ', ' ', ' ', 'H', ' ', ' ', ' '],
    [' ', ' ', ' ', 'H', ' ', ' ', ' ', ' ', 'H', 'H'],
    [' ', ' ', ' ', 'H', ' ', ' ', 'H', ' ', ' ', 'H'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'H', ' ', ' '],
  ];

  let direction = 'right'; // Initial direction

  // Fonction pour afficher l'environnement avec un délai
  function printEnvironmentWithDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Effacer la console pour un affichage plus propre
        console.clear();

        for (let i = 0; i < rows; i++) {
          let rowString = environment[i].join('');
          // Display the volant and direction
          if (i === rows - 1) {
            rowString += `    Q ${getArrow()}`;
          }
          console.log(rowString);
        }
        console.log('\n');
        resolve();
      }, 500); // Délay of 500 milliseconds
    });
  }

  // Fonction pour obtenir la flèche en fonction de la direction
  function getArrow() {
    switch (direction) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'left':
        return '←';
      case 'right':
        return '→';
      default:
        return '';
    }
  }

  // Fonction pour déplacer le '0' vers le '1'
  async function move() {
    let currentRow = environment.findIndex(row => row.includes('0'));
    let currentCol = environment[currentRow].indexOf('0');

    // Fonction pour vérifier si le mouvement est valide
    function isValidMove(row, col) {
      return row >= 0 && row < rows && col >= 0 && col < cols && environment[row][col] !== 'H';
    }

    // Boucle de déplacement
    while (currentRow !== rows - 1 || currentCol !== environment[0].indexOf('1')) {
      // Déplacement vers la droite si possible
      if (isValidMove(currentRow, currentCol + 1)) {
        environment[currentRow][currentCol] = ' ';
        currentCol++;
        environment[currentRow][currentCol] = '0';
        direction = 'right';
      }
      // Déplacement vers le bas si possible
      else if (isValidMove(currentRow + 1, currentCol)) {
        environment[currentRow][currentCol] = ' ';
        currentRow++;
        environment[currentRow][currentCol] = '0';
        direction = 'down';
      }
      // Déplacement vers la gauche si possible
      else if (isValidMove(currentRow, currentCol - 1)) {
        environment[currentRow][currentCol] = ' ';
        currentCol--;
        environment[currentRow][currentCol] = '0';
        direction = 'left';
      }
      // Déplacement vers le haut si possible
      else if (isValidMove(currentRow - 1, currentCol)) {
        environment[currentRow][currentCol] = ' ';
        currentRow--;
        environment[currentRow][currentCol] = '0';
        direction = 'up';
      }

      await printEnvironmentWithDelay(); // Afficher l'environnement avec délai
    }

    console.log('Arrivé à la destination!');
  }

  // Appel de la fonction pour commencer le déplacement
  move();
