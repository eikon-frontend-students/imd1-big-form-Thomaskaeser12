lucide.createIcons();
const dropZone = document.getElementById("drop-zone");
const dropText = document.getElementById("drop-text");
const dropIcon = document.getElementById("drop-icon");
const fileInput = document.getElementById("file-input");

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file) showImagePreview(file);
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) showImagePreview(file);
});

function showImagePreview(file) {
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const label = dropZone.querySelector(".drop-label");
    label.style.display = "none";
    document.getElementById("reset-btn").style.display = "block";

    dropZone.style.backgroundImage = `url(${e.target.result})`;
    dropZone.style.backgroundSize = "contain";
    dropZone.style.backgroundRepeat = "no-repeat";
    dropZone.style.backgroundPosition = "center";
    dropZone.style.borderStyle = "none";
    dropZone.style.filter = "drop-shadow(0px 30px 40px rgba(77, 18, 18, 1))";
  };

  reader.readAsDataURL(file);
}

function resetDropZone() {
  const label = dropZone.querySelector(".drop-label");
  label.style.display = "flex";
  document.getElementById("reset-btn").style.display = "none";
  dropZone.style.removeProperty("background-image");
  dropZone.style.borderStyle = "dashed";

  dropZone.style.removeProperty("filter");

  fileInput.value = "";
}

const colorInput = document.getElementById("colorInput");
const formatSelect = document.getElementById("formatSelect");
const colorResult = document.getElementById("colorResult");

colorInput.addEventListener("input", updateDisplay);
formatSelect.addEventListener("change", updateDisplay);

colorInput.addEventListener("input", updateDisplay);
formatSelect.addEventListener("change", updateDisplay);

function updateDisplay() {
  const hex = colorInput.value;
  const format = formatSelect.value;
  let finalValue = hex;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const texteCouleur = luminance > 0.5 ? "#000000" : "#ffffff";

  if (format === "rgba") {
    finalValue = `rgba(${r}, ${g}, ${b}, 1)`;
  } else if (format === "hsl") {
    const { h, s, l } = rgbToHsl(r, g, b);
    finalValue = `hsl(${h}, ${s}%, ${l}%)`;
  }

  colorResult.innerText = finalValue;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function switchTab(id) {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.add("active");
  } else {
    console.error("La section avec l'id " + id + " n'existe pas !");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToNext(nextId) {
  const sections = ["launchPage", "step1", "step2", "lastPage"];
  const targetIndex = sections.indexOf(nextId);

  if (targetIndex !== -1 && navItems[targetIndex]) {
    switchTab(nextId, navItems[targetIndex]);
  }
}

btnNext.addEventListener("click", (e) => {
  e.preventDefault();

  section2.scrollIntoView({ behavior: "smooth" });

  section2.classList.add("active");
});

let estAppuye = false;

window.addEventListener("mousedown", () => {
  estAppuye = true;
});

window.addEventListener("mouseup", () => {
  estAppuye = false;
});
