const desktop = document.getElementById("desktop");
const menu = document.getElementById("contextMenu");
const newItem = document.getElementById("new");
const newItems = document.getElementsByClassName("newItems")[0];
const folderOption = document.getElementById("folder-option");
const foldersContainer = document.querySelector(".folders");

desktop.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  menu.classList.remove("hidden");
  newItems.classList.add("hidden");

  menu.style.left = `${e.clientX}px`;
  menu.style.top = `${e.clientY}px`;
  menu.style.bottom = "auto";

  if (e.clientY > window.innerHeight / 2) {
    menu.style.top = "auto";
    menu.style.bottom = `${window.innerHeight - e.clientY}px`;
  }

  if (e.clientX > window.innerWidth / 2) {
    menu.style.left = `${e.clientX - menu.offsetWidth}px`;
  }
});

document.addEventListener("click", () => {
  menu.classList.add("hidden");
  newItems.classList.add("hidden");
});

newItem.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  newItems.classList.remove("hidden");

  newItems.style.left = `${menu.offsetLeft + menu.offsetWidth + 10}px`;
  newItems.style.top = `${menu.offsetTop + newItem.offsetTop}px`;

  if (e.clientY > window.innerHeight / 2) {
    newItems.style.top = "auto";
    newItems.style.bottom = `${window.innerHeight - e.clientY}px`;
  } else {
    newItems.style.bottom = "auto";
  }

  if (e.clientX > window.innerWidth / 2) {
    newItems.style.left = `${menu.offsetLeft - newItems.offsetWidth - 10}px`;
  }
});

folderOption.addEventListener("click", (event) => {
  event.stopPropagation(); 

  const folder = document.createElement("div");
  folder.className =
    "folder w-20 h-24 flex flex-col items-center justify-center text-4xl cursor-pointer";
  folder.innerHTML = `📁<span class="text-xs mt-1 text-center">New Folder</span>`;
  foldersContainer.appendChild(folder);

  menu.classList.add("hidden");
  newItems.classList.add("hidden");
});

const now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
console.log(date);
console.log(time);
