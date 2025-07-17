# British CV PDF Feature

This feature allows users to generate and download their CV in a professional British format as a PDF document.

## Features

- Professional British CV template
- PDF generation with proper formatting
- Download functionality
- Responsive design
- TypeScript support
- Unit tests

## Components

### 1. BritishCVTemplate

The main PDF template component that defines the layout and styling of the British CV.

Location: `src/components/pdf/BritishCVTemplate.tsx`

### 2. DownloadBritishCVButton

A reusable button component that triggers the PDF generation and download.

Location: `src/components/pdf/DownloadBritishCVButton.tsx`

### 3. PDF Service

Service functions for generating and downloading PDFs.

Location: `src/services/pdfService.ts`

## Usage

```typescript
import { DownloadBritishCVButton } from '@/components/pdf/DownloadBritishCVButton';
import { BritishCV } from '@/types/british-cv';

const cvData: BritishCV = {
  // ... CV data
};

function MyComponent() {
  return (
    <DownloadBritishCVButton
      data={cvData}
      filename="my-cv.pdf"
      variant="contained"
      color="primary"
      size="medium"
    />
  );
}
```

## Required Fonts

The PDF generation requires Arial fonts. Place the following files in the `public/fonts` directory:

- `Arial.ttf`
- `Arial-Bold.ttf`

See `public/fonts/README.md` for more information about obtaining these fonts.

## Testing

Run the tests using:

```bash
pnpm test
```

The tests are located in `src/components/pdf/__tests__/BritishCVTemplate.test.tsx`.

## TypeScript Types

The British CV data structure is defined in `src/types/british-cv.ts`.

## Dependencies

- @react-pdf/renderer
- @mui/material
- @mui/icons-material

## Browser Support

The PDF generation feature works in all modern browsers that support the Blob API and URL.createObjectURL.

## Error Handling

The feature includes error handling for:

- PDF generation failures
- Download failures
- Missing or invalid data

## Performance Considerations

- PDF generation is done on the client side
- Fonts are loaded only when needed
- The download process is optimized for large CVs

## Security

- No sensitive data is stored on the server
- PDFs are generated and downloaded directly in the browser
- Input data is validated before PDF generation
