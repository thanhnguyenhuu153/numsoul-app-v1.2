// Pythagorean System Mapping
const letterMap: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8
};

const vowels = ['a', 'e', 'i', 'o', 'u'];

// Helper to reduce number
// MODIFIED: logic to ensure 11, 22, 33 are strictly preserved when allowMaster is true
export const reduceNumber = (num: number, allowMaster: boolean = true): number => {
  if (num === 0) return 0;
  if (allowMaster && (num === 11 || num === 22 || num === 33)) return num;
  
  if (num < 10) return num;
  
  let sum = 0;
  const digits = num.toString().split('');
  digits.forEach(d => sum += parseInt(d, 10));
  
  // Recursively reduce unless it hits a master number (if allowed)
  return reduceNumber(sum, allowMaster);
};

export const calculateLifePath = (dateStr: string): number => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const rYear = reduceNumber(year);
  const rMonth = reduceNumber(month);
  const rDay = reduceNumber(day);

  return reduceNumber(rYear + rMonth + rDay);
};

export const calculateNameNumbers = (fullName: string) => {
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
  
  let destinySum = 0;
  let soulSum = 0;
  let personalitySum = 0;

  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    const val = letterMap[char] || 0;
    destinySum += val;
    
    if (vowels.includes(char) || (char === 'y' && i > 0)) {
      soulSum += val;
    } else {
      personalitySum += val;
    }
  }

  return {
    destiny: reduceNumber(destinySum),
    soul: reduceNumber(soulSum),
    personality: reduceNumber(personalitySum)
  };
};

export const normalizeVietnamese = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
};

export const getBirthChartNumbers = (dateStr: string): number[] => {
  const nums = dateStr.replace(/-/g, '').split('').map(n => parseInt(n));
  return nums.filter(n => !isNaN(n) && n !== 0); 
};

export const calculatePinnacles = (dateStr: string) => {
  const date = new Date(dateStr);
  // Base numbers for Pinnacles are reduced to single digits first (standard method)
  // HOWEVER, some systems preserve master numbers in the base. 
  // Standard: Month, Day, Year reduced to single digit.
  const year = reduceNumber(date.getFullYear(), false); 
  const month = reduceNumber(date.getMonth() + 1, false);
  const day = reduceNumber(date.getDate(), false);

  // P1 = Month + Day
  const p1 = reduceNumber(month + day, true); // Allow Master 11/22 in result
  
  // P2 = Day + Year
  const p2 = reduceNumber(day + year, true); // Allow Master 11/22 in result
  
  // P3 = P1 + P2
  const p3 = reduceNumber(p1 + p2, true); // Allow Master 11/22 in result
  
  // P4 = Month + Year
  const p4 = reduceNumber(month + year, true); // Allow Master 11/22 in result

  return { first: p1, second: p2, third: p3, fourth: p4 };
};

export const calculatePinnacleYears = (dateStr: string, lifePath: number) => {
  const date = new Date(dateStr);
  const birthYear = date.getFullYear();
  
  let baseLP = lifePath;
  // Reduce Master Numbers for Timing Calculation (Rule: 36 - Single Digit Life Path)
  if (baseLP === 11) baseLP = 2;
  if (baseLP === 22) baseLP = 4;
  if (baseLP === 33) baseLP = 6;
  
  const age1End = 36 - baseLP;
  const age2End = age1End + 9;
  const age3End = age2End + 9;
  
  return {
    first: birthYear + age1End,
    second: birthYear + age2End,
    third: birthYear + age3End,
    fourth: birthYear + age3End + 9 
  };
};

export const calculatePersonalYear = (dateStr: string, targetYear?: number): number => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const calculationYear = targetYear || new Date().getFullYear();
  
  // Personal Year is Month + Day + Calculation Year
  const rMonth = reduceNumber(month, false);
  const rDay = reduceNumber(day, false);
  const rYear = reduceNumber(calculationYear, false); // Usually sum of digits of year

  return reduceNumber(rMonth + rDay + rYear);
};