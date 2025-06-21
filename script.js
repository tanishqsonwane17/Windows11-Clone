const desktop = document.getElementById("desktop");
const menu = document.getElementById("contextMenu");
const newItem = document.getElementById("new");
const newItems = document.getElementsByClassName("newItems")[0];
const folderOption = document.getElementById("folder-option");
const foldersContainer = document.querySelector(".folders");
const deleteItems = document.querySelector('.deleteItems')
const renamebtn = document.querySelector('#renamebtn')
const deleteFolder = document.querySelector('#deleteFolder')
desktop.addEventListener("contextmenu", function (e) {
  e.preventDefault();

  newItems.classList.add("hidden");
  menu.classList.remove("hidden");
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

let SelectedFolder = null

foldersContainer.addEventListener("contextmenu", function (e) {
  const clickedFolder = e.target.closest(".folder");
  if (clickedFolder) {
    e.preventDefault(); 
    e.stopPropagation();
    SelectedFolder = clickedFolder
    deleteItems.classList.remove("hidden"); 
    menu.classList.add("hidden"); 
  }
  
});

deleteFolder.addEventListener('click',function(){
  if(SelectedFolder){
    SelectedFolder.remove()
    SelectedFolder = null
    deleteItems.classList.add('hidden')
  }
})
  renamebtn.addEventListener('click',function(){
    if(!SelectedFolder) return
      const selectedElement = SelectedFolder.querySelector('span')
      let oldName = selectedElement.innerHTML;

      let input = document.createElement('input')
      input.type = 'text'
      input.className= 'text-xs mt-1 text-center w-16 border-4 text-black'
      input.value = oldName
  SelectedFolder.replaceChild(input, selectedElement);
    input.focus();
    input.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
      renameInputToSpan(input);
    }
  });
  })
  function renameInputToSpan(inputElement) {
  let newName = inputElement.value.trim();

  if (newName ==='') {
    newName = 'untitled';
  }
 
  const span = document.createElement('span');
   inputElement.parentElement.replaceChild(span, inputElement);
  span.innerText = newName;
  span.className = 'text-xs mt-1 text-center';



  deleteItems.classList.add('hidden');




  SelectedFolder = null;
}