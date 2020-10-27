const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Function for Play and Pause
function togglePlay() {
  const action = video.paused ? "play" : "pause";
  video[action]();
}

// Function for updating button
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

// Function for Skipping based on button clicked
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to update volume/playback speed
function handleUpdateRange() {
  video[this.name] = this.value;
}

// Function to update progress bar
function handleProgress() {
  const currentCompletion = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${currentCompletion}%`;
}

// Function to scrub based on mouse movement
function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// If clicked on Video pause/play
video.addEventListener("click", togglePlay);
// If clicked on button pause/play
toggle.addEventListener("click", togglePlay);
// If Playing, update botton with pause symbol
video.addEventListener("play", updateButton);
// If paused , update button with Play symbol
video.addEventListener("pause", updateButton);
// listen to listen to progress
video.addEventListener("timeupdate", handleProgress);
skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleUpdateRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
