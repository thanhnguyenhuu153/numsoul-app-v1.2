import { Language, OracleCard } from "./types";

export const APP_VERSION = "1.2";

export const UI_TEXT = {
  [Language.EN]: {
    appTitle: "NumSoul", subtitle: "Soul Compass", authCTA: "Sign in for a faster experience",
    welcome: "Welcome", energy: "Energy", quickWeekly: "Weekly Forecast", quickOracle: "Daily Message",
    tabs: { home: "Home", report: "Your Numbers", forecast: "Forecast", oracle: "Daily Message" },
    labels: { lifePath: "Life Path", destiny: "Destiny", soul: "Soul Urge", personality: "Personality", personalYear: "Personal Year" },
    sections: { soulReading: "Soul Analysis", birthChart: "Birth Chart", yearForecast: "Personal Year Forecast", pinnacles: "4 Life Pinnacles", pinnaclesDesc: "Major cycles of experience and development." },
    oracle: { 
      title: "Daily Message", 
      instruction: "Receive your guidance for today.", 
      guidance: "Divine Message", 
      reset: "Draw New Card", 
      reveal: "Tap to Reveal", 
      tapToFlip: "Tap card to flip",
      limitTitle: "Daily Limit Reached",
      limitDesc: "You have used your 3 free draws for today."
    },
    weekly: {
      limitTitle: "Weekly Limit Reached",
      limitDesc: "You have reached your free weekly forecast limit for this profile."
    },
    loading: "Analyzing...", error: { load: "Error loading.", busy: "Server busy." },
    guidanceLabel: "Guidance",
    profileWarning: "Create your profile to unlock insights.",
    namePlaceholder: "FULL NAME",
    nameExample: "e.g. JOHN DOE",
    dobLabel: "DATE OF BIRTH",
    updateInfo: "UPDATE INFO",
    calculate: "REVEAL DESTINY",
    logout: "Log Out",
    unlock: "Unlock Premium",
    copyright: "© 2025 NumSoul. All rights reserved."
  },
  [Language.VI]: {
    appTitle: "NumSoul", subtitle: "La Bàn Linh Hồn", authCTA: "Đăng nhập để lưu kết quả",
    welcome: "Xin chào", energy: "Năng lượng", quickWeekly: "Dự báo tuần", quickOracle: "Thông điệp ngày",
    tabs: { home: "Trang Chủ", report: "Con Số Của Bạn", forecast: "Dự Báo", oracle: "Thông Điệp" },
    labels: { lifePath: "Số Chủ Đạo", destiny: "Số Sứ Mệnh", soul: "Chỉ Số Linh Hồn", personality: "Chỉ Số Nhân Cách", personalYear: "Năm Cá Nhân" },
    sections: { soulReading: "Phân Tích Chuyên Sâu", birthChart: "Biểu Đồ Ngày Sinh", yearForecast: "Dự Báo Năm Cá Nhân", pinnacles: "4 Đỉnh Cao Cuộc Đời", pinnaclesDesc: "Bốn giai đoạn trưởng thành và đỉnh cao thành công." },
    oracle: { 
      title: "Thông Điệp Mỗi Ngày", 
      instruction: "Lắng nghe vũ trụ nhắn gửi.", 
      guidance: "Lời Khuyên", 
      reset: "Rút Lá Khác", 
      reveal: "Chạm để mở", 
      tapToFlip: "Chạm vào lá bài để lật",
      limitTitle: "Đã Đạt Giới Hạn",
      limitDesc: "Bạn đã dùng hết 3 lượt rút bài miễn phí hôm nay."
    },
    weekly: {
      limitTitle: "Giới Hạn Tuần",
      limitDesc: "Bạn đã xem hết lượt dự báo tuần miễn phí cho hồ sơ này."
    },
    loading: "Đang phân tích...", error: { load: "Lỗi tải.", busy: "Hệ thống bận." },
    guidanceLabel: "Lời Khuyên",
    profileWarning: "Nhập thông tin để xem luận giải chi tiết.",
    namePlaceholder: "HỌ VÀ TÊN KHAI SINH",
    nameExample: "vd: NGUYEN VAN A",
    dobLabel: "NGÀY THÁNG NĂM SINH",
    updateInfo: "CẬP NHẬT HỒ SƠ",
    calculate: "GIẢI MÃ NGAY",
    logout: "Đăng Xuất",
    unlock: "Mở Khóa Ngay",
    copyright: "© 2025 NumSoul. Bảo lưu mọi quyền."
  }
};
export const ORACLE_CARDS: OracleCard[] = [
  { number: 1, name: { en: "The Pioneer", vi: "Người Tiên Phong" }, keywords: { en: ["Leadership", "Courage", "Action"], vi: ["Lãnh Đạo", "Dũng Cảm", "Hành Động"] } },
  { number: 2, name: { en: "The Diplomat", vi: "Người Hòa Giải" }, keywords: { en: ["Balance", "Patience", "Connection"], vi: ["Cân Bằng", "Kiên Nhẫn", "Kết Nối"] } },
  { number: 3, name: { en: "The Creator", vi: "Người Sáng Tạo" }, keywords: { en: ["Joy", "Expression", "Optimism"], vi: ["Niềm Vui", "Biểu Đạt", "Lạc Quan"] } },
  { number: 4, name: { en: "The Builder", vi: "Người Kiến Thiết" }, keywords: { en: ["Stability", "Order", "Discipline"], vi: ["Ổn Định", "Trật Tự", "Kỷ Luật"] } },
  { number: 5, name: { en: "The Explorer", vi: "Người Phiêu Lưu" }, keywords: { en: ["Freedom", "Change", "Adventure"], vi: ["Tự Do", "Thay Đổi", "Phiêu Lưu"] } },
  { number: 6, name: { en: "The Nurturer", vi: "Người Chăm Sóc" }, keywords: { en: ["Love", "Harmony", "Responsibility"], vi: ["Yêu Thương", "Hài Hòa", "Trách Nhiệm"] } },
  { number: 7, name: { en: "The Sage", vi: "Nhà Hiền Triết" }, keywords: { en: ["Wisdom", "Truth", "Solitude"], vi: ["Trí Tuệ", "Sự Thật", "Tĩnh Lặng"] } },
  { number: 8, name: { en: "The Achiever", vi: "Người Thành Đạt" }, keywords: { en: ["Power", "Abundance", "Karma"], vi: ["Quyền Lực", "Thịnh Vượng", "Nhân Quả"] } },
  { number: 9, name: { en: "The Humanist", vi: "Nhà Nhân Đạo" }, keywords: { en: ["Compassion", "Completion", "Service"], vi: ["Từ Bi", "Hoàn Tất", "Phụng Sự"] } },
  { number: 11, name: { en: "The Visionary", vi: "Nhà Tầm Nhìn" }, keywords: { en: ["Intuition", "Inspiration", "Illumination"], vi: ["Trực Giác", "Cảm Hứng", "Khai Sáng"] } },
  { number: 22, name: { en: "The Master Builder", vi: "Kiến Trúc Sư Đại Tài" }, keywords: { en: ["Mastery", "Realization", "Legacy"], vi: ["Làm Chủ", "Hiện Thực Hóa", "Di Sản"] } }
];