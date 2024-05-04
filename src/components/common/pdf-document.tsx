import { useResizeObserver } from '@/hooks/observer-hook';
import { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/libs/pdf.js@3.11.174/pdf.worker.min.js';

const pdfDocumentOptions = {
  withCredentials: true,
};

export type PDFDocumentProps = {
  file: string;
};

type PDFDocumentProxy = {
  numPages: number;
};

export const PDFDocument = ({ file }: PDFDocumentProps) => {
  const [pageNumbers, setPageNumbers] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const onResize = useCallback((target: HTMLDivElement) => {
    setWidth(target.clientWidth);
  }, []);
  const ref = useResizeObserver(onResize);

  const onLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setPageNumbers(numPages);
  };

  return (
    <div
      className="flex-1"
      ref={ref}
    >
      <Document
        file={file}
        options={pdfDocumentOptions}
        onLoadSuccess={onLoadSuccess}
      >
        {Array.from(Array(pageNumbers).keys()).map((i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={width}
          />
        ))}
      </Document>
    </div>
  );
};
