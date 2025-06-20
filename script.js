  const desktop = document.getElementById("desktop");
    const menu = document.getElementById("contextMenu");

    desktop.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      menu.style.left = `${e.clientX}px`;
      menu.style.top = `${e.clientY}px`;
      menu.classList.remove("hidden");
    });

    document.addEventListener("click" , () => {
      menu.classList.add("hidden");
    });