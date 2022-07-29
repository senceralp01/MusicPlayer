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
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});


function displayMusic (music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file; // dikkat! ses dosyası

}

play.addEventListener("click", () => {
    const isPlaying = container.classList.contains("playing");
    isPlaying ? pauseMusic() : playMusic();
});


next.addEventListener("click", () => { nextMusic(); })


prev.addEventListener("click", () => { prevMusic(); })

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}


// function playMusic(){
//     container.classList.add("playing");
//     audio.play();
// }
const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

// function pauseMusic(){
//     container.classList.remove("playing");
//     audio.pause();
// }
const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
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
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
    currTime.textContent = calculateTime(progressBar.value);
});


let volumeStatus = "high";
let volumeValue = 100;

volumeBar.addEventListener("input", (e) => {
    volumeValue = e.target.value;
    audio.volume = volumeValue / 100;
    if (volumeValue == 0){
        audio.muted = true;
        volumeStatus = "muted";
        volume.classList = "fa-solid fa-volume-xmark me-2";
    }
    else{
        audio.muted = false;
        volumeStatus = "high";
        volume.classList = "fa-solid fa-volume-high me-2";
    }
});

volume.addEventListener("click", () => {
    if(volumeStatus === "high"){
        audio.muted = true;
        volumeStatus = "muted";
        volume.classList = "fa-solid fa-volume-xmark me-2";
        volumeBar.value = 0;
    }else{
        audio.muted = false;
        volumeStatus = "high";
        volume.classList = "fa-solid fa-volume-high me-2";
        volumeBar.value = volumeValue;
    }
});

const displayMusicList = (list) => {
    for (let i=0; i<list.length; i++){
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        `;
        ul.insertAdjacentHTML("beforeend", liTag);
        
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioFile = ul.querySelector(`.music-${i}`);

        liAudioFile.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioFile.duration);
        });
    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();

}

const isPlayingNow = () => {
    for (let li of ul.querySelectorAll("li")){
        
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})