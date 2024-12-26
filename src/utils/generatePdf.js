import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const htmlToCanvas = async (elementRef) => {
  const canvas = await html2canvas(elementRef, {
    scale: 1,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  return { canvas, imgData };
};

const getPages = async (elementRef) => {
  const childs = Array.from(elementRef.children);
  const pages = [];
  const pageImages = [];

  childs.forEach((child) => {
    pages.push(child);
  });

  for (const item of pages) {
    const result = await htmlToCanvas(item);
    pageImages.push(result);
  }
  return pageImages;
};

const generatePDF = async (reportTemplateRef, pdfName) => {
  const pageImages = await getPages(reportTemplateRef);
  const pdf = new jsPDF();

  pageImages.forEach(({ imgData, canvas }, index) => {
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    // pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", "FAST"); low quality,faster
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    if (index !== pageImages.length - 1) pdf.addPage();
  });

  pdf.save(`${pdfName}.pdf`);
};

export default generatePDF;
