const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playlistButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//index sarki icin

let index

//dongu
let loop = true

//karistirici actik mi?
let isShuffleActive = false

//sarki listesi
const songList = [

    {
        name: "Ax u Eman",
        link: "mp3 player-images/Ciwan Haco - Ax U Eman.mp3",
        artist: "Ciwan Haco",
        image: "mp3 player-images/ciwan.jpg"
    },
    {
        name: "Set Fire To The Rain Live at The Royal Albert",
        link: "mp3 player-images/Adele - Set Fire To The Rain Live at The Royal Albert Hall.mp3",
        artist: "Adele",
        image: "mp3 player-images/adele.jpg"
    },
    {
        name: "Perfect Official",
        link: "mp3 player-images/Ed Sheeran - Perfect Official Music Video.mp3",
        artist: "Ed Sheeran",
        image: "mp3 player-images/edd.jpg"
    },
    {
        name: "Keziyên Yarê",
        link: "mp3 player-images/Mem ARARAT - Keziyên Yarê.mp3",
        artist: "Mem ARARAT",
        image: "mp3 player-images/Mem ararat.jpg"
    }
]


//zaman formatı ayarlama

const timeFormatter = (timeInput) => {

    let minute = Math.floor(timeInput/60)
    minute = minute < 10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0"+second : second
    return `${minute}:${second}`
}







//sarkiyi çalma
const playAudio = () =>{
    console.log("playAudio")
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}


//setSong(1) müziği calar


//sarki atama

const setSong = (arrayIndex) => {
    if (loop == true && isShuffleActive == true) {
        arrayIndex = Math.floor(Math.random() * songList.length);
    }
    console.log(arrayIndex + isShuffleActive);

    let { name, link, artist, image } = songList[arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;

    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
    playListContainer.classList.add("hide");
    playAudio();
};







//siradakini cal

const nextSong = () =>{

    if (loop) {
        if (index == (songList.length - 1)) {
            index = 0
        }else {

            index+=1
        }
        setSong(index)

        
    }else{
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
    }


}

playlistButton.addEventListener('click', () =>{

    playListContainer.classList.remove('hide')
})


const pauseAudio = () => {

    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}


setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3))* 100 + "%"
    
}, 1000);


progressBar.addEventListener("click",(event) =>{

    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX
    let progress = (coordEnd-coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progressBar * 100 + "%"

    audio.currentTime = progress * audio.duration
    audio.play()

    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

    console.log(progressBar)


})


closeButton.addEventListener('click', () =>{
    playListContainer.classList.add('hide')
})

const previousSong = () => {
    console.log(index)
    if (index > 0) {
        index-=1
        
    }else{
        index = songList.length - 1 //3
    }

    setSong(index)
    playAudio()
}

repeatButton.addEventListener('click',()=>{

    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('tekrar kapatildi')

        
    }else{
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acildi')
    }
})


shuffleButton.addEventListener('click',()=>{

    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('tekrar kapatildi')

        
    }else{
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('tekrar acildi')
    }
})

const initializePlaylist = () => {
    for (let i in songList) {
        playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
            <div class="playlist-image-container"> 
                <img src="${songList[i].image}"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">${songList[i].name}</span>
                <span id="playlist-song-artist-album">${songList[i].artist}</span>
            </div>
        </li>`;
    }
};

//tiklama yaklama

nextButton.addEventListener('click',nextSong)

pauseButton.addEventListener('click',pauseAudio)

playButton.addEventListener('click',playAudio)

prevButton.addEventListener('click',previousSong)



//sarki bitisini yakala

audio.onended = () => {
    nextSong()
}

audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})



//ekran yuklenildiğnde

window.onload = () => {
    index = 0
    setSong(index)

    //durdur ve sarki listesi olustur


    pauseAudio()
    initializePlaylist()
}



