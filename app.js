const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
})


function displayMusic (music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file; // dikkat! ses dosyası

}

play.addEventListener("click", () => {
    const isPlaying = container.classList.contains("playing");
    isPlaying ? pauseMusic() : playMusic();
})


next.addEventListener("click", () => {
    nextMusic();
})


prev.addEventListener("click", () => {
    prevMusic();
})

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


// function playMusic(){
//     container.classList.add("playing");
//     audio.play();
// }
const playMusic = () => {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

// function pauseMusic(){
//     container.classList.remove("playing");
//     audio.pause();
// }
const pauseMusic = () => {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}