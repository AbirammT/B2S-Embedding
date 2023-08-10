console.log("zzz");

let viz;

//  1. Create a variable to store vizcontainer

const vizBox = document.getElementById("vizContainer");

//  2. Create a dashboard options variable

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

//  3. Create something which holds the url of the viz

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-GB&:display_count=n&:origin=viz_share_link";

//  4. Define function to build dashboard

function initViz() {
  viz = new tableau.Viz(vizBox, url, options);
}

//  5. Controlling when the function is run

document.addEventListener("DOMContentLoaded", initViz);

//  6. Adding PDF export button functionality
document.addEventListener("DOMContentLoaded", function () {
  const exportPDFbutton = document.getElementById("exportPDF");

  exportPDFbutton.addEventListener("click", exportPDFfunction);

  function exportPDFfunction() {
    viz.showExportPDFDialog();
  }
});

//  7. Adding Ppt export button functionality

document.addEventListener("DOMContentLoaded", function () {
  const exportPPTbutton = document.getElementById("exportPPT");

  exportPPTbutton.addEventListener("click", exportPPTfunction);

  function exportPPTfunction() {
    viz.showExportPowerPointDialog();
  }
});

//  8. Add Filtering to dashboard

document.addEventListener("DOMContentLoaded", function () {
  function getRangeValues() {
    const minValue = document.getElementById("minValue").value;
    const maxValue = document.getElementById("maxValue").value;
    const workbook = viz.getWorkbook();
    const activeSheet = workbook.getActiveSheet();
    const sheets = activeSheet.getWorksheets();
    // Apply filtering
    const sheetToFilter = sheets[1];
    sheetToFilter
      .applyRangeFilterAsync("SUM(Sales)", {
        min: minValue,
        max: maxValue,
      })
      .then(alert("Viz Filtered!"));
  }

  const applyFilterButton = document.getElementById("applyFilter");

  applyFilterButton.addEventListener("click", getRangeValues);
});
