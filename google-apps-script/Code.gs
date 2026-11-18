/**
 * ============================================================================
 * BACKEND LƯU BÚT — GOOGLE SHEET + GOOGLE APPS SCRIPT (MIỄN PHÍ)
 * ============================================================================
 *
 * CÁCH CÀI ĐẶT (làm 1 lần, ~5 phút):
 *  1. Tạo 1 Google Sheet mới (VD: "Lưu bút đám cưới Long & Phương").
 *  2. Trong Sheet: menu Tiện ích mở rộng (Extensions) → Apps Script.
 *  3. Xoá code mặc định, dán toàn bộ file này vào, bấm Lưu (Ctrl+S).
 *  4. Bấm Triển khai (Deploy) → Tùy chọn triển khai mới (New deployment)
 *       - Loại (Select type): Ứng dụng web (Web app)
 *       - Thực thi dưới dạng (Execute as): Tôi (Me)
 *       - Người có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 *     → Triển khai → Cấp quyền cho tài khoản Google của bạn.
 *  5. Copy "URL ứng dụng web" (dạng https://script.google.com/macros/s/XXX/exec)
 *     và dán vào config.js → wishes.apiUrl.
 *
 * XEM LỜI CHÚC: mở Google Sheet, tab "LuuBut".
 * ẨN LỜI CHÚC SPAM: gõ "x" (hoặc TRUE) vào cột "hidden" của dòng đó — thiệp sẽ không hiển thị nữa.
 *
 * LƯU Ý: nếu sửa code này sau khi đã triển khai, phải vào Deploy → Manage deployments
 *        → Edit (biểu tượng bút) → Version: New version → Deploy, URL giữ nguyên.
 */

const SHEET_NAME = "LuuBut";
const HEADERS = ["id", "createdAt", "name", "message", "species", "hidden"];
const MAX_NAME = 55;
const MAX_MESSAGE = 220;
const SPECIES = ["gold", "pearl", "emerald", "amber", "champagne", "topaz"];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange("A:A").setNumberFormat("@");
    sh.setColumnWidth(3, 200);
    sh.setColumnWidth(4, 480);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Chặn công thức (formula injection) khi mở trong Sheet
function safeCell_(text) {
  const s = String(text || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function plain_(value) {
  const s = String(value || "");
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

function isHidden_(value) {
  if (value === true) return true;
  const s = String(value || "").trim().toLowerCase();
  return s !== "" && s !== "false" && s !== "0";
}

function doGet() {
  const sh = getSheet_();
  const rows = sh.getDataRange().getValues().slice(1);
  const wishes = rows
    .filter(function (r) { return r[2] && r[3] && !isHidden_(r[5]); })
    .map(function (r) {
      const d = r[1] instanceof Date ? r[1] : new Date(r[1]);
      return {
        id: String(r[0]),
        createdAt: isNaN(d.getTime()) ? null : d.toISOString(),
        name: plain_(r[2]),
        message: plain_(r[3]),
        species: String(r[4] || "")
      };
    })
    .reverse(); // mới nhất lên đầu
  return json_({ ok: true, wishes: wishes });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok: false, error: "invalid_json" });
  }

  const name = String(body.name || "").trim().slice(0, MAX_NAME);
  const message = String(body.message || "").trim().slice(0, MAX_MESSAGE);
  if (!name || !message) return json_({ ok: false, error: "missing_fields" });

  const species = SPECIES.indexOf(body.species) >= 0 ? body.species : SPECIES[Math.floor(Math.random() * SPECIES.length)];
  const id = Utilities.getUuid();
  const now = new Date();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([id, now, safeCell_(name), safeCell_(message), species, ""]);
  } finally {
    lock.releaseLock();
  }

  return json_({
    ok: true,
    wish: { id: id, createdAt: now.toISOString(), name: name, message: message, species: species }
  });
}
