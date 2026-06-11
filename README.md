


# Job Application Tracker

A simple Google Sheets + Apps Script tool that automatically creates an
organized Drive folder (and a job-description doc) for every job you apply to.
Add a row to the sheet → a folder appears in your Drive with the JD inside,
and a clickable link gets written back to the row.

## What it does
- Watches your tracker sheet for new applications
- Creates a folder named `Company - Role - Date` inside a parent folder
- Saves the job description into a Google Doc in that folder
- Writes the folder link back to your sheet
- Auto-stamps the date when you start a row

https://github.com/user-attachments/assets/d821a839-237c-47d6-8269-eea0f88e070e

## Setup

### 1. Create your folder and sheet
1. In Google Drive, create (or pick) a parent folder to hold everything.
2. Copy this [Google Sheet](https://docs.google.com/spreadsheets/d/1LNcb7h2GZaQKRxrt2G93iLp-ortLpLvUahbCmzHbYGI/edit?gid=0#gid=0) and move it into the folder

### 2. Get your folder ID
Open your parent folder in Drive. The URL looks like:
`https://drive.google.com/drive/folders/THIS_PART_IS_THE_ID`
Copy the part after `/folders/` or where the `folder-id-is-found-here`.

<img width="1526" height="430" alt="image" src="https://github.com/user-attachments/assets/2c09b384-a005-47a1-95ba-34c057f446b5" />


### 3. Add the script
1. In your Sheet: **Extensions → Apps Script**. <img width="737" height="401" alt="Screenshot 2026-06-10 at 10 35 56 PM" src="https://github.com/user-attachments/assets/2908f10f-6ff9-41d6-ab50-c52ea8300997" />

2. Delete any placeholder code and paste in the contents of `Code.gs`.<img width="804" height="322" alt="Screenshot 2026-06-10 at 10 38 22 PM" src="https://github.com/user-attachments/assets/3fbac9b4-5cf4-4896-aaed-46aaf0670f08" />

<img width="956" height="778" alt="Screenshot 2026-06-10 at 10 39 44 PM" src="https://github.com/user-attachments/assets/92a3d621-a20b-4476-91bd-517c7a8e1705" />


3. Replace `PASTE_YOUR_FOLDER_ID_HERE` with your folder ID.
4. Save.

### 4. Set the trigger
1. In the Apps Script editor, click the **clock icon** (Triggers).
<img width="287" height="359" alt="Screenshot 2026-06-10 at 10 40 35 PM" src="https://github.com/user-attachments/assets/39b18511-71a2-4e63-8f99-af192c0166f7" />

2. **Add Trigger** → function `processNewRows`, event source\
<img width="1624" height="977" alt="Screenshot 2026-06-10 at 10 41 06 PM" src="https://github.com/user-attachments/assets/8bb9d870-f593-4603-82d8-1cd5c2db2304" />

3. **Time-driven**, **Minutes timer**, **every 5 minutes**. Save.
<img width="744" height="728" alt="Screenshot 2026-06-10 at 10 43 23 PM" src="https://github.com/user-attachments/assets/537bc785-2e9f-42bb-924c-bd5af4ccf3ac" />


4. Approve the permissions prompt on first run (it needs Drive + Docs access).

<img width="599" height="567" alt="Screenshot 2026-06-10 at 10 49 15 PM" src="https://github.com/user-attachments/assets/6e09f433-cf0e-492a-9b0c-d1cab6a65f5f" />
<img width="598" height="567" alt="Screenshot 2026-06-10 at 10 49 26 PM" src="https://github.com/user-attachments/assets/5b632acb-86df-4af0-bee1-b4fc1c3f74b8" />
<img width="599" height="566" alt="Screenshot 2026-06-10 at 10 49 38 PM" src="https://github.com/user-attachments/assets/4f8b6fa5-e037-4059-86cb-acc44c09e23a" />


*(The date-stamping `onEdit` function runs automatically — no trigger needed.)*

## How to use it
Add a row with the company, role, and pasted job description. Leave
**Folder Link** blank. Within ~5 minutes, your folder appears and the link
fills in. Click it to open the folder and add your resume, notes, etc.

## Notes
- The **Folder Link** column is how the script knows a row is already done —
  don't clear it unless you want the folder re-created.
- **Status** is for your own tracking; the script ignores it.
- Job descriptions are saved as plain text (formatting isn't preserved).
