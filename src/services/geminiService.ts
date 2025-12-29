import { GoogleGenAI } from "@google/genai";
import { Language, NumerologyReport } from "../types";
import { UI_TEXT, ORACLE_CARDS } from "../constants";
import { STATIC_NUMEROLOGY_DATA } from "../data/staticNumerology";

// Initialize AI safely. The API key must be in process.env.API_KEY
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper to check for quota errors
const isQuotaError = (error: any): boolean => {
  return (
    error?.status === 429 || 
    error?.code === 429 || 
    error?.message?.includes('429') || 
    error?.message?.includes('Quota') ||
    error?.body?.error?.code === 429 ||
    error?.statusText === 'RESOURCE_EXHAUSTED'
  );
};

export const getNumerologyReading = async (
  report: NumerologyReport,
  lang: Language,
  focus: 'overview' | 'forecast' | 'weekly' | 'pinnacles',
  specificPersonalYear?: number // Optional param for dynamic year switching
): Promise<string> => {
  const t = UI_TEXT[lang];
  const targetLang = lang === Language.VI ? 'Vietnamese' : 'English';

  if (focus === 'overview') {
    // 1. Get Life Path content
    const lpData = STATIC_NUMEROLOGY_DATA.lifePath[lang][report.lifePathNumber as keyof typeof STATIC_NUMEROLOGY_DATA.lifePath[Language.EN]] || "Updating...";
    
    // 2. Get Destiny content
    const destinyData = STATIC_NUMEROLOGY_DATA.destiny[lang][report.destinyNumber as keyof typeof STATIC_NUMEROLOGY_DATA.destiny[Language.EN]] || "Updating...";
    
    // 3. Get Soul Urge content
    const soulData = STATIC_NUMEROLOGY_DATA.soul[lang][report.soulUrgeNumber as keyof typeof STATIC_NUMEROLOGY_DATA.soul[Language.EN]] || "Updating...";

    // 4. Get Personality content
    const personalityData = STATIC_NUMEROLOGY_DATA.personality[lang][report.personalityNumber as keyof typeof STATIC_NUMEROLOGY_DATA.personality[Language.EN]] || "Updating...";

    // 5. Labels
    const labels = lang === Language.VI 
      ? ["Số Chủ Đạo (Life Path)", "Số Sứ Mệnh (Destiny)", "Chỉ Số Linh Hồn (Soul Urge)", "Chỉ Số Nhân Cách (Personality)"] 
      : ["Life Path Number", "Destiny Number", "Soul Urge Number", "Personality Number"];

    return `
### ${labels[0]} ${report.lifePathNumber}
${lpData}

---
### ${labels[1]} ${report.destinyNumber}
${destinyData}

---
### ${labels[2]} ${report.soulUrgeNumber}
${soulData}

---
### ${labels[3]} ${report.personalityNumber}
${personalityData}
    `;
  }

  if (focus === 'pinnacles') {
    const title = lang === Language.VI 
      ? "Phân Tích 4 Đỉnh Cao Cuộc Đời" 
      : "Analysis of 4 Life Pinnacles";
    
    const peakLabel = lang === Language.VI ? "Đỉnh Cao" : "Pinnacle";
    const numLabel = lang === Language.VI ? "Con số" : "Number";
    
    const getPinText = (num: number) => STATIC_NUMEROLOGY_DATA.pinnacles[lang][num as keyof typeof STATIC_NUMEROLOGY_DATA.pinnacles[Language.EN]] || "Updating...";

    return `
### ${title}

#### 1. ${peakLabel} 1 (${numLabel} ${report.pinnacles.first})
${getPinText(report.pinnacles.first)}

#### 2. ${peakLabel} 2 (${numLabel} ${report.pinnacles.second})
${getPinText(report.pinnacles.second)}

#### 3. ${peakLabel} 3 (${numLabel} ${report.pinnacles.third})
${getPinText(report.pinnacles.third)}

#### 4. ${peakLabel} 4 (${numLabel} ${report.pinnacles.fourth})
${getPinText(report.pinnacles.fourth)}
    `;
  }

  if (focus === 'forecast') {
    // Use specificPersonalYear if provided, otherwise use report.personalYear
    const yearToUse = specificPersonalYear || report.personalYear;
    
    const pyData = STATIC_NUMEROLOGY_DATA.personalYear[lang][yearToUse as keyof typeof STATIC_NUMEROLOGY_DATA.personalYear[Language.EN]] || "Updating...";
    const label = lang === Language.VI ? 'Dự Báo Năm Cá Nhân' : 'Personal Year Forecast';
    
    return `
### ${label} ${yearToUse}
${pyData}
    `;
  }

  // Weekly Forecast (Dynamic)
  if (focus === 'weekly') {
    if (!ai) {
        console.warn("Gemini API Key is missing.");
        return lang === Language.VI 
          ? "Vui lòng cấu hình API Key để xem dự báo chi tiết." 
          : "Please configure API Key to view detailed forecast.";
    }

    const today = new Date();
    // Using explicit instruction to bold headers
    const prompt = `
      CRITICAL INSTRUCTION: You MUST write the entire weekly prediction in ${targetLang}. 
      Do NOT use any other language.
      Do NOT return JSON. Return formatted Markdown.

      You are a Master Numerologist.
      Provide a UNIQUE, DEEP WEEKLY forecast for this specific week (${today.toDateString()}).
      
      User Numbers:
      - Life Path: ${report.lifePathNumber}
      - Personal Year: ${report.personalYear}
      
      Task:
      Predict the energy for this week.
      
      Formatting Requirements:
      - Use **Bold Title** for section headers.
      - Add a blank line between sections.
      
      Structure:
      1. **Energy of the Week**: A mystical summary.
      2. **Career & Finance**: Concrete advice.
      3. **Love & Relationships**: Emotional guidance.
      4. **Warning**: What to avoid.
      
      Keep it punchy but deep. Max 200 words.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          maxOutputTokens: 500,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || t.error.load;
    } catch (error: any) {
      if (isQuotaError(error)) {
        console.warn("Gemini API Quota Exceeded (Weekly). Switching to offline mode.");
      } else {
        console.error("Gemini API Error (Weekly):", error);
      }
      
      // Fallback
      const pyText = STATIC_NUMEROLOGY_DATA.personalYear[lang][report.personalYear as keyof typeof STATIC_NUMEROLOGY_DATA.personalYear[Language.EN]];
      const fallbackTitle = lang === Language.VI ? "Dự báo năng lượng (Tạm thời)" : "Energy Forecast (Offline Mode)";
      const fallbackIntro = lang === Language.VI 
        ? "_Hệ thống AI đang bận, đây là dự báo dựa trên chu kỳ năm cá nhân của bạn:_" 
        : "_AI system is experiencing high traffic. Here is a forecast based on your Personal Year cycle:_";
      
      return `### ${fallbackTitle}
${fallbackIntro}

**${lang === Language.VI ? "Năm Cá Nhân" : "Personal Year"} ${report.personalYear}**
${pyText}

*${lang === Language.VI ? "Lời khuyên: Hãy giữ vững tinh thần và lắng nghe trực giác." : "Tip: Stay grounded and listen to your intuition."}*`;
    }
  }

  return "";
};

export const getDailyOracleReading = async (
  cardName: string,
  cardNumber: number,
  lang: Language
): Promise<string> => {
  const targetLang = lang === Language.VI ? 'Vietnamese' : 'English';
  
  if (!ai) {
     const card = ORACLE_CARDS.find(c => c.number === cardNumber);
     if (card) {
        const kws = card.keywords[lang].join(" - ");
        return lang === Language.VI 
          ? `(Chế độ Offline) Năng lượng hôm nay: **${kws}**. Hãy chiêm nghiệm về những từ khóa này.` 
          : `(Offline Mode) Today's energy: **${kws}**. Meditate on these keywords.`;
     }
     return "";
  }
  
  const prompt = `
    CRITICAL INSTRUCTION: You MUST write the entire message in ${targetLang}. 
    Do NOT use any other language.
    You are a mystic Oracle. The card is "${cardName}" (${cardNumber}).
    Give a cryptic yet helpful daily guidance (max 60 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        maxOutputTokens: 150, // Limit cost
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking
      }
    });
    return response.text || "";
  } catch (error: any) {
    if (isQuotaError(error)) {
      console.warn("Gemini API Quota Exceeded (Oracle). Switching to offline mode.");
    } else {
      console.error("Gemini API Error (Oracle):", error);
    }
    
    // FALLBACK for Oracle Reading
    const card = ORACLE_CARDS.find(c => c.number === cardNumber);
    if (card) {
      const kws = card.keywords[lang].join(" - ");
      return lang === Language.VI 
        ? `(Chế độ Offline) Năng lượng hôm nay: **${kws}**. Hãy chiêm nghiệm về những từ khóa này.` 
        : `(Offline Mode) Today's energy: **${kws}**. Meditate on these keywords.`;
    }
    return "";
  }
};