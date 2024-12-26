# HTML to PDF Generator

A utility for converting HTML content into PDF documents with multi-page support.

## Features

- Converts HTML elements to PDF pages
- Maintains aspect ratio and quality
- Supports multiple pages
- Dynamic canvas rendering
- Configurable image quality

## Installation

```bash
npm install jspdf html2canvas
```

## Usage

```javascript
import generatePDF from "./generatePDF";

// Reference your HTML container
const container = document.getElementById("pdf-container");

// Generate PDF
generatePDF(container, "output-filename");
```

## Running Example Project

To run the example project, use:

```bash
npx webpack --config webpack.config.js
```

## API

### generatePDF(elementRef, pdfName)

- `elementRef`: DOM element containing pages to convert
- `pdfName`: Output PDF filename (without extension)

## CSS Requirements

Add `.page` class to each page container:

```css
.page {
  width: 800px;
  aspect-ratio: 210/297;
  background-color: #ffffff;
  border: 1px solid #cccccc;
}
```

## Dependencies

- jsPDF
- html2canvas
