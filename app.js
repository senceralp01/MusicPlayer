const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    console.log(music);
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


next.addEventListener("click", () => { nextMusic(); })


prev.addEventListener("click", () => { prevMusic(); })

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

const prevMusic = () => {
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

const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds/60);
    const seconds = Math.floor(totalSeconds % 60);
    const updatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return musicDuration = `${minute}:${updatedSeconds}`;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
    console.log(Math.floor(audio.duration));
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
    currTime.textContent = calculateTime(progressBar.value);

})