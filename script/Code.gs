// ==== CONFIG ====
const FOLDER_ID = 'SEE README TO FIND FOLDER ID';
// Column positions (1-based). Adjust if your layout differs.
const COL = { company: 1, role: 2, date: 3, jd: 4, status: 5, link: 6 };
// ================

// ---- Stamps today's date when a row's Company cell is first filled ----
function onEdit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  if (row === 1) return;              // ignore header row
  if (col !== COL.company) return;    // only act when Company is edited

  const dateCell = sheet.getRange(row, COL.date);
  // Only stamp if Date is empty and Company now has a value
  if (dateCell.getValue() === '' && e.range.getValue() !== '') {
    dateCell.setValue(new Date());
  }
}

function processNewRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const parent = DriveApp.getFolderById(FOLDER_ID);

  // Start at row 2 to skip headers
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const company = row[COL.company - 1];
    const link = row[COL.link - 1];

    // Skip if no company, or if already processed (link exists)
    if (!company || link) continue;

    const role = row[COL.role - 1] || 'Role';
    const dateVal = row[COL.date - 1];
    const dateStr = dateVal
      ? Utilities.formatDate(new Date(dateVal), Session.getScriptTimeZone(), 'yyyy-MM-dd')
      : Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const jdText = row[COL.jd - 1] || '';

    // 1. Create the company folder inside Job Application Tracker
    const folderName = `${company} - ${role} - ${dateStr}`;
    const folder = parent.createFolder(folderName);

    // 2. Create a JD Google Doc inside that folder
    if (jdText) {
      const doc = DocumentApp.create(`${company} - Job Description`);
      doc.getBody().setText(jdText);
      doc.saveAndClose();
      // Move the doc from root into the new folder
      const docFile = DriveApp.getFileById(doc.getId());
      folder.addFile(docFile);
      DriveApp.getRootFolder().removeFile(docFile);
    }

    // 3. Write the folder link back to the sheet
    sheet.getRange(i + 1, COL.link).setValue(folder.getUrl());
  }
}