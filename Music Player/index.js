const musicContainer=document.querySelector('.music-container')
const playBtn=document.querySelector('#play')
const prevBtn=document.querySelector('#prev')
const nextBtn=document.querySelector('#next')
const audio=document.querySelector('#audio')
const progress=document.querySelector('.progress')
const progressContainer=document.querySelector('.progress-container')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')

// song titles
const songs=['Peaches', 'Hotline Bling', 'Laugh now cry later', 'Blinding Lights', 'Hanging','My Eyes', 'Cradled In Love']

// keep track of songs
let songIndex=0;

// initially load song info dom 
loadSong(songs[songIndex])

// update the song details
function loadSong(song)
{
    title.innerText=songIndex+1+".  "+ song
    // audio.src = `music/${song}.mp3`;
    // cover.src = `images/${song}.jpg`;
    
    audio.src="music/"+song+".mp3";
    cover.src="images/"+song+".jpg";

}

function playSong()
{
    musicContainer.classList.add('play')
    // being more specific over here
    playBtn.querySelector('.fas').classList.remove('fa-play')
    playBtn.querySelector('.fas').classList.add('fa-pause')
    
    // audio is the object that we selected and play is the property
    audio.play();
    

}

function pauseSong()
{
    musicContainer.classList.remove('play')
    playBtn.querySelector('.fas').classList.remove('fa-pause')
    playBtn.querySelector('.fas').classList.add('fa-play')

    audio.pause()
}

function prevSong()
{
 songIndex--;

 if(songIndex<0)
 {
     songIndex=songs.length-1
 }
  
 loadSong(songs[songIndex])

 playSong();
 

}

function nextSong()
{
    songIndex++;

 if(songIndex>songs.length-1)
 {
     songIndex=0
 }
  
 loadSong(songs[songIndex])

 playSong();
 
}

function updateProgress(event)
{
    // give the current time of song 
    // console.log(event.srcElement.currentTime);
    // console.log(event.srcElement.duration);

    const {currentTime,duration}= event.srcElement;
    const progressPercent= (currentTime/duration)*100;

    progress.style.width=progressPercent+"%";
}

function setProgress(event)
{ 
//   currentTime and duration are 2 imp properties being used here 

    const width=this.clientWidth;
    console.log(width);

    const clickX=event.offsetX;
    console.log(clickX);

    const duration = audio.duration

    // setting the current time 
    audio.currentTime=(clickX/width)*duration
    
}


// events
playBtn.addEventListener('click',() => {
      const isPlaying=musicContainer.classList.contains('play');

      if(isPlaying)
      {
          pauseSong();
      }

      else
      {
          playSong()
      }
})

// change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// timeUpdate event by audio/video api
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

// ended event by audio api
audio.addEventListener('ended', nextSong);