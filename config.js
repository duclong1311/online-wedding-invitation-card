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
    brideDisplay: "Nguyễn Phương",
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
      shortName: "Nguyễn Phương",
      fullName: "Nguyễn Thị Phương",
      roleLabel: "CÔ DÂU",
      father: "Ông Nguyễn Hữu Chiến",
      mother: "Bà Trần Thị Tuyết",
      address: "Xã Lê Lợi, Hưng Yên"
    },
    announcementText: "Sau hành trình yêu thương và đồng hành, chúng mình hạnh phúc báo tin ngày về chung một nhà",
    ceremonyTime: "Lễ Thành Hôn sẽ được cử hành vào lúc 9:30 ngày 28 tháng 11 năm 2026",
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

  // NHẠC NỀN THIỆP CƯỚI (ĐÃ CẮT TỪ 2:28 ĐOẠN "DEAR LORD..." ĐẾN HẾT, CHỈ PHÁT 1 LẦN)
  music: {
    src: "assets/music/young-and-beautiful.m4a",
    volume: 0.9,
    fadeInMs: 4000, // thời gian nhạc to dần từ 0 (ms)
    loop: false
  },

  // LƯU BÚT CÁNH BƯỚM TRÊN BẢNG GỖ NGHỆ THUẬT
  wishes: {
    headerTitle: "LƯU BÚT",
    initialWishes: [
      {
        id: "w-1",
        name: "Minh Anh & Hoàng Nam",
        message: "Chúc Đức Long và Nguyễn Phương trăm năm hạnh phúc, luôn nắm chặt tay nhau đi qua mọi mùa nắng đẹp của cuộc đời!",
        time: "Hôm nay"
      },
      {
        id: "w-2",
        name: "Gia đình chú Tuấn (Đan Phượng)",
        message: "Chúc hai cháu khởi đầu một mái ấm tràn ngập tiếng cười, thuận vợ thuận chồng và sớm đón thiên thần nhỏ nhé.",
        time: "Hôm nay"
      },
      {
        id: "w-3",
        name: "Hội bạn Đại học",
        message: "Cuối cùng ngày này cũng tới! Chúc cô dâu chú rể mãi giữ được ánh mắt ngọt ngào như trong bộ ảnh cưới tuyệt đẹp này.",
        time: "Hôm nay"
      },
      {
        id: "w-4",
        name: "Thu Hà (Hưng Yên)",
        message: "Chúc Phương của tớ luôn là cô dâu hạnh phúc nhất. Chúc hai bạn một đời bình yên, dịu dàng và trọn vẹn bên nhau!",
        time: "Hôm nay"
      },
      {
        id: "w-5",
        name: "Anh chị Khánh Linh",
        message: "Trăm năm tình viên mãn, bạc đầu nghĩa phu thê. Chúc mừng hạnh phúc hai em Đức Long & Nguyễn Phương!",
        time: "Hôm nay"
      },
      {
        id: "w-6",
        name: "Team Đồng Nghiệp",
        message: "Chúc hai bạn xây dựng tổ ấm nhỏ luôn ấm áp như nắng sớm trong khu rừng cổ tích. Happy Wedding!",
        time: "Hôm nay"
      },
      {
        id: "w-7",
        name: "Đức Huy",
        message: "Chúc người anh em Đức Long và bà xã trăm năm hòa hợp, vạn sự hanh thông, hạnh phúc viên mãn!",
        time: "Hôm nay"
      },
      {
        id: "w-8",
        name: "Gia đình bác Hòa",
        message: "Mừng ngày vui của hai cháu! Chúc tổ ấm nhỏ luôn ngập tràn tiếng cười, bình an và thịnh vượng.",
        time: "Hôm nay"
      }
    ]
  }
};
