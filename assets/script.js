
//  accounticon

 document.addEventListener("DOMContentLoaded", function () {
    const icon = document.getElementById('accountIcon');
    const menu = document.getElementById('accountMenu');

    icon.addEventListener('click', (e) => {
      e.stopPropagation(); 
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
      if (!icon.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
      }
    });
  });

// main section
  const fileInput = document.getElementById('excelUpload');
  const manualInput = document.getElementById('manualNumbers');
  const countryCodeInput = document.getElementById('countryCode');
  const previewList = document.getElementById('numberPreview');

  let excelEntries = [];
  let manualEntries = [];

  function renderPreview() {
    previewList.innerHTML = '';

    const code = countryCodeInput.value.trim() || '+91';

    excelEntries.forEach((row, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      const updatedRow = row.map(cell => (typeof cell === 'number' || /^\d+$/.test(cell)) ? `${code}${cell}` : cell);
      li.textContent = `Excel Row ${index + 1}: ${updatedRow.join(', ')}`;
      previewList.appendChild(li);
    });

    manualEntries.forEach((num, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-info';
      li.textContent = `Manual Entry ${index + 1}: ${code}${num}`;
      previewList.appendChild(li);
    });
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      excelEntries = json.filter(row => row.length);
      renderPreview();
    };
    reader.readAsArrayBuffer(file);
  });

  manualInput.addEventListener('input', () => {
    manualEntries = manualInput.value
      .split(/[\n,]+/)
      .map(num => num.trim())
      .filter(num => num.length > 0);
    renderPreview();
  });

  countryCodeInput.addEventListener('input', () => {
    renderPreview(); 
  });


// spiiner

  window.addEventListener("load", function () {
    setTimeout(function () {
      const splash = document.getElementById("splashScreen");
      splash.style.opacity = 0;
      splash.style.transition = "opacity 0.5s ease";
      setTimeout(() => splash.style.display = "none", 500);
    }, 1000); 
  });


// clear all button
 document.getElementById("clearAllBtn").addEventListener("click", function () {
    document.querySelectorAll("input").forEach(input => {
      if (input.type === "file" || input.type === "text" || input.type === "number" || input.type === "datetime-local") {
        input.value = "";
      }
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      }
    });

    document.querySelectorAll("textarea").forEach(textarea => {
      textarea.value = "";
    });

    document.querySelectorAll("select").forEach(select => {
      select.selectedIndex = 0;
    });

    const numberPreview = document.getElementById("numberPreview");
    if (numberPreview) numberPreview.innerHTML = "";
  });





  
const translations = {
  en: {
    makeBulk: "Make the bulk Message",
    uploadLabel: "Upload Excel File (CSV or XLSX)",
    launchCampaign: "LAUNCH CAMPAIGN",
    addAccount: "ADD NEW ACCOUNT",
    settings: "Settings",
    groupMessage: "Group Message",
    campaignName: "Name Your Campaign"
    // Add more keys...
  },
  ml: {
    makeBulk: "ബൾക്ക് സന്ദേശം അയയ്ക്കുക",
    uploadLabel: "എക്സൽ ഫയൽ അപ്‌ലോഡ് ചെയ്യുക (CSV അല്ലെങ്കിൽ XLSX)",
    launchCampaign: "പ്രചാരണം ആരംഭിക്കുക",
    addAccount: "പുതിയ അക്കൗണ്ട് ചേർക്കുക",
    settings: "ക്രമീകരണങ്ങൾ",
    groupMessage: "ഗ്രൂപ്പ് സന്ദേശം",
    campaignName: "നിങ്ങളുടെ പ്രചാരണത്തിന് പേരിടുക"
    // Add more keys...
  }
};

function updateLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  document.getElementById("languageSelect").addEventListener("change", function () {
    const selectedLang = this.value;
    updateLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang); // Save preference
  });

  // Load preferred language on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    document.getElementById("languageSelect").value = savedLang;
    updateLanguage(savedLang);
  });


  