// const bg_music = new Audio("resources/Action type A  Yoshis Cookie SNES.mp3");
// const btn = document.getElementById("pindot");
// const image = document.getElementById("imahe");
// const on = new Image("./images/Sound On.png");
// const off = new Image("./images/Sound Off.png");

// let muted = false;

// bg_music.play();

// btn.addEventListener("click", () => {
//   bg_music.muted = !bg_music.muted;
//   if (bg_music.muted) {
//     image.src ="./images/Sound Off.png";
//   } else {
//     image.src ="./images/Sound On.png";
//     bg_music.play();
//   }
// });

// let levels = [
//     {
//       images: ["./images/CHEMISTRY.jpg", "./images/FORCES.jpg", "./images/POWER.jpg", "./images/STATISTICS.jpg"],
//       answer: "CHEMISTRY",
//       hints: ["Hint 1", "Hint 2"]
//     },
//     // add more levels here
//   ];
  
//   let currentLevel = 0;
//   let blanks = [];
//   let letters = [];
//   let hintsUsed = 0;
  
//   function startGame() {
//     // create image elements
//     let imagesContainer = document.getElementById("images");
//     for (let i = 0; i < levels[currentLevel].images.length; i++) {
//       let img = document.createElement("img");
//       img.src = `img/level${currentLevel + 1}/${levels[currentLevel].images[i]}`;
//       imagesContainer.appendChild(img);
//     }
  
//     // create blank elements
//     let blanksContainer = document.getElementById("blanks");
//     for (let i = 0; i < levels[currentLevel].answer.length; i++) {
//       let blank = document.createElement("input");
//       blank.type = "text";
//       blank.disabled = true;
//       blanksContainer.appendChild(blank);
//       blanks.push(blank);
//     }
  
//     // create letter elements
//     let lettersContainer = document.getElementById("letters");
//     for (let i = 0; i < 26; i++) {
//       let letter = document.createElement("button");
//       letter.innerHTML = String.fromCharCode(65 + i);
//       letter.onclick = function() {
//         let index = blanks.indexOf(this);
//         if (index!== -1) {
//           blanks[index].value = this.innerHTML;
//         }
//       };
//       lettersContainer.appendChild(letter);
//       letters.push(letter);
//     }
//   }
  
//   function getHint() {
//     if (hintsUsed < 2) {
//       hintsUsed++;
//       let hint = levels[currentLevel].hints[hintsUsed - 1];
//       alert(hint);
//     }
//   }
  
//   function checkAnswer() {
//     let answer = "";
//     for (let i = 0; i < blanks.length; i++) {
//       answer += blanks[i].value;
//     }
//     if (answer === levels[currentLevel].answer) {
//       alert("Correct!");
//       currentLevel++;
//       startGame();
//     } else {
//       alert("Incorrect. Try again!");
//     }
//   }
  
//   startGame();

document.addEventListener("DOMContentLoaded", () => {
  const levels = [
      { images: ["images/CHEMISTRY.jpg"], answer: "CHEMISTRY" },
      { images: ["images/FORCE.jpg"], answer: "FORCE" },
      { images: ["images/POWER.jpg"], answer: "POWER" },
      { images: ["images/STATISTICS.jpg"], answer: "STATISTICE" },
      { images: ["images/1.jpg"], answer: "ETO" }
  ];

  let currentLevel = 0;
  let score = 0;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const wordBoxesContainer = document.getElementById("word-boxes");
  const letterContainer = document.getElementById("letter-container");
  const feedbackElement = document.getElementById("feedback");
  const imageContainer = document.getElementById("image-container");
  const scoreElement = document.getElementById("score");

  function initializeLevel(levelIndex) {
      const { images, answer } = levels[levelIndex];

      // Clear previous content
      wordBoxesContainer.innerHTML = "";
      letterContainer.innerHTML = "";
      imageContainer.innerHTML = "";

      // Display image(s)
      images.forEach(image => {
          const imgElement = document.createElement("img");
          imgElement.src = image;
          imageContainer.appendChild(imgElement);
      });

      // Create word boxes based on the length of the answer
      for (let i = 0; i < answer.length; i++) {
          const box = document.createElement("div");
          box.classList.add("word-box");
          wordBoxesContainer.appendChild(box);

          // Add click event to return the letter to the choices
          box.addEventListener("click", () => {
              if (box.textContent) {
                  const letterElement = document.querySelector(`.letter.hidden[data-letter="${box.textContent}"]`);
                  if (letterElement) {
                      letterElement.style.visibility = "visible";
                      letterElement.classList.remove("hidden");
                      box.textContent = "";
                  }
              }
          });
      }

      // Shuffle the letters array
      const shuffledLetters = shuffleArray([...letters]);

      // Select 16 - answer.length random letters excluding the answer letters
      const filteredLetters = shuffledLetters.filter(letter => !answer.includes(letter));
      const randomLetters = filteredLetters.slice(0, 16 - answer.length);

      // Add the answer letters to the random letters
      const answerLetters = answer.split("");
      const gameLetters = shuffleArray(randomLetters.concat(answerLetters));

      // Display the letters
      gameLetters.forEach(letter => {
          const letterElement = document.createElement("div");
          letterElement.classList.add("letter");
          letterElement.textContent = letter;
          letterElement.dataset.letter = letter;
          letterContainer.appendChild(letterElement);

          letterElement.addEventListener("click", () => {
              const emptyBox = document.querySelector(".word-box:empty");
              if (emptyBox) {
                  emptyBox.textContent = letter;
                  letterElement.style.visibility = "hidden";
                  letterElement.classList.add("hidden");
              }
          });
      });

      feedbackElement.textContent = "";
  }

  document.getElementById("clear-button").addEventListener("click", () => {
      document.querySelectorAll(".word-box").forEach(box => box.textContent = "");
      document.querySelectorAll(".letter.hidden").forEach(letter => {
          letter.style.visibility = "visible";
          letter.classList.remove("hidden");
      });
      feedbackElement.textContent = "";
  });

  document.getElementById("submit-button").addEventListener("click", () => {
      const selectedWord = Array.from(document.querySelectorAll(".word-box")).map(box => box.textContent).join("");
      if (selectedWord === levels[currentLevel].answer) {
          feedbackElement.textContent = "Congratulations!";
          feedbackElement.style.color = "green";
          score++;
          scoreElement.textContent = `Score: ${score}`;
          setTimeout(() => {
              currentLevel++;
              if (currentLevel < levels.length) {
                  initializeLevel(currentLevel);
              } else {
                  feedbackElement.textContent = "You have completed all levels!";
              }
          }, 1000);
      } else {
          feedbackElement.textContent = "Try Again!";
          feedbackElement.style.color = "red";
      }
  });

  // Initialize the first level
  initializeLevel(currentLevel);

  // Shuffle function
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
});