function basicSetUP() {
  // 🎯 DOM References
  const desktop = document.getElementById("desktop");
  const menu = document.getElementById("contextMenu");
  const newItem = document.getElementById("new");
  const newItems = document.getElementsByClassName("newItems")[0];
  const folderOption = document.getElementById("folder-option");
  const foldersContainer = document.querySelector(".folders");
  const deleteItems = document.querySelector(".deleteItems");
  const renameBtn = document.querySelector("#renamebtn");
  const deleteFolder = document.querySelector("#deleteFolder");
  const view = document.querySelector("#view");
  const viewItems = document.querySelector(".view-options");
  const largeIcon = document.querySelector("#large-icon");
  const cutFolder = document.getElementById("cutFolder");
  const pasteFolder = document.getElementById("pasteFolder");

  let SelectedFolder = null;
  let cutElement = null;
  let pastePosition = { x: 0, y: 0 };

  // 📌 Helper: Hide all menus
  function hideMenus() {
    menu.classList.add("hidden");
    newItems.classList.add("hidden");
    viewItems.classList.add("hidden");
    deleteItems.classList.add("hidden");
  }

  // 📌 Helper: Show context menu at cursor position
  function showContextMenu(e) {
    pastePosition = { x: e.clientX, y: e.clientY };

    hideMenus();
    menu.classList.remove("hidden");
    menu.style.width = `${menu.getBoundingClientRect().width}px`;
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
  }

  // 🖱️ Desktop Right Click
  desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showContextMenu(e);
  });

  // ✨ Hide all menus on document click
  document.addEventListener("click", hideMenus);

  // 🧱 Show "New" submenu
  newItem.addEventListener("mouseenter", (e) => {
    e.preventDefault();

    viewItems.classList.add("hidden");
    newItems.classList.remove("hidden");

    const posLeft = menu.offsetLeft + menu.offsetWidth + 10;
    const posTop = menu.offsetTop + newItem.offsetTop;

    newItems.style.left = `${posLeft}px`;
    newItems.style.top = `${posTop}px`;

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

  function makeFolderDraggable(folder) {
    const container = document.querySelector(".folders");
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    folder.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      folder.style.position = "absolute"; // necessary for dragging
      offsetX = e.clientX - folder.offsetLeft;
      offsetY = e.clientY - folder.offsetTop;
      folder.style.zIndex = "1000"; // Bring to front
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const folderRect = folder.getBoundingClientRect();

      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Clamp positions so folder stays within container bounds
      newX = Math.max(
        0,
        Math.min(newX, containerRect.width - folder.offsetWidth)
      );
      newY = Math.max(
        0,
        Math.min(newY, containerRect.height - folder.offsetHeight)
      );

      folder.style.left = `${newX}px`;
      folder.style.top = `${newY}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      folder.style.zIndex = "auto";
    });
  }

  // 📁 Create New Folder
  folderOption.addEventListener("click", (event) => {
    event.stopPropagation();

    const folder = document.createElement("div");
    folder.className =
      "folder w-20 h-24 flex flex-col static items-center justify-center text-4xl cursor-pointer";
    folder.innerHTML = `📁<span class="text-xs mt-1 text-center">New Folder</span>`;
    foldersContainer.appendChild(folder);
    makeFolderDraggable(folder); // 👈 Hook in drag behavior
    hideMenus();

    folder.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      e.stopPropagation();
      SelectedFolder = folder;
      deleteItems.classList.remove("hidden");
      menu.classList.add("hidden");
    });
  });

  // 🗑️ Folder Context Menu Trigger
  foldersContainer.addEventListener("contextmenu", (e) => {
    const clickedFolder = e.target.closest(".folder");
    if (clickedFolder) {
      e.preventDefault();
      e.stopPropagation();
      SelectedFolder = clickedFolder;
      deleteItems.classList.remove("hidden");
      menu.classList.add("hidden");
    }
  });

  // ❌ Delete Folder
  deleteFolder.addEventListener("click", () => {
    if (SelectedFolder) {
      SelectedFolder.remove();
      SelectedFolder = null;
      deleteItems.classList.add("hidden");
    }
  });

  // ✏️ Rename Folder
  renameBtn.addEventListener("click", () => {
    if (!SelectedFolder) return;

    const selectedElement = SelectedFolder.querySelector("span");
    const oldName = selectedElement.innerHTML;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "text-xs mt-1 text-center w-16 border-4 text-black";
    input.value = oldName;

    SelectedFolder.replaceChild(input, selectedElement);
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") renameInputToSpan(input);
    });
  });

  // ✏️ Replace Input with Span
  function renameInputToSpan(inputElement) {
    const newName = inputElement.value.trim() || "untitled";

    const span = document.createElement("span");
    span.innerText = newName;
    span.className = "text-xs mt-1 text-center";

    inputElement.parentElement.replaceChild(span, inputElement);
    deleteItems.classList.add("hidden");
    SelectedFolder = null;
  }

  // 👀 Show View Options
  view.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    newItems.classList.add("hidden");
    viewItems.classList.remove("hidden");

    const menuLeft = menu.offsetLeft;
    const menuTop = menu.offsetTop;
    const menuWidth = menu.offsetWidth;

    viewItems.style.left = `${menuLeft + menuWidth + 10}px`;
    viewItems.style.top = `${menuTop + view.offsetTop}px`;

    if (e.clientY > window.innerHeight / 2) {
      viewItems.style.top = "auto";
      viewItems.style.bottom = `${window.innerHeight - e.clientY}px`;
    } else {
      viewItems.style.bottom = "auto";
    }

    if (e.clientX > window.innerWidth / 2) {
      viewItems.style.left = `${menuLeft - viewItems.offsetWidth - 10}px`;
    }
  });

  // ✂️ Cut Folder
  cutFolder.addEventListener("click", () => {
    if (SelectedFolder) {
      cutElement = SelectedFolder;
      cutElement.style.opacity = "0.5";
      deleteItems.classList.add("hidden");
      SelectedFolder = null;
    }
  });

  // 📋 Paste Folder
  pasteFolder.addEventListener("click", () => {
    if (cutElement) {
      cutElement.style.opacity = "1";
      cutElement.style.position = "absolute";
      cutElement.style.left = `${pastePosition.x}px`;
      cutElement.style.top = `${pastePosition.y}px`;

      foldersContainer.appendChild(cutElement); // ✅ FIX: Consistency in container
      cutElement = null;
    }
  });
}

export { basicSetUP };
