const dino = document.querySelector('.dino'); // Selecionando o Dino. Const é uma variável constante, não pode ser alterada
const background = document.querySelector('.background'); // Selecionando o background

let isJumping = false; // Variável que controla o pulo
let isGameOver = false; // Iniciando o jogo
let position = 0; // Posição inicial do Dino

function handleKeyUp(event) { // Função que controla o pulo
  if (event.keyCode === 32) { // Se apertar a barra de espaço || site: https://keycode.info/
    if (!isJumping) { // Se não estiver pulando
      jump(); // Pula
    }
  }
} // Fim da função handleKeyUp

function jump() { // Função que controla o pulo
  isJumping = true; // O dino está pulando

  let upInterval = setInterval(() => { // Intervalo que controla o pulo
    if (position >= 180) { // Se o dino estiver no chão
      // Descendo
      clearInterval(upInterval); // Para o intervalo

      let downInterval = setInterval(() => { // Intervalo que controla o descendo
        if (position <= 0) { // Se o dino estiver no chão
          clearInterval(downInterval); // Para o intervalo
          isJumping = false; // O dino não está mais pulando
        } else { // Se o dino não estiver no chão
          position -= 20; // Move o dino
          dino.style.bottom = position + 'px'; // Move o dino
        }
      }, 20); // Intervalo de 20 milisegundos
    } else { // Se o dino não estiver no chão
      // Subindo
      position += 20; // Move o dino
      dino.style.bottom = position + 'px'; // Move o dino
    }
  }, 20); // Intervalo de 20 milisegundos
} // Fim da função jump

function createCactus() { // Função que cria os cactos
  const cactus = document.createElement('div'); // Criando o elemento
  let cactusPosition = 1000; // Posição inicial dos cactos
  let randomTime = Math.random() * 4000; // Tempo de criação dos cactos

  if (isGameOver) return; // Se o jogo acabou, não cria mais cactos

  cactus.classList.add('cactus'); // Adicionando a classe cactus
  background.appendChild(cactus); // Adicionando o elemento ao background
  cactus.style.left = cactusPosition + 'px'; // Definindo a posição inicial dos cactos

  let leftTimer = setInterval(() => { // Intervalo que controla a posição dos cactos
    if (cactusPosition < -60) { // Se o cacto sair da tela, remove-o
      // Saiu da tela
      clearInterval(leftTimer); // Para o intervalo
      background.removeChild(cactus); // Remove o cacto da tela
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // Se o cacto estiver dentro do dino
      // Game over
      clearInterval(leftTimer); // Para o intervalo
      isGameOver = true; // Game over
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; // Mostra o game over
    } else { // Se o cacto não estiver dentro do dino
      cactusPosition -= 10; // Move o cacto
      cactus.style.left = cactusPosition + 'px'; // Move o cacto
    }
  }, 20); // Intervalo de 20 milisegundos

  setTimeout(createCactus, randomTime); // Cria um novo cacto
} // Fim da função createCactus

createCactus(); // Chama a função que cria os cactos
document.addEventListener('keyup', handleKeyUp); // Chama a função que controla o pulo