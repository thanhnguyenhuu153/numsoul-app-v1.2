import { Language } from "../types";

// Helper to structure content
const formatContent = (title: string, keywords: string, description: string, advice: string) => {
  return `**${title}**\n\n*${keywords}*\n\n${description}\n\n💡 **Lời khuyên:** ${advice}`;
};

const formatContentEn = (title: string, keywords: string, description: string, advice: string) => {
  return `**${title}**\n\n*${keywords}*\n\n${description}\n\n💡 **Advice:** ${advice}`;
};

// Helper for detailed personal year
const formatDetailedYearVI = (title: string, overview: string, career: string, love: string, advice: string) => {
  return `**${title}**

**🌟 Tổng Quan**
${overview}

**💼 Sự Nghiệp & Tài Chính**
${career}

**❤️ Tình Cảm & Mối Quan Hệ**
${love}

**💡 Lời Khuyên Cốt Lõi**
${advice}`;
};

const formatDetailedYearEN = (title: string, overview: string, career: string, love: string, advice: string) => {
  return `**${title}**

**🌟 Overview**
${overview}

**💼 Career & Finance**
${career}

**❤️ Love & Relationships**
${love}

**💡 Key Advice**
${advice}`;
};


export const STATIC_NUMEROLOGY_DATA = {
  lifePath: {
    [Language.EN]: {
      1: formatContentEn("The Leader", "Independence, Creation, Ambition", "You are a born leader with an innovative spirit. You are independent, courageous, and determined to carve your own path. You thrive when you are in charge.", "Trust your instincts and don't be afraid to stand alone."),
      2: formatContentEn("The Peacemaker", "Balance, Diplomacy, Intuition", "You are the glue that holds relationships together. Sensitive and intuitive, you seek harmony and are a natural diplomat.", "Set healthy boundaries while caring for others."),
      3: formatContentEn("The Communicator", "Creativity, Expression, Joy", "You are the sparkle of life. Artistic, verbal, and optimistic, you inspire others with your enthusiasm and charm.", "Focus your scattered energy to achieve tangible results."),
      4: formatContentEn("The Builder", "Structure, Stability, Practicality", "You are the bedrock of society. Hard-working, detail-oriented, and trustworthy, you build foundations that last.", "Don't be afraid to embrace change and flexibility."),
      5: formatContentEn("The Adventurer", "Freedom, Change, Versatility", "You are a free spirit who craves variety. Magnetic and adaptable, you learn through experience and risk-taking.", "Discipline is the key to true freedom."),
      6: formatContentEn("The Nurturer", "Responsibility, Love, Healing", "You are the caretaker of the world. Driven by duty and love, you create harmony in your home and community.", "Remember to nurture yourself as well as others."),
      7: formatContentEn("The Seeker", "Analysis, Spirituality, Solitude", "You are a deep thinker searching for the truth. You need time alone to study, meditate, and analyze the mysteries of life.", "Open your heart to trust and share your wisdom."),
      8: formatContentEn("The Executive", "Power, Money, Authority", "You are a powerhouse of manifestation. Ambitious and efficient, you understand the balance between the material and spiritual worlds.", "Use your power for the greater good."),
      9: formatContentEn("The Humanitarian", "Compassion, Giving, Completion", "You are a universal soul. Selfless and idealistic, you are here to serve humanity and let go of the past.", "Practice detachment and unconditional love."),
      11: formatContentEn("The Master Intuitive", "Illumination, Inspiration, Nervous Tension", "You are a channel for higher truth. Highly intuitive and charismatic, you inspire others by your example.", "Ground your high energy to avoid burnout."),
      22: formatContentEn("The Master Builder", "Realization, Force, Mastery", "You have the vision of the 11 and the practicality of the 4. You can turn massive dreams into reality.", "Think big, but take practical steps."),
      33: formatContentEn("The Master Teacher", "Compassion, Blessing, Healing", "The number of pure love. You are here to uplift humanity through selfless service and nurturing.", "Balance your desire to save the world with self-care.")
    },
    [Language.VI]: {
      1: formatContent("Số 1: Người Lãnh Đạo", "Độc lập - Tiên phong - Quyết đoán", "Bạn mang năng lượng của một mũi tên, luôn hướng về phía trước. Bạn sinh ra để dẫn đầu, không phải để phục tùng. Sức mạnh của bạn nằm ở ý chí kiên cường và khả năng tự chủ.", "Hãy học cách lắng nghe và kiểm soát cái tôi."),
      2: formatContent("Số 2: Người Hòa Giải", "Kết nối - Trực giác - Nhạy cảm", "Bạn là sứ giả của hòa bình. Bạn nhạy bén với cảm xúc của người khác và luôn tìm kiếm sự cân bằng. Sức mạnh của bạn là sự mềm mỏng nhưng bền bỉ.", "Đừng để sự cả nể khiến bạn đánh mất chính mình."),
      3: formatContent("Số 3: Người Truyền Cảm Hứng", "Sáng tạo - Hoạt ngôn - Vui vẻ", "Bạn là ngọn lửa của niềm vui. Với khả năng ngôn ngữ và sự sáng tạo, bạn có thể vực dậy tinh thần của bất kỳ ai. Bạn tỏa sáng khi được thể hiện bản thân.", "Tránh sự hời hợt và tập trung vào chiều sâu."),
      4: formatContent("Số 4: Người Kiến Thiết", "Kỷ luật - Thực tế - Chắc chắn", "Bạn là trụ cột vững chắc. Bạn làm việc có quy trình, tỉ mỉ và đáng tin cậy. Thành công của bạn đến từ sự tích lũy bền bỉ theo thời gian.", "Hãy mở lòng với những thay đổi và bớt cứng nhắc."),
      5: formatContent("Số 5: Người Phiêu Lưu", "Tự do - Linh hoạt - Đổi mới", "Bạn là cơn gió của sự thay đổi. Bạn ghét sự ràng buộc và luôn khao khát những trải nghiệm mới. Sức hút của bạn đến từ năng lượng dồi dào và sự đa tài.", "Tự do thực sự nằm trong kỷ luật tự giác."),
      6: formatContent("Số 6: Người Chăm Sóc", "Yêu thương - Trách nhiệm - Hy sinh", "Bạn là trái tim của gia đình. Bạn luôn muốn che chở và chăm sóc cho người khác. Hạnh phúc của bạn gắn liền với sự bình yên của những người thân yêu.", "Học cách yêu thương bản thân trước khi yêu người khác."),
      7: formatContent("Số 7: Người Chiêm Nghiệm", "Tri thức - Độc lập - Tâm linh", "Bạn là ngọn hải đăng cô độc. Bạn thích tìm hiểu bản chất của vấn đề và có đời sống nội tâm sâu sắc. Trí tuệ và trực giác là vũ khí mạnh nhất của bạn.", "Kết nối với mọi người để tránh sự cô lập."),
      8: formatContent("Số 8: Người Điều Hành", "Thành công - Tiền bạc - Quyền lực", "Bạn là người hiện thực hóa các mục tiêu. Bạn có tư duy kinh doanh và khả năng quản lý tài chính xuất sắc. Bạn sinh ra để chinh phục thế giới vật chất.", "Cân bằng giữa tham vọng và đời sống tinh thần."),
      9: formatContent("Số 9: Người Cho Đi", "Bao dung - Nhân đạo - Lí tưởng", "Bạn là người của cộng đồng. Bạn có tấm lòng trắc ẩn và luôn muốn cống hiến cho xã hội. Bạn mang sứ mệnh hoàn thiện và chữa lành.", "Học cách buông bỏ quá khứ để tiến về phía trước."),
      11: formatContent("Số 11: Bậc Thầy Trực Giác", "Nhạy bén - Tâm linh - Khai sáng", "Bạn sở hữu trực giác cực mạnh và khả năng kết nối tâm linh. Bạn ở đây để truyền cảm hứng và đánh thức nhận thức của người khác.", "Giữ đôi chân trên mặt đất để biến ý tưởng thành hiện thực."),
      22: formatContent("Số 22: Kiến Trúc Sư Đại Tài", "Tầm nhìn - Hành động - Vĩ mô", "Bạn có khả năng biến những giấc mơ vĩ đại nhất thành hiện thực. Bạn kết hợp được tầm nhìn của số 11 và sự thực tế của số 4.", "Đừng để áp lực thành công đè nẹp bạn."),
      33: formatContent("Số 33: Bậc Thầy Chữa Lành", "Tận tụy - Chữa lành - Hướng thiện", "Con số của tình yêu thương vô điều kiện. Bạn mang sứ mệnh nâng đỡ tâm hồn nhân loại qua sự sẻ chia và thấu hiểu.", "Đừng gánh vác nỗi đau của cả thế giới lên vai mình.")
    }
  },
  destiny: {
    [Language.EN]: {
      1: formatContentEn("Destiny 1: The Pioneer", "Leadership, Innovation, Individuality", "Your destiny is to lead and innovate. You are here to demonstrate the power of individuality and to start new things.", "Take initiative, but remember a good leader also knows how to listen."),
      2: formatContentEn("Destiny 2: The Partner", "Harmony, Mediation, Support", "Your destiny is to bring people together. You are here to create harmony, resolve conflicts, and support others in achieving their goals.", "Trust your diplomatic skills; you don't always need to be in the spotlight to be effective."),
      3: formatContentEn("Destiny 3: The Performer", "Expression, Optimism, Inspiration", "Your destiny is to inspire and uplift others through self-expression. Whether through art, speech, or writing, you bring joy to the world.", "Focus your energy; don't scatter your talents in too many directions."),
      4: formatContentEn("Destiny 4: The Organizer", "Order, Service, Stability", "Your destiny is to build lasting foundations. You are here to bring order to chaos and create stability for yourself and others.", "Stay flexible; structure is good, but rigidity can hinder progress."),
      5: formatContentEn("Destiny 5: The Catalyst", "Freedom, Change, Progress", "Your destiny is to promote freedom and embrace change. You are here to show others how to adapt and explore new horizons.", "Embrace discipline so your quest for freedom doesn't become chaos."),
      6: formatContentEn("Destiny 6: The Caretaker", "Service, Responsibility, Balance", "Your destiny is to serve and nurture. You are here to create harmony in the home and community, acting for a pillar of support.", "Learn to say no; you cannot pour from an empty cup."),
      7: formatContentEn("Destiny 7: The Analyst", "Truth, Wisdom, Understanding", "Your destiny is to seek truth and wisdom. You are here to analyze the deeper mysteries of life and share your findings.", "Share your wisdom; don't isolate yourself in your ivory tower."),
      8: formatContentEn("Destiny 8: The Manifester", "Success, Authority, Abundance", "Your destiny is to master the material world. You are here to lead in business, manage resources, and create abundance.", "Balance material pursuit with spiritual understanding."),
      9: formatContentEn("Destiny 9: The Philanthropist", "Compassion, Universal Love, Wisdom", "Your destiny is to serve humanity. You are here to show compassion, forgive, and let go, acting for the greater good.", "Let go of the past and personal ego to truly serve."),
      11: formatContentEn("Destiny 11: The Illuminator", "Inspiration, Spirituality, Intuition", "Your destiny is to be a source of spiritual light. You are here to inspire others to see beyond the material world.", "Ground yourself daily to manage your high-frequency energy."),
      22: formatContentEn("Destiny 22: The Master Builder", "Creation, Impact, Legacy", "Your destiny is to build large-scale systems that benefit humanity. You turn dreams into concrete reality.", "Think big, but ensure your foundation is practical."),
      33: formatContentEn("Destiny 33: The Avatar", "Altruism, Healing, Teaching", "Your destiny is to teach the power of love. You are here to heal and uplift on a massive scale.", "Maintain your own boundaries while caring for the world.")
    },
    [Language.VI]: {
      1: formatContent("Sứ Mệnh 1: Người Tiên Phong", "Lãnh đạo - Khai phá - Độc bản", "Sứ mệnh của bạn là trở thành người đứng đầu. Bạn đến thế giới này để khẳng định cái tôi và khai mở những con đường chưa ai đi.", "Hãy học cách lãnh đạo bằng sự khiêm tốn, không phải bằng sự áp đặt."),
      2: formatContent("Sứ Mệnh 2: Người Kết Nối", "Hòa bình - Ngoại giao - Hỗ trợ", "Sứ mệnh của bạn là mang lại sự hòa hợp. Bạn là cầu nối giữa những mâu thuẫn và là hậu phương vững chắc cho sự thành công của tập thể.", "Đừng ngại đứng sau cánh gà, giá trị của bạn nằm ở sự kết nối."),
      3: formatContent("Sứ Mệnh 3: Người Truyền Cảm Hứng", "Sáng tạo - Tỏa sáng - Ngôn từ", "Sứ mệnh của bạn là mang lại niềm vui và động lực sống. Dù qua lời nói, nghệ thuật hay nụ cười, bạn giúp thế giới bớt tẻ nhạt hơn.", "Tránh sự hời hợt và phân tán năng lượng vào quá nhiều việc cùng lúc."),
      4: formatContent("Sứ Mệnh 4: Người Kiến Tạo", "Trật tự - Vững chắc - Quy trình", "Sứ mệnh của bạn là xây dựng những nền móng vững chãi. Bạn tạo ra quy trình, trật tự và sự an toàn cho cộng đồng và tổ chức.", "Hãy linh hoạt hơn, sự cứng nhắc có thể cản trở cơ hội của bạn."),
      5: formatContent("Sứ Mệnh 5: Nhà Cải Cách", "Tự do - Đổi mới - Trải nghiệm", "Sứ mệnh của bạn là phá vỡ những lối mòn cũ kỹ. Bạn thúc đẩy sự tiến bộ thông qua việc dám thay đổi và cổ vũ sự tự do.", "Tự do cần đi kèm với trách nhiệm, đừng để cuộc sống trở nên hỗn loạn."),
      6: formatContent("Sứ Mệnh 6: Người Chăm Sóc", "Yêu thương - Phụng sự - Trách nhiệm", "Sứ mệnh của bạn là xây dựng tổ ấm và cộng đồng. Bạn mang đến sự chữa lành, tình yêu thương và sự bao bọc cho những người xung quanh.", "Hãy nhớ chăm sóc bản thân, đừng để tình thương trở thành gánh nặng."),
      7: formatContent("Sứ Mệnh 7: Nhà Tư Tưởng", "Chân lý - Tri thức - Khai sáng", "Sứ mệnh của bạn là đi tìm bản chất của vạn vật. Bạn phân tích, chiêm nghiệm và chia sẻ lại những quy luật sâu sắc của cuộc đời.", "Hãy kết nối với mọi người thay vì tự cô lập mình trong tháp ngà tri thức."),
      8: formatContent("Sứ Mệnh 8: Nhà Lãnh Đạo Kinh Tế", "Thịnh vượng - Quyền lực - Vật chất", "Sứ mệnh của bạn là tạo ra giá trị vật chất và sự thịnh vượng. Bạn quản lý nguồn lực và sử dụng tiền bạc để tạo ra ảnh hưởng tích cực.", "Đừng để đồng tiền làm mờ mắt, hãy dùng nó làm phương tiện."),
      9: formatContent("Sứ Mệnh 9: Nhà Hoạt Động Xã Hội", "Nhân đạo - Cho đi - Hoàn thiện", "Sứ mệnh của bạn là cống hiến cho lợi ích chung. Bạn ở đây để dạy cho thế giới bài học về lòng trắc ẩn và sự buông bỏ.", "Học cách cho đi không mong cầu nhận lại để tâm hồn được thanh thản."),
      11: formatContent("Sứ Mệnh 11: Người Soi Sáng", "Tâm linh - Trực giác - Dẫn lối", "Sứ mệnh của bạn là ngọn đuốc về tinh thần. Bạn giúp người khác nhận ra tiềm năng và ý nghĩa cuộc sống vượt ngoài cơm áo gạo tiền.", "Giữ đôi chân trên mặt đất để không bị lạc trong những ảo tưởng."),
      22: formatContent("Sứ Mệnh 22: Kiến Trúc Sư Đại Tài", "Vĩ mô - Hiện thực hóa - Di sản", "Sứ mệnh của bạn là xây dựng những công trình hoặc hệ thống để đời. Bạn biến những giấc mơ vĩ đại nhất thành hiện thực.", "Hãy nghĩ lớn nhưng bắt đầu từ những bước đi thực tế."),
      33: formatContent("Sứ Mệnh 33: Bậc Thầy Yêu Thương", "Chữa lành - Hướng thiện - Tận tụy", "Sứ mệnh của bạn là dùng tình yêu thương để chữa lành nỗi đau nhân thế. Bạn là biểu tượng của lòng vị tha.", "Đừng gánh vác nỗi đau của cả thế giới lên vai mình.")
    }
  },
  soul: {
    [Language.EN]: {
      1: formatContentEn("Soul Urge 1: To Lead", "Achievement, Independence, Recognition", "Deep down, you crave to be the best and to be recognized for your individual achievements. You want to be the captain of your ship.", "Give yourself permission to take charge, but don't isolate yourself."),
      2: formatContentEn("Soul Urge 2: To Belong", "Love, Harmony, Connection", "Your soul craves love and companionship. You fear being alone and seek deep, harmonious connections with others.", "Validate your own feelings; don't rely solely on others for happiness."),
      3: formatContentEn("Soul Urge 3: To Express", "Creativity, Attention, Joy", "You crave an audience. Your soul wants to be heard, seen, and appreciated for your creative talents and wit.", "Create for the joy of it, not just for the applause."),
      4: formatContentEn("Soul Urge 4: To Secure", "Stability, Order, Plan", "Your soul seeks security and order. You want a predictable future and a solid financial foundation to feel safe.", "Allow yourself some spontaneity; security is internal, not just external."),
      5: formatContentEn("Soul Urge 5: To Be Free", "Adventure, Variety, Liberty", "You crave freedom above all else. Your soul withers in confinement; you want to experience everything the world has to offer.", "Commitment doesn't mean a cage; find freedom within your choices."),
      6: formatContentEn("Soul Urge 6: To Nurture", "Home, Family, Peace", "Your soul wants to care for others. You crave a peaceful home environment and to feel needed by your loved ones.", "Appreciate those who are self-sufficient; not everyone needs saving."),
      7: formatContentEn("Soul Urge 7: To Understand", "Knowledge, Privacy, Wisdom", "You crave quiet time to think and learn. Your soul seeks the answers to life's big questions and treasures privacy.", "Balance your need for solitude with the beauty of sharing."),
      8: formatContentEn("Soul Urge 8: To Succeed", "Power, Status, Control", "You crave success and influence. Your soul wants to prove its worth through material achievement and leadership.", "Define success by your own standards, not just society's."),
      9: formatContentEn("Soul Urge 9: To Give", "Idealism, Brotherhood, Legacy", "You crave a better world. Your soul is driven by a desire to help humanity and to leave a positive legacy.", "Start with small acts of kindness; you don't have to save the whole world at once."),
      11: formatContentEn("Soul Urge 11: To Enlighten", "Spirituality, Insight, Elevation", "You crave spiritual truth. Your soul wants to uplift others and connect with higher consciousness.", "Trust your inner voice, it is your greatest guide."),
      22: formatContentEn("Soul Urge 22: To Build", "Legacy, Impact, Creation", "You crave to make a tangible mark on history. You want to build something that lasts for generations.", "Don't get overwhelmed by the scale of your dreams; focus on the next step.")
    },
    [Language.VI]: {
      1: formatContent("Khao Khát 1: Được Dẫn Đầu", "Thành tựu - Độc lập - Chiến thắng", "Sâu thẳm bên trong, bạn khao khát được tự do quyết định và được công nhận là người giỏi nhất. Bạn muốn nắm quyền kiểm soát cuộc đời mình.", "Hãy dũng cảm theo đuổi đam mê, nhưng đừng quên trân trọng người đồng hành."),
      2: formatContent("Khao Khát 2: Được Yêu Thương", "Kết nối - Hòa hợp - Thấu hiểu", "Linh hồn bạn khao khát tình cảm và sự gắn kết. Bạn sợ sự cô đơn và luôn mong muốn có người để chia sẻ vui buồn.", "Hãy học cách yêu bản thân mình trước khi trông chờ tình yêu từ người khác."),
      3: formatContent("Khao Khát 3: Được Thể Hiện", "Sáng tạo - Chú ý - Tán thưởng", "Bạn muốn được lắng nghe và nhìn thấy. Hạnh phúc của bạn là khi tài năng và sự hài hước của mình mang lại tiếng cười cho người khác.", "Hãy sáng tạo vì niềm vui của chính bạn, đừng quá phụ thuộc vào tràng pháo tay."),
      4: formatContent("Khao Khát 4: Sự An Toàn", "Ổn định - Trật tự - Chắc chắn", "Bạn khao khát một cuộc sống có kế hoạch rõ ràng và tài chính vững vàng. Sự bấp bênh làm bạn lo lắng tột độ.", "Hãy tin rằng bạn đủ bản lĩnh để đối mặt với rủi ro, an toàn thực sự nằm ở nội lực."),
      5: formatContent("Khao Khát 5: Sự Tự Do", "Phiêu lưu - Trải nghiệm - Phóng khoáng", "Bạn khao khát được đi và trải nghiệm. Linh hồn bạn sẽ héo mòn nếu bị nhốt trong những quy tắc cứng nhắc và nhàm chán.", "Cam kết không phải là xiềng xích, nó là nền tảng để bạn tự do bay cao hơn."),
      6: formatContent("Khao Khát 6: Sự Bình Yên", "Gia đình - Chăm sóc - Cần thiết", "Bạn khao khát một mái ấm hạnh phúc. Bạn muốn cảm thấy mình quan trọng và được người khác cần đến sự chăm sóc của mình.", "Hãy để người khác tự lập, đôi khi sự giúp đỡ quá mức lại kìm hãm họ."),
      7: formatContent("Khao Khát 7: Sự Thấu Hiểu", "Tri thức - Riêng tư - Chân lý", "Bạn khao khát không gian riêng tư để chiêm nghiệm. Linh hồn bạn thỏa mãn khi tìm ra câu trả lời cho những bí ẩn.", "Hãy mở lòng chia sẻ những gì bạn biết, tri thức chỉ sống khi được lan tỏa."),
      8: formatContent("Khao Khát 8: Sự Thành Công", "Quyền lực - Địa vị - Tài sản", "Bạn khao khát khẳng định giá trị bản thân qua thành tựu vật chất. Bạn muốn được nể trọng và có tầm ảnh hưởng.", "Định nghĩa thành công bằng hạnh phúc nội tại, không chỉ là con số trong tài khoản."),
      9: formatContent("Khao Khát 9: Sự Cống Hiến", "Lý tưởng - Nhân loại - Cho đi", "Bạn khao khát thế giới tốt đẹp hơn. Linh hồn bạn được nuôi dưỡng bằng những hành động thiện nguyện và bao dung.", "Hãy bắt đầu từ những việc nhỏ bé, tình yêu thương không cần phải vĩ mô."),
      11: formatContent("Khao Khát 11: Sự Khai Sáng", "Tâm linh - Trực giác - Thăng hoa", "Bạn khao khát tìm thấy ý nghĩa tâm linh của cuộc sống. Bạn muốn kết nối với những tần số cao hơn.", "Hãy tin vào trực giác của mình, đó là la bàn chính xác nhất."),
      22: formatContent("Khao Khát 22: Sự Vĩ Đại", "Di sản - Kiến tạo - Bền vững", "Bạn khao khát để lại dấu ấn không thể phai mờ. Bạn muốn những gì mình làm hôm nay còn giá trị mãi về sau.", "Đừng để áp lực của sự vĩ đại đè nẹp niềm vui của hiện tại.")
    }
  },
  personality: {
    [Language.EN]: {
      1: formatContentEn("Personality 1: The Warrior", "Confident, Dynamic, Independent", "You project an aura of confidence and independence. People see you as a leader and someone who can take charge of a situation.", "Ensure your confidence doesn't come across as arrogance."),
      2: formatContentEn("Personality 2: The Diplomat", "Friendly, Approachable, Gentle", "You appear modest, shy, and gentle. People find you easy to talk to and see you as a natural peacemaker.", "Don't be afraid to speak up; your gentleness is a strength, not a weakness."),
      3: formatContentEn("Personality 3: The Charmer", "Attractive, Witty, Social", "You have a magnetic personality. People are drawn to your charm, wit, and friendly demeanor. You dress well and look artistic.", "Depth is as important as surface shine; let people see your serious side too."),
      4: formatContentEn("Personality 4: The Rock", "Serious, Practical, Trustworthy", "You project an image of stability and reliability. People look to you when they need things done right. You dress conservatively.", "Smile more; let people know you have a lighter side."),
      5: formatContentEn("Personality 5: The Catalyst", "Energetic, Stylish, Unconventional", "You appear adventurous and full of life. You have a quick wit and a stylish, perhaps trendy, way of dressing. People see you as exciting.", "Try to focus; sometimes you can appear too scattered to others."),
      6: formatContentEn("Personality 6: The Guardian", "Warm, Protective, Responsible", "You radiate a protective and motherly/fatherly vibe. People feel safe around you and often come to you for advice.", "Watch out for being too intrusive; allow others their space."),
      7: formatContentEn("Personality 7: The Enigma", "Mysterious, Intelligent, Distant", "You have an air of mystery and intelligence. People may find you hard to know or slightly aloof, but they respect your mind.", "Make an effort to connect warmth with your wisdom so you don't seem cold."),
      8: formatContentEn("Personality 8: The Boss", "Powerful, Strong, Impressive", "You project authority and strength. People sense your power immediately. You dress for success and command respect.", "Soften your edge; power is more effective when coupled with kindness."),
      9: formatContentEn("Personality 9: The Aristocrat", "Charismatic, Elegant, Generous", "You have a noble and charismatic presence. People see you as a humanitarian and a person of the world. You seem generous and kind.", "Stay grounded; don't let your idealism make you seem detached from reality."),
      11: formatContentEn("Personality 11: The Inspirer", "Visionary, Intense, Electric", "You have a high-voltage energy that can be felt by others. You seem artistic and intuitive, perhaps a bit ungrounded.", "Use your nervous energy constructively to inspire rather than overwhelm."),
      22: formatContentEn("Personality 22: The Master Builder", "Competent, Powerful, Steady", "You project an image of immense capability. People feel you can handle anything, no matter how big.", "Don't intimidate others with your efficiency; show them how to help."),
      33: formatContentEn("Personality 33: The Nurturer", "Protective, Caring, Saintly", "You appear as a shoulder to cry on for the world. People see you as incredibly kind and understanding.", "Ensure you don't project a martyr image; healthy boundaries command respect.")
    },
    [Language.VI]: {
      1: formatContent("Nhân Cách 1: Chiến Binh", "Tự tin - Mạnh mẽ - Độc lập", "Bạn toát lên vẻ tự tin và độc lập. Người khác nhìn thấy ở bạn tố chất lãnh đạo và là người dám đứng mũi chịu sào.", "Hãy chắc chắn rằng sự tự tin của bạn không bị hiểu nhầm là kiêu ngạo."),
      2: formatContent("Nhân Cách 2: Sứ Giả Hòa Bình", "Thân thiện - Nhẹ nhàng - Dễ gần", "Bạn có vẻ ngoài khiêm tốn, nhẹ nhàng và đôi chút e dè. Mọi người cảm thấy dễ chịu khi ở bên bạn và xem bạn là người biết lắng nghe.", "Đừng ngại thể hiện chính kiến, sự dịu dàng là sức mạnh chứ không phải điểm yếu."),
      3: formatContent("Nhân Cách 3: Người Cuốn Hút", "Hấp dẫn - Vui vẻ - Nghệ sĩ", "Bạn có sức hút tự nhiên. Mọi người bị lôi cuốn bởi sự hóm hỉnh và vẻ ngoài rạng rỡ của bạn. Bạn thường có gu ăn mặc đẹp.", "Hãy để mọi người thấy cả chiều sâu của bạn, không chỉ là vẻ bề ngoài hào nhoáng."),
      4: formatContent("Nhân Cách 4: Tảng Đá", "Nghiêm túc - Chỉn chu - Đáng tin", "Bạn toát lên vẻ ổn định và đáng tin cậy. Mọi người tìm đến bạn khi cần sự chắc chắn. Bạn thường ăn mặc gọn gàng, cổ điển.", "Hãy cười nhiều hơn để mọi người thấy bạn cũng rất dễ mến."),
      5: formatContent("Nhân Cách 5: Ngọn Lửa", "Năng động - Sành điệu - Khác biệt", "Bạn trông tràn đầy năng lượng và sự hứng khởi. Phong cách của bạn thường hiện đại, bắt mắt. Người khác thấy bạn thật thú vị.", "Đôi khi bạn có vẻ quá thất thường trong mắt người khác, hãy học cách điềm tĩnh hơn."),
      6: formatContent("Nhân Cách 6: Người Bảo Vệ", "Ấm áp - Che chở - Trách nhiệm", "Bạn toát lên sự quan tâm như một người cha/người mẹ. Mọi người cảm thấy an toàn khi ở bên bạn và thường xin bạn lời khuyên.", "Đừng can thiệp quá sâu vào chuyện người khác, hãy tôn trọng không gian riêng của họ."),
      7: formatContent("Nhân Cách 7: Ẩn Số", "Bí ẩn - Trí tuệ - Xa cách", "Bạn có vẻ gì đó rất bí ẩn và thông thái. Người khác có thể thấy bạn hơi khó gần hoặc lạnh lùng, nhưng họ nể phục trí tuệ của bạn.", "Hãy cố gắng thể hiện sự ấm áp khi chia sẻ kiến thức để không bị xem là kẻ trịch thượng."),
      8: formatContent("Nhân Cách 8: Ông Chủ", "Quyền uy - Sang trọng - Mạnh mẽ", "Bạn toát lên khí chất quyền lực và thành đạt. Bạn thường ăn mặc sang trọng và khiến người khác phải nể trọng ngay từ cái nhìn đầu tiên.", "Hãy làm mềm sự sắc sảo của mình, quyền lực thực sự đi cùng với lòng nhân ái."),
      9: formatContent("Nhân Cách 9: Quý Tộc", "Thanh lịch - Hào phóng - Bao dung", "Bạn có phong thái của một quý tộc hoặc nhà nhân đạo. Mọi người thấy bạn là người rộng lượng, tốt bụng và có tầm nhìn xa.", "Hãy giữ đôi chân trên mặt đất, đừng để lý tưởng khiến bạn xa rời thực tế."),
      11: formatContent("Nhân Cách 11: Người Truyền Cảm Hứng", "Trực giác - Nghệ sĩ - Khác biệt", "Bạn có một nguồn năng lượng đặc biệt khiến người khác chú ý. Bạn trông có vẻ nghệ sĩ, nhạy cảm và đôi khi hơi 'trên mây'.", "Hãy dùng năng lượng của mình để truyền cảm hứng thay vì gây áp lực cho người khác."),
      22: formatContent("Nhân Cách 22: Người Kiến Tạo", "Vững chãi - Tài giỏi - Uy tín", "Bạn toát lên vẻ năng lực vượt trội. Mọi người cảm thấy bạn có thể giải quyết mọi vấn đề, dù lớn đến đâu.", "Đừng khiến người khác sợ hãi vì sự hoàn hảo của bạn, hãy hướng dẫn họ cùng làm."),
      33: formatContent("Nhân Cách 33: Người Chữa Lành", "Nhân hậu - Thấu cảm - Hiền hòa", "Bạn trông như một bến đỗ bình yên cho mọi người. Người khác thấy ở bạn sự thấu hiểu và lòng tốt vô điều kiện.", "Hãy thiết lập ranh giới lành mạnh để không bị lợi dụng lòng tốt.")
    }
  },
  personalYear: {
    [Language.EN]: {
      1: formatDetailedYearEN("Personal Year 1: New Beginnings",
        "The start of a 9-year cycle. High energy for new projects, independence, and self-discovery. A time to plant seeds for the future.",
        "Take initiative. Start that business, apply for that promotion, or launch that project. Trust your own judgment over others.",
        "You may feel more independent, which can cause friction. Ensure you don't alienate partners while pursuing your goals.",
        "Don't procrastinate. Action is the key this year."
      ),
      2: formatDetailedYearEN("Personal Year 2: Balance & Patience",
        "A slower pace focused on cooperation, details, and waiting. It's a gestation period for the seeds planted last year.",
        "Success comes through teamwork and networking. Don't force issues; let things come to you. Pay attention to contracts.",
        "A powerful year for romance and deepening connections. Listen more than you speak. Diplomacy is your superpower.",
        "Be patient. Pushing too hard will backfire."
      ),
      3: formatDetailedYearEN("Personal Year 3: Self-Expression",
        "A year of social expansion, creativity, and joy. It's time to communicate your truth and find happiness.",
        "Use your creativity. Networking and social events can lead to business opportunities. Marketing and writing are favored.",
        "A fun, flirtatious energy. Great for meeting new people, but be careful of superficial flings. Express your feelings openly.",
        "Watch your spending and avoid scattering your energy."
      ),
      4: formatDetailedYearEN("Personal Year 4: Building Foundations",
        "A practical year requiring hard work, discipline, and organization. You are building the structure for your future.",
        "Focus on details, systems, and efficiency. It's not a year for get-rich-quick schemes, but for steady progress.",
        "Commitment is the theme. Relationships need stability and effort. Work may take precedence over romance.",
        "Don't cut corners. Health also needs attention."
      ),
      5: formatDetailedYearEN("Personal Year 5: Change & Freedom",
        "A dynamic year of unexpected changes, travel, and new experiences. Break free from old routines.",
        "Be adaptable. Market conditions or job roles may shift. Embrace freelance work or travel-related opportunities.",
        "Passionate and adventurous. Existing relationships may be tested if they feel stifling. Singles will enjoy variety.",
        "Avoid impulsive risks. Change is good, chaos is not."
      ),
      6: formatDetailedYearEN("Personal Year 6: Responsibility",
        "Focus on home, family, and duty. A year to nurture relationships and serve your community.",
        "Service-oriented businesses thrive. You may take on more responsibility at work. A good year for home investments.",
        "Marriage, family expansion, or healing rifts. You are the emotional anchor for others.",
        "Don't become a martyr. Balance care for others with self-care."
      ),
      7: formatDetailedYearEN("Personal Year 7: Introspection",
        "A quiet year for spiritual growth, study, and rest. Look inward rather than outward.",
        "Research, analysis, and planning are favored over aggressive expansion. Trust your intuition in business.",
        "You may need more solitude. Partners should respect your need for space. A time to analyze what you truly want.",
        "Don't force material success; focus on knowledge."
      ),
      8: formatDetailedYearEN("Personal Year 8: Achievement",
        "The year of harvest. Focus on money, power, and career advancement. You reap what you have sown.",
        "Go for the promotion, invest, and manage resources. Authority and leadership are your tools.",
        "Power dynamics in relationships may surface. Ensure equality. A power couple vibe is possible.",
        "Stay ethical in your pursuit of success."
      ),
      9: formatDetailedYearEN("Personal Year 9: Completion",
        "The end of the cycle. A time to finish projects, declutter, and let go of what no longer serves you.",
        "Wrap up old business. Don't start massive new ventures yet. Clear debts and organize for the new cycle.",
        "Relationships that have run their course may end. Forgive and move on. Compassion is key.",
        "Let go gracefully to make space for the new."
      )
    },
    [Language.VI]: {
      1: formatDetailedYearVI("Năm Cá Nhân 1: Khởi Đầu Mới",
        "Khởi đầu của chu kỳ 9 năm. Năng lượng mạnh mẽ cho các dự án mới, sự độc lập và khám phá bản thân. Gieo hạt cho tương lai.",
        "Hãy chủ động. Bắt đầu kinh doanh, ứng tuyển vị trí mới hoặc triển khai dự án. Tin vào phán đoán của chính mình.",
        "Bạn có thể cảm thấy muốn độc lập hơn. Đừng để điều này tạo khoảng cách với người thương. Hãy chia sẻ tầm nhìn của bạn.",
        "Đừng trì hoãn. Hành động là chìa khóa của năm nay."
      ),
      2: formatDetailedYearVI("Năm Cá Nhân 2: Cân Bằng & Kiên Nhẫn",
        "Nhịp sống chậm lại, tập trung vào hợp tác và chi tiết. Đây là giai đoạn ấp ủ cho những hạt giống đã gieo năm ngoái.",
        "Thành công đến từ làm việc nhóm và kết nối. Đừng ép buộc mọi thứ; hãy để cơ hội tự đến. Chú ý kỹ các hợp đồng.",
        "Năm tuyệt vời cho sự lãng mạn và kết nối sâu sắc. Lắng nghe nhiều hơn nói. Sự khéo léo là vũ khí của bạn.",
        "Hãy kiên nhẫn. Nóng vội sẽ làm hỏng việc."
      ),
      3: formatDetailedYearVI("Năm Cá Nhân 3: Sáng Tạo & Tỏa Sáng",
        "Năm của mở rộng xã hội, sáng tạo và niềm vui. Đã đến lúc nói lên sự thật và tìm kiếm hạnh phúc.",
        "Sử dụng sự sáng tạo. Giao tiếp xã hội mang lại cơ hội kinh doanh. Viết lách, marketing rất thuận lợi.",
        "Năng lượng vui vẻ, tán tỉnh. Tuyệt vời để gặp người mới, nhưng cẩn thận những mối quan hệ hời hợt.",
        "Kiểm soát chi tiêu và tránh phân tán năng lượng."
      ),
      4: formatDetailedYearVI("Năm Cá Nhân 4: Củng Cố Nền Tảng",
        "Một năm thực tế đòi hỏi làm việc chăm chỉ, kỷ luật và tổ chức. Bạn đang xây dựng khung sườn cho tương lai.",
        "Tập trung vào chi tiết, quy trình và hiệu quả. Không phải lúc làm giàu nhanh, mà là tiến bộ vững chắc.",
        "Cam kết là chủ đề chính. Mối quan hệ cần sự ổn định. Công việc có thể chiếm ưu thế hơn tình cảm.",
        "Đừng đốt cháy giai đoạn. Chú ý sức khỏe xương khớp."
      ),
      5: formatDetailedYearVI("Năm Cá Nhân 5: Thay Đổi & Tự Do",
        "Một năm năng động với những thay đổi bất ngờ, du lịch và trải nghiệm mới. Phá vỡ những thói quen cũ.",
        "Hãy thích nghi. Công việc hoặc thị trường có thể thay đổi. Đón nhận cơ hội làm tự do hoặc đi lại nhiều.",
        "Đam mê và phiêu lưu. Mối quan hệ cũ có thể bị thử thách nếu quá gò bó. Người độc thân sẽ có nhiều lựa chọn.",
        "Tránh rủi ro bốc đồng. Thay đổi là tốt, hỗn loạn thì không."
      ),
      6: formatDetailedYearVI("Năm Cá Nhân 6: Trách Nhiệm & Gia Đình",
        "Tập trung vào gia đình, tổ ấm và bổn phận. Năm để nuôi dưỡng các mối quan hệ và phụng sự cộng đồng.",
        "Các ngành dịch vụ phát triển tốt. Bạn có thể nhận thêm trách nhiệm. Năm tốt để đầu tư nhà cửa.",
        "Kết hôn, sinh con hoặc hàn gắn rạn nứt. Bạn là điểm tựa cảm xúc cho người khác.",
        "Đừng ôm đồm làm 'Thánh tử vì đạo'. Chăm sóc mình trước khi chăm người."
      ),
      7: formatDetailedYearVI("Năm Cá Nhân 7: Chiêm Nghiệm & Nội Tâm",
        "Năm tĩnh lặng để phát triển tâm linh, học tập và nghỉ ngơi. Nhìn vào bên trong thay vì hướng ngoại.",
        "Nghiên cứu, phân tích và lập kế hoạch được ưu tiên hơn mở rộng ồ ạt. Tin vào trực giác trong kinh doanh.",
        "Bạn cần không gian riêng. Đối tác cần tôn trọng sự riêng tư của bạn. Thời gian để hiểu mình thực sự muốn gì.",
        "Đừng cưỡng cầu vật chất; tập trung vào tri thức."
      ),
      8: formatDetailedYearVI("Năm Cá Nhân 8: Thành Tựu & Quyền Lực",
        "Năm gặt hái. Tập trung vào tiền bạc, quyền lực và thăng tiến sự nghiệp. Bạn nhận lại những gì đã gieo.",
        "Nhắm đến thăng chức, đầu tư và quản lý nguồn lực. Uy quyền và lãnh đạo là công cụ của bạn.",
        "Cẩn thận vấn đề quyền lực trong quan hệ. Hãy đảm bảo sự bình đẳng. Có thể gặp đối tác mạnh về tài chính.",
        "Giữ đạo đức kinh doanh khi theo đuổi thành công."
      ),
      9: formatDetailedYearVI("Năm Cá Nhân 9: Hoàn Tất & Buông Bỏ",
        "Kết thúc chu kỳ. Thời gian để hoàn thành dự án, dọn dẹp và buông bỏ những gì không còn phù hợp.",
        "Kết thúc việc cũ. Chưa nên bắt đầu dự án lớn mới. Trả nợ và sắp xếp lại tổ chức cho chu kỳ mới.",
        "Mối quan hệ đã hết duyên có thể kết thúc. Hãy tha thứ và bước tiếp. Lòng trắc ẩn là chìa khóa.",
        "Buông bỏ nhẹ nhàng để dọn chỗ cho cái mới."
      )
    }
  },
  pinnacles: {
    [Language.EN]: {
      1: formatContentEn("Pinnacle 1: The Leader", "Independence, Courage, Willpower", "A period where you must learn to stand on your own feet. You will face circumstances that require leadership and individual action.", "Trust yourself and take initiative."),
      2: formatContentEn("Pinnacle 2: The Diplomat", "Cooperation, Detail, Emotion", "A time for partnership and patience. You will deal with others' feelings and learn the art of diplomacy.", "Be sensitive to the needs of others."),
      3: formatContentEn("Pinnacle 3: The Communicator", "Creativity, Expression, Socializing", "A joyful period emphasizing self-expression. Opportunities come through social connections and creative endeavors.", "Express your true feelings."),
      4: formatContentEn("Pinnacle 4: The Builder", "Work, Order, Foundation", "A demanding period of hard work. You are building the foundation for your future security.", "Stay disciplined and organized."),
      5: formatContentEn("Pinnacle 5: The Explorer", "Change, Freedom, Travel", "A dynamic time of change and uncertainty. You will learn to adapt to new situations and embrace freedom.", "Embrace change as an opportunity."),
      6: formatContentEn("Pinnacle 6: The Nurturer", "Responsibility, Home, Service", "A period focused on family and community duties. You will find satisfaction in serving others.", "Balance your needs with those of others."),
      7: formatContentEn("Pinnacle 7: The Seeker", "Study, Introspection, Spiritual Growth", "A quiet time for inner development. You may feel withdrawn as you seek deeper truths.", "Trust your intuition and study deeply."),
      8: formatContentEn("Pinnacle 8: The Executive", "Power, Money, Authority", "A period of material achievement. You will learn to manage resources and lead with authority.", "Use your power wisely."),
      9: formatContentEn("Pinnacle 9: The Humanitarian", "Compassion, Letting Go, Completion", "A time of endings and global awareness. You are asked to give back to the world and release the past.", "Let go with grace and forgive."),
      11: formatContentEn("Pinnacle 11: The Illuminator", "Inspiration, Fame, High Energy", "A master cycle offering spiritual insight and potential for fame. It can be high-pressure but rewarding.", "Ground your energy to inspire others."),
      22: formatContentEn("Pinnacle 22: The Master Builder", "Big Vision, Global Impact, Creation", "A powerful time to make large-scale dreams a reality. You have the potential to build something lasting.", "Think big but act practically."),
      33: formatContentEn("Pinnacle 33: The Master Teacher", "Love, Healing, Service", "A rare cycle of selfless service. You are called to heal and teach through love.", "Serve with a full heart.")
    },
    [Language.VI]: {
      1: formatContent("Đỉnh Cao 1: Người Lãnh Đạo", "Độc Lập, Can Đảm, Ý Chí", "Giai đoạn bạn phải học cách tự đứng trên đôi chân mình. Hoàn cảnh đòi hỏi bạn thể hiện khả năng lãnh đạo.", "Hãy tin vào bản thân và chủ động."),
      2: formatContent("Đỉnh Cao 2: Nhà Ngoại Giao", "Hợp Tác, Chi Tiết, Cảm Xúc", "Thời gian cho sự hợp tác và kiên nhẫn. Bạn sẽ học cách xử lý cảm xúc và nghệ thuật ngoại giao.", "Hãy nhạy cảm với nhu cầu của người khác."),
      3: formatContent("Đỉnh Cao 3: Người Truyền Đạt", "Sáng Tạo, Biểu Đạt, Xã Hội", "Giai đoạn vui vẻ nhấn mạnh sự thể hiện bản thân. Cơ hội đến từ các mối quan hệ xã hội và sáng tạo.", "Hãy bày tỏ cảm xúc thật của bạn."),
      4: formatContent("Đỉnh Cao 4: Người Xây Dựng", "Công Việc, Trật Tự, Nền Tảng", "Giai đoạn đòi hỏi làm việc chăm chỉ. Bạn đang xây dựng nền móng cho sự an toàn trong tương lai.", "Hãy kỷ luật và ngăn nắp."),
      5: formatContent("Đỉnh Cao 5: Nhà Thám Hiểm", "Thay Đổi, Tự Do, Di Chuyển", "Thời gian năng động của sự thay đổi. Bạn sẽ học cách thích nghi với tình huống mới và đón nhận tự do.", "Xem thay đổi là cơ hội."),
      6: formatContent("Đỉnh Cao 6: Người Nuôi Dưỡng", "Trách Nhiệm, Gia Đình, Phụng Sự", "Giai đoạn tập trung vào gia đình và cộng đồng. Bạn sẽ tìm thấy sự thỏa mãn trong việc phục vụ.", "Cân bằng nhu cầu bản thân và người khác."),
      7: formatContent("Đỉnh Cao 7: Người Tìm Kiếm", "Học Tập, Nội Tâm, Tâm Linh", "Thời gian tĩnh lặng để phát triển bên trong. Bạn có thể muốn thu mình lại để tìm kiếm chân lý.", "Tin vào trực giác và nghiên cứu sâu."),
      8: formatContent("Đỉnh Cao 8: Nhà Điều Hành", "Quyền Lực, Tiền Bạc, Uy Quyền", "Giai đoạn của thành tựu vật chất. Bạn sẽ học cách quản lý nguồn lực và lãnh đạo.", "Sử dụng quyền lực một cách khôn ngoan."),
      9: formatContent("Đỉnh Cao 9: Nhà Nhân Đạo", "Từ Bi, Buông Bỏ, Hoàn Tất", "Thời gian của những kết thúc và nhận thức toàn cầu. Bạn được yêu cầu cống hiến và buông bỏ quá khứ.", "Buông bỏ nhẹ nhàng và tha thứ."),
      11: formatContent("Đỉnh Cao 11: Người Soi Sáng", "Cảm Hứng, Danh Tiếng, Năng Lượng Cao", "Chu kỳ bậc thầy mang lại cái nhìn tâm linh và tiềm năng danh tiếng. Áp lực cao nhưng phần thưởng lớn.", "Giữ vững tinh thần để truyền cảm hứng."),
      22: formatContent("Đỉnh Cao 22: Kiến Trúc Sư", "Tầm Nhìn Lớn, Tác Động Toàn Cầu, Kiến Tạo", "Thời điểm mạnh mẽ để biến giấc mơ lớn thành hiện thực. Bạn có tiềm năng xây dựng di sản.", "Nghĩ lớn nhưng hành động thực tế."),
      33: formatContent("Đỉnh Cao 33: Bậc Thầy Chữa Lành", "Tình Yêu, Chữa Lành, Phụng Sự", "Chu kỳ hiếm có của sự phục vụ quên mình. Bạn được kêu gọi chữa lành và dạy dỗ bằng tình yêu.", "Phụng sự bằng cả trái tim.")
    }
  }
};