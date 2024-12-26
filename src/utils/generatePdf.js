import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const defaultOptions = {
  quality: "medium",
  scale: 1,
  imageCompression: "MEDIUM",
  pageBreak: true,
  fileName: "document",
  orientation: "portrait",
  unit: "mm",
  format: "a4",
};

const qualitySettings = {
  low: { scale: 1, compression: "FAST" },
  medium: { scale: 2, compression: "MEDIUM" },
  high: { scale: 3, compression: "SLOW" },
};

const htmlToCanvas = async (elementRef, scale = 1) => {
  const canvas = await html2canvas(elementRef, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });
  return {
    canvas,
    imgData: canvas.toDataURL("image/png"),
  };
};

const getPages = async (elementRef, scale) => {
  const pages = Array.from(elementRef.children);
  return Promise.all(pages.map((page) => htmlToCanvas(page, scale)));
};

const generatePDF = async (reportTemplateRef, options = {}) => {
  const settings = { ...defaultOptions, ...options };
  const { scale, compression } = qualitySettings[settings.quality];

  const pdf = new jsPDF({
    orientation: settings.orientation,
    unit: settings.unit,
    format: settings.format,
  });

  const pageImages = await getPages(reportTemplateRef, scale);
  const imgWidth = pdf.internal.pageSize.getWidth();

  pageImages.forEach(({ imgData, canvas }, index) => {
    if (index > 0 && settings.pageBreak) {
      pdf.addPage();
    }

    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", compression);
  });

  pdf.save(`${settings.fileName}.pdf`);
  return pdf;
};

export default generatePDF;
