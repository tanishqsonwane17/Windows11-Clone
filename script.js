
const desktop = document.getElementById("desktop");
const menu = document.getElementById("contextMenu");
const newItem = document.getElementById("new");
const newItems = document.querySelector(".newItems");
const folderOption = document.getElementById("folder-option");
const foldersContainer = document.querySelector(".folders");
const deleteItems = document.querySelector(".deleteItems");
const renamebtn = document.getElementById("renamebtn");
const deleteFolder = document.getElementById("deleteFolder");
const view = document.getElementById("view");
const viewItems = document.querySelector(".view-options");
const cutFolder = document.getElementById("cutFolder");
const pasteFolder = document.getElementById("pasteFolder");
const refreshBtn = document.getElementById("refresh");
const fileIcon = document.getElementById("fileIcon");
const fileExplorer = document.getElementById("file-explorer");
const pathBar = document.getElementById("pathBar");
const closeExplorer = document.getElementById("closeExplorer");

let pastePosition = { x: 0, y: 0 };
let SelectedFolder = null;
let cutElement = null;
let currentExplorerFolder = "Desktop";

const folderData = {
  Desktop: [{ type: "folder", name: "Projects" }, { type: "file", name: "notes.txt" }],
  Documents: [{ type: "file", name: "Resume.docx" }, { type: "file", name: "Invoice.pdf" }],
  Downloads: [{ type: "file", name: "setup.exe" }, { type: "file", name: "video.mp4" }],
  Pictures: [{ type: "file", name: "photo1.jpg" }, { type: "file", name: "selfie.png" }]
};

desktop.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  pastePosition = { x: e.clientX, y: e.clientY };

  [newItems, viewItems, deleteItems].forEach(el => el.classList.add("hidden"));
  menu.classList.remove("hidden");
  menu.style.left = `${e.clientX}px`;
  menu.style.top = `${e.clientY}px`;

  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) menu.style.left = `${window.innerWidth - rect.width - 10}px`;
  if (rect.bottom > window.innerHeight) menu.style.top = `${window.innerHeight - rect.height - 10}px`;
});

refreshBtn.addEventListener("click", () => location.reload());

folderOption.addEventListener("click", (e) => {
  e.stopPropagation();
  const folder = document.createElement("div");
  folder.className = "folder w-20 h-24 flex flex-col items-center justify-center text-4xl cursor-pointer";
  folder.innerHTML = `📁<span class="text-xs mt-1 text-center">New Folder</span>`;

  folder.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    e.stopPropagation();
    SelectedFolder = folder;
    [menu].forEach(el => el.classList.add("hidden"));
    deleteItems.classList.remove("hidden");
    deleteItems.style.left = `${e.clientX}px`;
    deleteItems.style.top = `${e.clientY}px`;

    const rect = deleteItems.getBoundingClientRect();
    if (rect.right > window.innerWidth) deleteItems.style.left = `${window.innerWidth - rect.width - 10}px`;
    if (rect.bottom > window.innerHeight) deleteItems.style.top = `${window.innerHeight - rect.height - 10}px`;
  });

  foldersContainer.appendChild(folder);
  [menu, newItems].forEach(el => el.classList.add("hidden"));
});


deleteFolder.addEventListener('click', () => {
  if (SelectedFolder) {
    SelectedFolder.remove();
    SelectedFolder = null;
    deleteItems.classList.add('hidden');
  }
});

renamebtn.addEventListener('click', () => {
  if (!SelectedFolder) return;
  const span = SelectedFolder.querySelector('span');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.innerText;
  input.className = 'text-xs mt-1 text-center w-16 border-2 text-black';
  SelectedFolder.replaceChild(input, span);
  input.focus();

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const newName = input.value.trim() || "untitled";
      const newSpan = document.createElement("span");
      newSpan.className = 'text-xs mt-1 text-center';
      newSpan.innerText = newName;
      input.parentElement.replaceChild(newSpan, input);
      deleteItems.classList.add("hidden");
      SelectedFolder = null;
    }
  });
});

view.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  viewItems.classList.remove("hidden");
  newItems.classList.add("hidden");

  viewItems.style.left = `${menu.offsetLeft + menu.offsetWidth + 10}px`;
  viewItems.style.top = `${menu.offsetTop + view.offsetTop}px`;

  const rect = viewItems.getBoundingClientRect();
  if (rect.right > window.innerWidth) viewItems.style.left = `${menu.offsetLeft - viewItems.offsetWidth - 10}px`;
  if (rect.bottom > window.innerHeight) viewItems.style.top = `${window.innerHeight - viewItems.offsetHeight - 10}px`;
});

cutFolder.addEventListener("click", () => {
  if (SelectedFolder) {
    cutElement = SelectedFolder;
    cutElement.style.opacity = "0.5";
    deleteItems.classList.add("hidden");
    SelectedFolder = null;
  }
});

pasteFolder.addEventListener("click", () => {
  if (cutElement) {
    cutElement.style.opacity = "1";
    cutElement.style.position = "absolute";
    cutElement.style.left = `${pastePosition.x}px`;
    cutElement.style.top = `${pastePosition.y}px`;
    desktop.appendChild(cutElement);
    cutElement = null;
  }
});

newItem.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  viewItems.classList.add("hidden");
  newItems.classList.remove("hidden");

  newItems.style.left = `${menu.offsetLeft + menu.offsetWidth + 10}px`;
  newItems.style.top = `${menu.offsetTop + newItem.offsetTop}px`;

  const rect = newItems.getBoundingClientRect();
  if (rect.right > window.innerWidth) newItems.style.left = `${menu.offsetLeft - newItems.offsetWidth - 10}px`;
  if (rect.bottom > window.innerHeight) newItems.style.top = `${window.innerHeight - newItems.offsetHeight - 10}px`;
});


document.addEventListener("click", () => {
  [menu, newItems, viewItems, deleteItems].forEach(el => el.classList.add("hidden"));
});


function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  const formattedDate = now.toLocaleDateString('en-IN');

  document.querySelector('.dateandtime p:nth-child(1)').textContent = formattedTime;
  document.querySelector('.dateandtime p:nth-child(2)').textContent = formattedDate;
}
setInterval(updateClock, 1000);
updateClock();

navigator.getBattery().then(function(battery) {
  updateBatteryStatus(battery);
  battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
  battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));
});

function updateBatteryStatus(battery) {
  const icon = document.getElementById("battery-icon");
  const level = Math.round(battery.level * 100);
  const isCharging = battery.charging;
  icon.className = "mt-1 text-[13px]";

  let iconClass = level >= 80 ? "ri-battery-2-fill" :
     level >= 60 ? "ri-battery-3-fill" :
     level >= 40 ? "ri-battery-2-line" :
     level >= 20 ? "ri-battery-low-line" : "ri-battery-line text-red-500";

  if (isCharging) icon.classList.add("text-green-400");
  else icon.classList.remove("text-green-400");

  icon.classList.add(iconClass);
  icon.innerHTML = `&nbsp;${level}%`;
}

fileIcon.addEventListener("click", () => {
  fileExplorer.classList.remove("hidden");
  currentExplorerFolder = "Desktop";
  pathBar.value = "This PC > Desktop";
  renderExplorerContent("Desktop");
});

closeExplorer.addEventListener("click", () => fileExplorer.classList.add("hidden"));

document.querySelectorAll("#file-explorer .sidebar-item").forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.dataset.name;
    currentExplorerFolder = name;
    pathBar.value = `This PC > ${name}`;
    renderExplorerContent(name);
  });
});

function renderExplorerContent(folderName) {
  const container = document.querySelector("#file-explorer .folder-grid");
  container.innerHTML = "";

  folderData[folderName]?.forEach((item) => {
    const div = document.createElement("div");
    div.className = "flex flex-col items-center text-center cursor-pointer";
    div.innerHTML = `<div class="text-5xl">${item.type === "folder" ? "📁" : "📄"}</div><p class="text-xs mt-1">${item.name}</p>`;

    if (item.type === "folder") {
      div.addEventListener("dblclick", () => {
        currentExplorerFolder = item.name;
        folderData[currentExplorerFolder] ||= [];
        pathBar.value = `This PC > ${currentExplorerFolder}`;
        renderExplorerContent(currentExplorerFolder);
      });
    }

    container.appendChild(div);
  });
}
const wallpapers = [
 "url('https://plus.unsplash.com/premium_photo-1669981123704-5836330e3ddd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2luZG93cyUyMDEwJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww')",
  "url('https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?cs=srgb&dl=pexels-pixabay-33545.jpg&fm=jpg')",
  "url('https://i.ytimg.com/vi/9F0sGWGSWe4/maxresdefault.jpg')"
];
let currentWallpaperIndex = 0;
const changeWallpaperBtn = document.getElementById("changeWallpaper");

changeWallpaperBtn.addEventListener("click", () => {
  currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
  desktop.style.backgroundImage = wallpapers[currentWallpaperIndex];
  desktop.style.backgroundSize = "cover";
  desktop.style.backgroundPosition = "center";

  menu.classList.add("hidden");
});
desktop.style.backgroundImage = wallpapers[0];
desktop.style.backgroundSize = "cover";
desktop.style.backgroundPosition = "center";
