// Obtain the DOM elements

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const ranges = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('[data-skip]')
const fullscreenBtn = player.querySelector('.fullscreen__button')

// Build the functions

function togglePlay() {
	video.paused ? video.play() : video.pause()
}

function updateButton() {
	toggle.textContent = video.paused ?  '►' : '❚ ❚'
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
	video.currentTime = scrubTime
}

function handleRanges() {
	video[this.name] = this.value
}

function handleFullscreen() {
	if (!document.fullscreenElement) {
		player.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
}

// Apply the event listeners

video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

ranges.forEach(rng => {
	rng.addEventListener('change', handleRanges)
	rng.addEventListener('mousemove', handleRanges)
})

skipButtons.forEach(btn => btn.addEventListener('click', skip))

fullscreenBtn.addEventListener('click', handleFullscreen)