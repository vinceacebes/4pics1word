// document.addEventListener("DOMContentLoaded", () => {
//   // FOR SONG
//   const bg_music = new Audio("resources/Action type A  Yoshis Cookie SNES.mp3");
//   const btn = document.getElementById("pindot");
//   const image = document.getElementById("imahe");
//   const on = new Image("./images/Sound On.png");
//   const off = new Image("./images/Sound Off.png");

//   // play song automaticallly when page load
//   bg_music.play();

//   // store the current playback position in local storage
//   bg_music.addEventListener("timeupdate", () => {
//     localStorage.setItem("bg_musicPosition", bg_music.currentTime);
//   });

//   // //  when the page is unloaded, store the  current playback position
//   window.addEventListener("beforeunload", () => {
//     localStorage.setItem("bg_musicPosition", bg_music.currentTime);
//  });

//   // // when page is loaded continue playing from the last saved position
//   window.addEventListener("load", () => {
//     const bg_musicPosition = localStorage.getItem("bg_musicPosition");
//     if (bg_musicPosition) {
//       bg_music.currentTime = bg_musicPosition;
//       bg_music.play();
//     }
//   });

//   // loops the song after ended 
//   bg_music.addEventListener("ended", function () {
//     bg_music.currentTime = 0;
//     bg_music.play();
//   });
// });
