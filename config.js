/**
 * ============================================================================
 * CẤU HÌNH THIỆP CƯỚI ONLINE — TRẦN ĐỨC LONG & NGUYỄN THỊ PHƯƠNG
 * ============================================================================
 */

window.WEDDING_CONFIG = {
  // PAGE 1: TRANG BÌA TẠP CHÍ (TEXT BEHIND SUBJECT - ẢNH QA_06476)
  hero: {
    topBarLeft: "TRÂN TRỌNG KÍNH MỜI",
    topBarRight: "LỄ THÀNH HÔN",
    topKicker: "THE",
    behindTitle: "WEDDING",
    behindSubtitle: "INVITATION",

    leftEditorialKicker: "OUR STORY",
    leftEditorialQuote: "“Two souls, one quiet forest, and a lifetime of mornings together.”",

    rightQuoteEn: "“In all the world, there is no heart for me like yours.”",
    rightQuoteVi: "Giữa vạn dặm nhân gian, cảm ơn vì đã tìm thấy nhau và cùng viết nên chương đẹp nhất của cuộc đời.",

    bottomLeftLabel: "THE WEDDING OF",
    groomDisplay: "Đức Long",
    brideDisplay: "Phương Chan",
    heroDay: "28",
    heroMonthShortEn: "NOV",
    heroYear: "2026",
    cityLabel: "HÀ NỘI"
  },

  // PAGE 2: THÔNG TIN CẶP ĐÔI & HAI BÊN GIA ĐÌNH
  couple: {
    groom: {
      shortName: "Đức Long",
      fullName: "Trần Đức Long",
      roleLabel: "CHÚ RỂ",
      father: "Ông Trần Xuân Hải",
      mother: "Bà Bùi Thị Thủy",
      address: "Xã Đan Phượng, Hà Nội"
    },
    bride: {
      shortName: "Phương Chan",
      fullName: "Nguyễn Thị Phương",
      roleLabel: "CÔ DÂU",
      father: "Ông Nguyễn Hữu Quân",
      mother: "Bà Trần Thị Tuyết",
      address: "Xã Lê Lợi, Hưng Yên",
      // Tư gia nhà gái — hiển thị trong box Địa điểm tổ chức (Page 3), dưới tư gia nhà trai
      venue: {
        name: "Tư Gia Nhà Gái",
        address: "Thôn Cao Bạt Trung, xã Lê Lợi, Hưng Yên",
        mapUrl: "https://maps.app.goo.gl/ZoDWgRerq1bDk1K58"
      }
    },
    announcementText: "Sau hành trình yêu thương và đồng hành, chúng mình hạnh phúc báo tin ngày về chung một nhà",
    ceremonyTime: "Các nghi lễ sẽ được cử hành vào ngày 28 tháng 11 năm 2026",
    ceremonySchedule: [
      { name: "Lễ Vu Quy", time: "7:30" },
      { name: "Lễ Thành Hôn", time: "11:30" }
    ],
    ceremonyLunar: "Tức ngày 20 tháng 10 năm Bính Ngọ"
  },

  // PAGE 3: THÔNG TIN BỮA CƠM THÂN MẬT
  weddingEvent: {
    headerLeft: "BỮA CƠM THÂN MẬT",
    headerRight: "27 . 11 . 2026 — HÀ NỘI",
    invitationHeading: "Trân Trọng",
    invitationHeadingEm: "Kính Mời",
    invitationSubtext: "Tới dự bữa cơm thân mật chung vui cùng gia đình và chúng mình tại:",
    dayOfWeek: "THỨ SÁU",
    day: "27",
    month: "11",
    year: "2026",
    time: "17:30",
    receptionDetail: "Đón khách: 16:30  •  Khai tiệc: 17:30",
    lunarDate: "Tức ngày 19 tháng 10 năm Bính Ngọ",
    venueName: "Tư Gia Nhà Trai",
    address: "Số 68, Phùng Hưng, Đan Phượng, Hà Nội",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=155+Ph%C3%B9ng+H%C6%B0ng,+%C4%90an+Ph%C6%B0%E1%BB%A3ng,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam+(t%E1%BA%A1p+ho%C3%A1+Ph%C6%B0%C6%A1ng+L%C3%A2n)"
  },

  // PAGE 4: BÌA SAU ĐEN TRẮNG (QA_06511 MONOCHROME)
  ending: {
    topTitle: "TRỌN VẸN YÊU THƯƠNG",
    message: "Sự hiện diện của Quý khách là niềm vinh hạnh lớn lao trong ngày hạnh phúc của chúng mình."
  },

  // PAGE 5: CHÚC MỪNG HẠNH PHÚC — QR MỪNG CƯỚI (VietQR Techcombank)
  gift: {
    heading: "Gửi Trao",
    headingEm: "Yêu Thương",
    message: "Sự hiện diện và lời chúc của bạn đã là món quà quý giá nhất. Nếu ở xa chưa thể đến chung vui, bạn có thể gửi lời chúc mừng hạnh phúc tới chúng mình qua mã QR này.",
    bankName: "Techcombank",
    accountName: "", // Điền tên chủ tài khoản (VD: "TRAN DUC LONG") để hiển thị; để trống sẽ ẩn dòng này
    accountNumber: "19036348800014",
    qrImage: "assets/images/qr-code/qr-mung-cuoi.svg",
    qrDownload: "assets/images/qr-code/qr-mung-cuoi.png"
  },

  // NHẠC NỀN THIỆP CƯỚI (ĐÃ CẮT TỪ 2:28 ĐOẠN "DEAR LORD..." ĐẾN HẾT, CHỈ PHÁT 1 LẦN)
  music: {
    src: "assets/music/young-and-beautiful.m4a",
    volume: 0.9,
    fadeInMs: 4000, // thời gian nhạc to dần từ 0 (ms)
    loop: false
  },

  // LƯU BÚT CÁNH BƯỚM TRÊN BẢNG GỖ NGHỆ THUẬT
  // Lời chúc được lưu vào Google Sheet qua Google Apps Script (xem google-apps-script/Code.gs).
  // Dán URL Web App (dạng https://script.google.com/macros/s/.../exec) vào apiUrl.
  // Để trống apiUrl: lời chúc chỉ lưu trên trình duyệt của khách (localStorage) — cô dâu chú rể KHÔNG xem được.
  wishes: {
    headerTitle: "Lưu Bút",
    headerTitleEm: "Cánh Bướm",
    apiUrl: "https://script.google.com/macros/s/AKfycbx_Enmj-Ztn9tGkPwPSxzKXvJG8v8lVIcpm5awSTBg0G9_GXMs0bCfPtLwWTtYnyy5o/exec"
  }
};
