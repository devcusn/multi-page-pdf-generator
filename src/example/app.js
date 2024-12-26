import generatePDF from "../utils/generatePdf.js";

const downloadPDFButton = document.getElementById("download-pdf-btn");
const pdfRef = document.getElementById("report-template");

const initEventListener = () => {
  downloadPDFButton.addEventListener("click", () => {
    generatePDF(pdfRef, "report");
  });
};

initEventListener();
