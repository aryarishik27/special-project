const title = document.querySelector(".title");
const audio_link = document.querySelector(".audio");
const cover_link = document.querySelector(".cover-image");
const form = document.querySelector("form");
const container = document.querySelector(".container");

const audioInfo = localStorage.getItem("audioInfo")
  ? JSON.parse(localStorage.getItem("audioInfo"))
  : [];
console.table(audioInfo);
let counting = 1;

function showAllAudio() {
  audioInfo.forEach((value, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "audio-value");

    const span1 = document.createElement("span");
    span1.textContent = value.counting;
    div.append(span1);

    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "cover-image-div");
    const img = document.createElement("img");
    img.src = value.cover_link;
    imgDiv.append(img);

    const pTitle = document.createElement("p");
    pTitle.textContent = value.title;
    imgDiv.append(pTitle);
    div.append(imgDiv);

    const span2 = document.createElement("span");
    span2.innerText = value.counting; // Corrected play count
    div.append(span2);

    const audio = document.createElement("audio");
    audio.setAttribute("preload", "metadata");
    audio.src = value.audio_link;
    audio.controls = true;

    let minutes, extraSecond, durationInSecond;
    const span3 = document.createElement("span");
    audio.onloadedmetadata = () => {
      durationInSecond = audio.duration;
      minutes = Math.floor(durationInSecond / 60);
      extraSecond = Math.floor(durationInSecond % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      extraSecond = extraSecond < 10 ? "0" + extraSecond : extraSecond;
      span3.textContent = `${minutes}:${extraSecond}`; // Corrected duration display
    };
    div.append(span3);
    div.appendChild(audio);
    container.append(div);
  });
}

showAllAudio();

function removeAudio() {
  audioInfo.forEach(() => {
    const div = document.querySelector(".audio-value");
    div.remove();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeAudio();
  audioInfo.push({
    title: title.value,
    audio_link: audio_link.value,
    cover_link: cover_link.value,
    counting: counting,
  });
  counting += 1;
  localStorage.setItem("audioInfo", JSON.stringify(audioInfo));
  showAllAudio();
});
