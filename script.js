const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


// SONG TITLES 
const songs = ['Do I Wanna Know', 'After Hours', 'G-Unit'];

// TRACKING SONGS
let songIndex = 1;

// INTIAL SONG LOADING
loadSong(songs[songIndex]);

// UPDATE SONG DETAILS
function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// PLAY SONG
function playSong(){
musicContainer.classList.add('play')
playBtn.querySelector('i.fas').classList.remove('fa-play')
playBtn.querySelector('i.fas').classList.add('fa-pause')

audio.play()
}

// PAUSE SONG
function pauseSong(){
musicContainer.classList.remove('play')
playBtn.querySelector('i.fas').classList.add('fa-play')
playBtn.querySelector('i.fas').classList.remove('fa-pause')

audio.pause()
}

// PREV SONG
function prevSong(){
songIndex--

if(songIndex < 0){
    songIndex = songs.length - 1
}

loadSong(songs[songIndex])
playSong()
}

// NEXT SONG
function nextSong(){
songIndex++

if(songIndex > songs.length - 1){
songIndex = 0
}

loadSong(songs[songIndex])
playSong()
}

// UPDATE PROGRESS BAR
function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// SET PROGRESS BAR
function setProgress(e){
const width = this.clientWidth
const clickX = e.offsetX
const duration = audio.duration

audio.currentTime = (clickX / width) * duration
}


// EVENT LISTENERS
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')
    
    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
    
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)



