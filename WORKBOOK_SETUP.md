# 📚 Workbook Download Setup

## How to Add Your Workbook File

### 1. **Place Your File**
Add your workbook file to the `public` folder:
```
/Users/diegopenasanchez/bsmx/public/workbook.pdf
```
*(Replace `workbook.pdf` with your actual filename)*

### 2. **Update the File Path** (if needed)
If your file has a different name, update the path in:
- **File**: `src/components/WorkbookDownloadPage.tsx`
- **Line**: `workbookUrl = "/workbook.pdf"` (change to your filename)

### 3. **Supported File Types**
The download will work with any file type:
- PDF: `.pdf`
- Word: `.docx`, `.doc`
- Excel: `.xlsx`, `.xls`
- PowerPoint: `.pptx`, `.ppt`
- Images: `.png`, `.jpg`, `.jpeg`
- Any other file type

### 4. **Current Flow**
1. User completes diagnostic quiz
2. Clicks "Continuar a Módulos"
3. Redirects to `/workbook-download`
4. Sees Billy + Drago with message
5. Clicks download button
6. File downloads automatically
7. Redirects to modules menu

### 5. **Customization Options**
You can customize in `WorkbookDownloadPage.tsx`:
- **Message**: Change the speech bubble text
- **File name**: Update `workbookName` prop
- **File path**: Update `workbookUrl` prop
- **Redirect delay**: Change the 2-second delay after download

### 6. **Testing**
1. Complete the diagnostic quiz
2. Click "Continuar a Módulos"
3. You should see the download page with Billy and Drago
4. Click the download button to test

## 🎯 Ready to Use!
Just add your workbook file to the `public` folder and you're all set!
