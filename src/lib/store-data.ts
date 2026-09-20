import { useState, useEffect, useCallback } from "react";

export interface StoreCategory {
  id: string;
  name: string;
  href: string;
  image: string;
  bannerImage?: string | undefined;
  alt: string;
  description?: string | undefined;
  tag?: string | undefined;
  order: number;
  isActive: boolean;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | undefined;
  image: string;
  category:
    | "abayas"
    | "dresses"
    | "khimar"
    | "isdalat"
    | "accessories"
    | "hijab-supplies"
    | "sales"
    | (string & {});
  stock: number;
  href: string;
  description?: string | undefined;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  shippingCost: number;
  grandTotal: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string | undefined;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: "customer" | "admin";
  text: string;
  timestamp: string;
  isRead: boolean;
  productAttachment?: {
    name: string;
    price: number;
    image: string;
  };
}

export interface CustomerConversation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  wilaya: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

// Initial Default Products Data
const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "product-1",
    name: "عباءة سوداء مطرزة",
    price: 4500,
    originalPrice: 5200,
    image: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
    category: "abayas",
    stock: 14,
    href: "/abayas",
    description: "عباءة بتصميم خليجي فاخر وقماش كريب ناعم مع تطريز يدوي على الأكمام.",
    createdAt: "2026-09-10",
  },
  {
    id: "product-2",
    name: "عباية استقبال عاجية راقية",
    price: 3800,
    originalPrice: 4200,
    image: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
    category: "abayas",
    stock: 8,
    href: "/abayas",
    description: "عباءة استقبال راقية بلون عاجي ملكي مع نقوش زهور مائية وتطريز ناعم يناسب الاستقبال والمناسبات.",
    createdAt: "2026-09-12",
  },
  {
    id: "product-3",
    name: "خمار شيفون ولؤلؤ فاخر",
    price: 2200,
    image: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
    category: "khimar",
    stock: 25,
    href: "/khimar",
    description: "خمار تركي مصنوع من أجود أنواع الشيفون والحرير البارد لراحة تدوم طوال اليوم.",
    createdAt: "2026-09-14",
  },
  {
    id: "product-4",
    name: "كاب شوكولاتة فخم",
    price: 3400,
    originalPrice: 3900,
    image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    category: "dresses",
    stock: 12,
    href: "/dresses",
    description: "فستان طويل عملي بقماش ناعم لا يتجعد مناسب لجميع فصول السنة.",
    createdAt: "2026-09-15",
  },
  {
    id: "product-5",
    name: "إسدال صلاة سماوي وأبيض",
    price: 3000,
    image: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
    category: "isdalat",
    stock: 19,
    href: "/isdalat",
    description: "إسدال صلاة وخروج مريح جداً بخامة قطنية ناعمة وساترة ومزود بسحاب مخفي.",
    createdAt: "2026-09-16",
  },
  {
    id: "product-6",
    name: "حجاب شيفون أسود حريري",
    price: 1200,
    image: "/images/uploads/hijab_black_silk_chiffon_1789831330976.jpg",
    category: "hijab-supplies",
    stock: 40,
    href: "/hijab-supplies",
    description: "حجاب شيفون كريب ممتاز غير شفاف ومثالي للتثبيت السريع.",
    createdAt: "2026-09-16",
  },
  {
    id: "product-7",
    name: "حقيبة يد عاجية AKIKI",
    price: 4800,
    image: "/images/uploads/akiki_cream_handbag_1789829330238.jpg",
    category: "accessories",
    stock: 15,
    href: "/accessories",
    description: "طقم حقيبة يد راقية بلون عاجي فخم مع مقبض ملفوف بوشاح حريري ومحفظة نقود دائرية أنيقة.",
    createdAt: "2026-09-17",
  },
  {
    id: "product-8",
    name: "عباءة عنابي بتطريز فضي",
    price: 5200,
    originalPrice: 6000,
    image: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
    category: "abayas",
    stock: 6,
    href: "/abayas",
    description: "عباءة سهرة فاخرة بتطريز خيوط فضية وقصة ملكية فخمة.",
    createdAt: "2026-09-18",
  },
  {
    id: "acc-1",
    name: "حقيبة يد عاجية فاخرة AKIKI",
    price: 4800,
    originalPrice: 5500,
    image: "/images/accessories/akiki-cream-bag.jpg",
    category: "accessories",
    stock: 12,
    href: "/accessories",
    description: "حقيبة يد راقية بلون عاجي فخم مع مقبض ملفوف بوشاح حريري ومحفظة نقود دائرية أنيقة.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-2",
    name: "حقيبة ميني بيضاء كلاسيكية",
    price: 5200,
    originalPrice: 6200,
    image: "/images/accessories/lady-white-bag.jpg",
    category: "accessories",
    stock: 8,
    href: "/accessories",
    description:
      "حقيبة يد بيضاء مصممة بأسلوب باريسي كلاسيكي مزينة بوشاح حريري وتشارمز ذهبية راقية.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-3",
    name: "حقيبة سهرة مطرزة بزهور كلاسيكية",
    price: 4600,
    originalPrice: 5200,
    image: "/images/accessories/embroidered-evening-bag.jpg",
    category: "accessories",
    stock: 10,
    href: "/accessories",
    description:
      "حقيبة سهرة فنتج فاخرة بقماش حريري مطرز بأزهار رقيقة ومقبض لؤلؤي مع إبزيم دائري مرصع باللؤلؤ.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-4",
    name: "حقيبة كروس جلدية بلون زيتي هادئ",
    price: 3900,
    image: "/images/accessories/sage-green-crossbody.jpg",
    category: "accessories",
    stock: 15,
    href: "/accessories",
    description: "حقيبة كتف عصرية بلون أخضر هادئ راقي مع قفل ذهبي وحزام قماشي عريض مطرز.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-5",
    name: "طوق شعر غصن اللؤلؤ الذهبي",
    price: 1800,
    image: "/images/accessories/pearl-branch-headband.jpg",
    category: "accessories",
    stock: 20,
    href: "/accessories",
    description:
      "طوق شعر ناعم مصمم كغصن شجر ذهبي رقيق مرصع بزهور اللؤلؤ الأبيض النقي للمناسبات والأعراس.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-6",
    name: "مشابك شعر فراشة كريستالية ولؤلؤية",
    price: 1600,
    originalPrice: 1900,
    image: "/images/accessories/butterfly-hair-claw.jpg",
    category: "accessories",
    stock: 25,
    href: "/accessories",
    description:
      "زوج مشابك شعر مفرغة بتصميم فراشة ملكية براقة مرصعة بأحجار الزركون والكريستال وحبيبات اللؤلؤ.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-7",
    name: "طوق شعر مزدوج بزهور باستيل ناعمة",
    price: 1900,
    image: "/images/accessories/pastel-flower-headband.jpg",
    category: "accessories",
    stock: 18,
    href: "/accessories",
    description: "طوق مزدوج ناعم من الذهب مزين بزهور كريستالية بلون سماوي باستيل وأبيض عاجي.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-8",
    name: "قلادة غصن الزهور بكريستال لافندر",
    price: 2400,
    originalPrice: 2800,
    image: "/images/accessories/amethyst-flower-necklace.jpg",
    category: "accessories",
    stock: 14,
    href: "/accessories",
    description:
      "عقد ذهبي ساحر بتفاصيل أغصان الشجر المتشابكة مع زهور بلون اللافندر البنفسجي وقلادة وردة متلألئة.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-9",
    name: "طقم خواتم باستيل ناعمة مرصعة",
    price: 2100,
    image: "/images/accessories/pastel-stacking-rings.jpg",
    category: "accessories",
    stock: 22,
    href: "/accessories",
    description:
      "تشكيلة خواتم ذهبية رقيقة قابلة للتكديس مرصعة بأحجار ملونة وأشكال زهور وفراشات وقلوب ناعمة.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-10",
    name: "سوار لؤلؤي بزهور كريستال سماوية",
    price: 1500,
    image: "/images/accessories/blue-beaded-bracelet.jpg",
    category: "accessories",
    stock: 30,
    href: "/accessories",
    description:
      "سوار يدوي رقيق يجمع بين لآلئ ناعمة وزهور خرز كريستالي أزرق فاتح مع قفل ذهبي متين.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-11",
    name: "سوار غصن الزيتون المرصع بالزركون",
    price: 2600,
    originalPrice: 3100,
    image: "/images/accessories/pandora-vine-bracelet.jpg",
    category: "accessories",
    stock: 16,
    href: "/accessories",
    description:
      "سوار ذهبي كلاسيكي فاخر مستوحى من أغصان الزيتون ومرصع بأحجار زركون بيضاوية فائقة اللمعان.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-12",
    name: "سوار روز جولد بأحجار زهرية فاخرة",
    price: 2700,
    image: "/images/accessories/pink-gem-bracelet.jpg",
    category: "accessories",
    stock: 14,
    href: "/accessories",
    description: "سوار أنثوي بلون الذهب الوردي مرصع بأحجار كريستالية وردية بتصميم غصن ناعم ومميز.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-13",
    name: "طقم أساور ملكية ذهبية (4 قطع)",
    price: 4900,
    originalPrice: 5800,
    image: "/images/accessories/luxury-bangle-stack.jpg",
    category: "accessories",
    stock: 9,
    href: "/accessories",
    description:
      "طقم متكامل يضم 4 أساور فخمة: سوار جنزير، سوار مسمار مرصع، بنجل كلاسيكي، وسوار زهرة البرسيم الصدفية.",
    createdAt: "2026-09-19",
  },
  {
    id: "acc-14",
    name: "أكمام معصم محتشمة فاخرة للعبايات",
    price: 1400,
    image: "/images/accessories/modest-wrist-cuffs.jpg",
    category: "accessories",
    stock: 35,
    href: "/accessories",
    description:
      "معاصم وأكمام قماشية أنيقة ومحتشمة لستر الذراعين تحت العبايات والفساتين بتصاميم كشكش وفيونكات وأزرار.",
    createdAt: "2026-09-19",
  },
  {
    id: "robe-1",
    name: "روب حجاب ملكي بتطريز زهور عاجية فاخرة",
    price: 7500,
    originalPrice: 8600,
    image: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
    category: "abayas",
    stock: 10,
    href: "/abayas",
    description: "روب حجاب راقٍ بلون عاجي ملكي مع نقوش زهور مائية وتطريز ناعم يناسب الاستقبال والمناسبات.",
    createdAt: "2026-09-19",
  },
  {
    id: "robe-2",
    name: "روب حجاب سهرة مخملي عنابي بتطريز فضي ملكي",
    price: 9800,
    originalPrice: 11500,
    image: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
    category: "abayas",
    stock: 6,
    href: "/abayas",
    description: "روب حجاب مخملي فاخر بلون عنابي دافئ مزين بتطريز خيوط فضية على الحواف والأكمام.",
    createdAt: "2026-09-19",
  },
  {
    id: "robe-3",
    name: "روب حجاب أسود مرصع بخطوط كريستالية متألقة",
    price: 9200,
    originalPrice: 10500,
    image: "/images/uploads/crystal_sparkle_black_abaya_1789830134113.jpg",
    category: "abayas",
    stock: 8,
    href: "/abayas",
    description: "روب حجاب أسود انسيابي فخم مرصع بالكامل بأحجار كريستالية متدلية تعزز أناقتك الملكية.",
    createdAt: "2026-09-19",
  },
  {
    id: "robe-4",
    name: "روب حجاب شتوي كاب شوكولاتة مع بروش ذهبي",
    price: 8900,
    originalPrice: 9900,
    image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    category: "abayas",
    stock: 7,
    href: "/abayas",
    description: "روب حجاب بتصميم كاب واسع ومريح بلون الشوكولاتة الداكنة مع بروش ذهبي فاخر.",
    createdAt: "2026-09-19",
  },
  {
    id: "robe-5",
    name: "روب حجاب صيفي من الكتان الأخضر الهادئ",
    price: 7100,
    originalPrice: 8200,
    image: "/images/uploads/sage_green_crystal_abaya_1789830162620.jpg",
    category: "abayas",
    stock: 12,
    href: "/abayas",
    description: "روب حجاب بتصميم عصري مريح بلون أخضر مريمي مع تفاصيل كريستالية على المعصمين.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-1",
    name: "عباءة سوداء بتطريز أزهار ربيعية وقياطين زيتية",
    price: 6800,
    originalPrice: 7800,
    image: "/images/abayas/black-floral-embroidered.jpg",
    category: "abayas",
    stock: 10,
    href: "/abayas",
    description:
      "عباءة سوداء فاخرة بقماش كريب كوري ملكي مزينة بقيطان زيتي ناعم وتطريز يدوي متقن لزهور وردية وبيضاء بأغصان مورقة على الصدر والأكمام الواسعة.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-2",
    name: "عباءة سهرة مخملية بلون عنابي ملكي وتطريز فضي",
    price: 9500,
    originalPrice: 11000,
    image: "/images/abayas/burgundy-silver-embroidery.jpg",
    category: "abayas",
    stock: 6,
    href: "/abayas",
    description:
      "عباءة سهرة ومناسبات فخمة بقماش مخمل عنابي راقٍ، تتميز بتطريز فضي لامع مستوحى من أوراق الغار الملكية على الأكمام والجوانب بحواف مقوسة بديعة.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-3",
    name: "عباءة سوداء كلاسيكية بأغصان خرزية ملونة",
    price: 7400,
    originalPrice: 8500,
    image: "/images/abayas/black-beaded-branch.jpg",
    category: "abayas",
    stock: 8,
    href: "/abayas",
    description:
      "عباءة مفتوحة بقماش ملكي انسيابي تزدان بأغصان خرز يدوي ملون متدلية من الكتف بنعومة ولمعان خافت على أكمام الجرس الواسعة.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-4",
    name: "عباءة سهرة سوداء ببريق الكريستال المتدفق",
    price: 8900,
    originalPrice: 10500,
    image: "/images/abayas/crystal-sparkle-black.jpg",
    category: "abayas",
    stock: 7,
    href: "/abayas",
    description:
      "عباءة سهرة ساحرة مرصعة بخطوط كريستالية متلألئة تمتد بقطرية وانسيابية من الكتف حتى أسفل الفستان، تمنحك حضوراً ملكياً في أرقى المناسبات.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-5",
    name: "عباءة عصرية بلون أخضر مريمي مع أساور كريستال",
    price: 7200,
    originalPrice: 8200,
    image: "/images/abayas/sage-green-crystal.jpg",
    category: "abayas",
    stock: 12,
    href: "/abayas",
    description:
      "عباءة كيمونو مفتوحة بلون أخضر ساجي هادئ بقماش صيفي مريح، تتألق بأساور عريضة مرصعة بصفائح أحجار الكريستال اللامعة على المعصمين.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-6",
    name: "عباءة بوردو فاخرة بأكمام دانتيل فرنسي وشراشيب لؤلؤ",
    price: 9200,
    originalPrice: 10800,
    image: "/images/abayas/burgundy-pearl-lace.jpg",
    category: "abayas",
    stock: 5,
    href: "/abayas",
    description:
      "تصميم استثنائي من دار آدري بلون عنابي دافئ يجمع بين الأناقة والترف، مع أكمام دانتيل زهري عاجي وشراشيب حبات اللؤلؤ المتدلية.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-7",
    name: "عباءة حريرية عاجية بنقوش زهور مائية فحمية",
    price: 6900,
    originalPrice: 7900,
    image: "/images/abayas/ivory-watercolor-floral.jpg",
    category: "abayas",
    stock: 11,
    href: "/abayas",
    description:
      "عباءة مفتوحة كلاسيكية بلون عاجي فخم مزينة بطبعات زهور مائية فنية سوداء رمادية مستوحاة من اللوحات الكلاسيكية، مناسبة للزيارات والمناسبات النهارية.",
    createdAt: "2026-09-19",
  },
  {
    id: "abaya-8",
    name: "طقم عباءة كاب شتوية بلون شوكولاتة داكنة مع بروش ذهبي",
    price: 8600,
    originalPrice: 9800,
    image: "/images/abayas/chocolate-brown-cape.jpg",
    category: "abayas",
    stock: 9,
    href: "/abayas",
    description:
      "طقم عباءة كاب فاخر بقصة أجنحة الفراشة الواسعة ولون بني شوكولاتة فخم مع فستان داخلي موكا وبروش ذهبي ملكي، إطلالة راقية تجمع بين الدفء والفخامة.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-1",
    name: "حجاب شيفون أسود ملكي مائي مع بندانة مدمجة",
    price: 1800,
    originalPrice: 2200,
    image: "/images/hijabs/black-silk-chiffon.jpg",
    category: "hijab-supplies",
    stock: 25,
    href: "/hijab-supplies",
    description:
      "حجاب شيفون حريري فاخر بلون أسود داكن بتموجات مائية خافتة، مزود ببندانة مدمجة ودبابيس جانبية راقية لتثبيت أنيق ومحتشم طوال اليوم.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-2",
    name: "أوشحة شيفون سهرة بحواف لؤلؤ فضي متدفق (3 ألوان)",
    price: 2400,
    originalPrice: 2800,
    image: "/images/hijabs/pearl-beaded-shawls.jpg",
    category: "hijab-supplies",
    stock: 18,
    href: "/hijab-supplies",
    description:
      "شالات شيفون فاخرة للمناسبات والسهرات متوفرة بألوان عاجي، كحلي داكن، وزيتي برونزي، تزدان بحواف مرصعة بخرزات لؤلؤ فضي لامع.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-3",
    name: "شال ميتاليك رمادي فحمي مرصع بحلقات ذهبية",
    price: 2600,
    originalPrice: 3100,
    image: "/images/hijabs/metallic-bead-grey.jpg",
    category: "hijab-supplies",
    stock: 15,
    href: "/hijab-supplies",
    description:
      "شال سهرة راقٍ بخامة كريب حرير ميتاليك رمادي فحمي لامع، يزدان بحلقات وأطواق خرزية ذهبية ناعمة على ثنية الرأس الأمامية.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-4",
    name: "حجاب جاهز كريب انسيابي بلون بيج نيود",
    price: 1900,
    originalPrice: 2300,
    image: "/images/hijabs/instant-beige-crepe.jpg",
    category: "hijab-supplies",
    stock: 30,
    href: "/hijab-supplies",
    description:
      "حجاب تركي عملي وسريع اللبس بقماش كريب كوري ناعم لا يتطلب دبابيس، ينسدل بطبقات انسيابية تغطي الرأس والرقبة بارتياح تام.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-5",
    name: "باليت شالات شيفون جورجيت الفاخرة (18 لوناً غنياً)",
    price: 1500,
    originalPrice: 1800,
    image: "/images/hijabs/rainbow-ladder-palette.jpg",
    category: "hijab-supplies",
    stock: 50,
    href: "/hijab-supplies",
    description:
      "مجموعة متكاملة من أجود خامات شيفون جورجيت الأصلي غير الشفاف، متوفرة بباقة ألوان ترابية وباستيل وملكية تناسب جميع إطلالاتك اليومية والمناسبات.",
    createdAt: "2026-09-19",
  },
  {
    id: "hijab-6",
    name: "حجاب جيرسي تركي مطاط بلون عنابي بوردو ملكي",
    price: 1700,
    originalPrice: 2000,
    image: "/images/hijabs/burgundy-jersey-instant.jpg",
    category: "hijab-supplies",
    stock: 22,
    href: "/hijab-supplies",
    description:
      "حجاب قطني جيرسي عالي الجودة والمرونة بخامة مودال تركية ناعمة وخفيفة، يثبت بسلاسة دون الحاجة لدبابيس بلون بوردو دافئ وجذاب.",
    createdAt: "2026-09-19",
  },
  {
    id: "isdal-2",
    name: "طقم إسدال سماوي باستيل مع خمار أبيض منسدل",
    price: 4800,
    originalPrice: 5600,
    image: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
    category: "isdalat",
    stock: 14,
    href: "/isdalat",
    description:
      "طقم إسدال راقٍ بلون أزرق سماوي باستيل هادئ مع خمار أبيض ناصع طويل ساتر ينسدل على الظهر والأكتاف برقة، قماش كريب ناعم وخفيف للصلاة والخروج.",
    createdAt: "2026-09-19",
  },
  {
    id: "isdal-3",
    name: "إسدال كاب أسود ملكي مع خمار رمادي طبقات متدرج",
    price: 5400,
    originalPrice: 6200,
    image: "/images/uploads/isdal_layered_grey_black_1789832059450.jpg",
    category: "isdalat",
    stock: 16,
    href: "/isdalat",
    description:
      "تصميم مميز يجمع بين فستان إسدال أسود ملكي واسع بقصة أجنحة الفراشة وخمار رمادي مدبب ثلاثي الطبقات متدرج الأطراف، إطلالة محتشمة وغاية في الأناقة.",
    createdAt: "2026-09-19",
  },
  {
    id: "isdal-4",
    name: "إسدال أزرق ملكي واسع مع خمار أبيض ثلاثي الطبقات",
    price: 5200,
    originalPrice: 5900,
    image: "/images/uploads/isdal_royal_blue_white_1789832073187.jpg",
    category: "isdalat",
    stock: 12,
    href: "/isdalat",
    description:
      "طقم صلاة وخروج مهيب بلون أزرق ملكي زاهٍ مع خمار شيفون كريب أبيض ناصع بثلاث طبقات متدرجة الزوايا، يوفر الراحة والستر التام.",
    createdAt: "2026-09-19",
  },
  {
    id: "isdal-5",
    name: "إسدال وجلباب شوكولاتة مع خمار أسود ساتر للمناسبات",
    price: 4900,
    originalPrice: 5700,
    image: "/images/uploads/modest_black_isdal_1789749094153.jpg",
    category: "isdalat",
    stock: 15,
    href: "/isdalat",
    description:
      "طقم جلباب وإسدال متكامل بخامة كريب ملكي بلون بني شوكولاتة دافئ بأكمام مزمومة مريحة، مع خمار أسود طويل منسدل ساتر للصدر والظهر.",
    createdAt: "2026-09-19",
  },
  {
    id: "isdal-6",
    name: "خمار وإسدال شيفون شوكولاتة متدرج بطبقات كشكش انسيابية",
    price: 4600,
    originalPrice: 5300,
    image: "/images/uploads/modest_clothing_sale_1789749140662.jpg",
    category: "isdalat",
    stock: 18,
    href: "/isdalat",
    description:
      "خمار وإسدال فريد بطبقات شيفون جورجيت متتالية بلون شوكولاتة عميق مع أطراف كشكش ناعمة تمنح حجماً وانسيابية ساحرة فوق الفساتين والعبايات.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-linen-grey",
    name: "فستان كتان رمادي فاتح مريح بقصة بوهيمية",
    price: 4600,
    originalPrice: 5200,
    image: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
    category: "dresses",
    stock: 14,
    href: "/dresses",
    description:
      "فستان كتان طبيعي فاخر بلون رمادي فاتح مريح، بياقة دائرية أنيقة وزمزمة ناعمة أسفل الصدر وأكمام بوف واسعة مع مطاط معصم مرن للإطلالات اليومية والعملية.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-floral-chiffon",
    name: "فستان شيفون صيفي عاجي مورد بزهور اللافندر",
    price: 4900,
    originalPrice: 5600,
    image: "/images/uploads/mauve_hijab_model_1789749104873.jpg",
    category: "dresses",
    stock: 16,
    href: "/dresses",
    description:
      "فستان صيفي رقيق ومحتشم بخامة شيفون حريري بارد مع بطانة ناعمة، منقوش بزهور بنفسجية لافندر أنثوية مع ياقة عالية وخصر مطاطي مريح وأكمام واسعة.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-vintage-green",
    name: "فستان فينتج زيتي بكسرات كلاسيكية وأكمام دانتيل",
    price: 5500,
    originalPrice: 6400,
    image: "/images/uploads/sage_green_crystal_abaya_1789830162620.jpg",
    category: "dresses",
    stock: 11,
    href: "/dresses",
    description:
      "تصميم كلاسيكي راقٍ بلون أخضر زيتي ملكي بياقة مرتفعة وكسرات بليسيه متوازية على الخصر، مع تفاصيل أكمام دانتيل فرنسي أبيض مفرغ مع فيونكة رقيقة.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-mauve-crepe",
    name: "فستان كريب كشمير ناعم برباط جانبي أنيق",
    price: 4700,
    originalPrice: 5300,
    image: "/images/uploads/black_embroidered_abaya_1789749117503.jpg",
    category: "dresses",
    stock: 18,
    href: "/dresses",
    description:
      "فستان كريب تركي انسيابي بلون وردي موف كشميري دافئ، يتميز برباطين جانبيين لضبط المقاس والخصر حسب الرغبة وأكمام واسعة أنيقة لراحة يومية محتشمة.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-chocolate-cape",
    name: "فستان سهرة كاب ملكي فاخر بلون شوكولاتة داكنة",
    price: 6800,
    originalPrice: 7800,
    image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    category: "dresses",
    stock: 9,
    href: "/dresses",
    description:
      "فستان سهرة مهيب بلون بني شوكولاتة غني، مزود بكاب ملكي ممتد على الظهر والأكتاف مع ثنيات وكسرات عمودية طويلة وحزام نحيف يبرز جمال التصميم المحتشم.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-blush-couture",
    name: "فستان سهرة وردي بودري مطرز بزهور ثلاثية الأبعاد",
    price: 7200,
    originalPrice: 8400,
    image: "/images/uploads/burgundy_pearl_lace_abaya_1789830171852.jpg",
    category: "dresses",
    stock: 8,
    href: "/dresses",
    description:
      "قطعة كوتور فاخرة للمناسبات الكبرى بلون وردي بودري ناعم، مرصع بتطريز زهور مجسمة وخرز ولؤلؤ على الخصر، مع أكمام جرس شيفون واسعة ووشاح كاب متدفق.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-burgundy-tiered",
    name: "فستان ماكسي عنابي بوردو واسع بطبقات كشكش انسيابية",
    price: 5100,
    originalPrice: 5900,
    image: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
    category: "dresses",
    stock: 15,
    href: "/dresses",
    description:
      "فستان ماكسي فضفاض محتشم بلون عنابي بوردو ملكي دافئ، بطبقات كشكش سفلية واسعة وأكمام بوف منسدلة وحزام خصر قماشي ناعم، رائع للنزهات والزيارات.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-lavender-vintage",
    name: "فستان لافندر فينتج بأكمام درامية ورباط كورسيه",
    price: 5800,
    originalPrice: 6600,
    image: "/images/uploads/crystal_sparkle_black_abaya_1789830134113.jpg",
    category: "dresses",
    stock: 10,
    href: "/dresses",
    description:
      "فستان استثنائي بلون بنفسجي لافندر فاتح مع تفاصيل رباط كورسيه جانبي كلاسيكي وشرائط منسدلة، بأكمام بوف درامية واسعة تمنح حضوراً سينمائياً ساحراً.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-white-cape-bridal",
    name: "فستان كاب سهرة وعرائس ملكي أبيض ناصع",
    price: 7900,
    originalPrice: 9200,
    image: "/images/uploads/black_embroidered_abaya_1789749117503.jpg",
    category: "dresses",
    stock: 7,
    href: "/dresses",
    description:
      "تصميم عرائسي ومناسبات مهيب بقماش كريب وحرير أبيض ناصع مع كاب ملكي ينسدل فوق الأكتاف والظهر وياقة عالية ساترة وأكمام بوف مزمومة بكشكش ناعم.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-lilac-evening-set",
    name: "طقم فستان سهرة ليلكي ملكي مع شال وكلتش لؤلؤ",
    price: 6900,
    originalPrice: 7900,
    image: "/images/uploads/mauve_hijab_model_1789749104873.jpg",
    category: "dresses",
    stock: 9,
    href: "/dresses",
    description:
      "إطلالة سهرة متكاملة راقية بفستان كريب استرتش ليلكي بخصر درابيه وأكمام كاب واسعة، منسق مع شال شيفون ليلكي متناغم وحقيبة كلتش لؤلؤية فاخرة.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-chocolate-bell-sleeve",
    name: "فستان كريب شوكولاتة مينيمال بأكمام مروحية واسعة",
    price: 4800,
    originalPrice: 5500,
    image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    category: "dresses",
    stock: 17,
    href: "/dresses",
    description:
      "فستان كريب أنيق وعملي بلون بني شوكولاتة سادة بقصة مينيمال مستقيمة، يتميز بأكمام مروحية واسعة وحزام خصر خلفي أنيق يضفي لمسة رقي وانسيابية عصرية.",
    createdAt: "2026-09-19",
  },
  {
    id: "dress-sage-tiered-set",
    name: "طقم فستان مريمي كاجوال بطبقات مع شال وحقيبة",
    price: 5300,
    originalPrice: 6100,
    image: "/images/uploads/sage_green_crystal_abaya_1789830162620.jpg",
    category: "dresses",
    stock: 13,
    href: "/dresses",
    description:
      "فستان أخضر مريمي / زيتي فاتح كاجوال بياقة عالية وأزرار صدر كلاسيكية وقصة طبقات كشكش واسعة، منسق بإتقان مع شال بيج نيود وحقيبة جلدية ناعمة.",
    createdAt: "2026-09-19",
  },
];

// Initial Algerian Orders Data
const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: "ord-101",
    orderNumber: "HS-9842",
    customerName: "أمينة بن ساسي",
    phone: "0661234589",
    wilaya: "16 - الجزائر العاصمة",
    commune: "المرادية",
    address: "حي 5 جويلية، عمارة 12، الطابق 2",
    items: [
      {
        productId: "product-1",
        name: "عباءة سوداء مطرزة",
        price: 4500,
        quantity: 1,
        image: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
      },
      {
        productId: "product-6",
        name: "حجاب شيفون أسود حريري",
        price: 1200,
        quantity: 1,
        image: "/images/uploads/hijab_black_silk_chiffon_1789831330976.jpg",
      },
    ],
    totalAmount: 5700,
    shippingCost: 500,
    grandTotal: 6200,
    status: "pending",
    createdAt: "منذ 15 دقيقة",
    notes: "يرجى الاتصال قبل التوصيل في الفترة المسائية",
  },
  {
    id: "ord-102",
    orderNumber: "HS-9841",
    customerName: "فاطمة الزهراء قادري",
    phone: "0770981234",
    wilaya: "31 - وهران",
    commune: "بئر الجير",
    address: "شارع العقيد لطفي، فيلا 44",
    items: [
      {
        productId: "product-2",
        name: "روب حجاب عاجي راقٍ",
        price: 3800,
        quantity: 1,
        image: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
      },
    ],
    totalAmount: 3800,
    shippingCost: 700,
    grandTotal: 4500,
    status: "processing",
    createdAt: "منذ ساعتين",
    notes: "المقاس: L",
  },
  {
    id: "ord-103",
    orderNumber: "HS-9839",
    customerName: "سمية بوزيد",
    phone: "0555432190",
    wilaya: "25 - قسنطينة",
    commune: "علي منجلي",
    address: "الوحدة الجوارية 08، عمارة C4",
    items: [
      {
        productId: "product-5",
        name: "إسدال صلاة سماوي وأبيض",
        price: 3000,
        quantity: 2,
        image: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
      },
      {
        productId: "product-3",
        name: "خمار شيفون ولؤلؤ فاخر",
        price: 2200,
        quantity: 1,
        image: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
      },
    ],
    totalAmount: 8200,
    shippingCost: 700,
    grandTotal: 8900,
    status: "shipped",
    createdAt: "أمس 14:30",
  },
  {
    id: "ord-104",
    orderNumber: "HS-9835",
    customerName: "خديجة العيداني",
    phone: "0672118844",
    wilaya: "09 - البليدة",
    commune: "أولاد يعيش",
    address: "حي النخيل، مقابل المسجد الكبير",
    items: [
      {
        productId: "product-8",
        name: "عباءة عنابي بتطريز فضي",
        price: 5200,
        quantity: 1,
        image: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
      },
    ],
    totalAmount: 5200,
    shippingCost: 600,
    grandTotal: 5800,
    status: "delivered",
    createdAt: "16 سبتمبر 2026",
  },
  {
    id: "ord-105",
    orderNumber: "HS-9830",
    customerName: "مريم بلمهدي",
    phone: "0799443322",
    wilaya: "19 - سطيف",
    commune: "العلمة",
    address: "شارع دبي التجاري",
    items: [
      {
        productId: "product-4",
        name: "كاب شوكولاتة فخم",
        price: 3400,
        quantity: 1,
        image: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
      },
    ],
    totalAmount: 3400,
    shippingCost: 700,
    grandTotal: 4100,
    status: "cancelled",
    createdAt: "15 سبتمبر 2026",
    notes: "ألغت الزبونة الطلب بسبب تغيير المقاس",
  },
];

// Initial Customer Conversations Data
const INITIAL_CONVERSATIONS: CustomerConversation[] = [
  {
    id: "conv-1",
    customerName: "أمينة بن ساسي",
    customerPhone: "0661234589",
    wilaya: "الجزائر العاصمة",
    lastMessage: "السلام عليكم، هل يمكن شحن طلبي اليوم مساءً؟",
    lastMessageTime: "10:45 ص",
    unreadCount: 1,
    messages: [
      {
        id: "m-1",
        conversationId: "conv-1",
        sender: "customer",
        text: "السلام عليكم ورحمة الله، لقد قمت بطلب العباءة السوداء المطرزة والحجاب الشيفون.",
        timestamp: "10:40 ص",
        isRead: true,
      },
      {
        id: "m-2",
        conversationId: "conv-1",
        sender: "admin",
        text: "وعليكم السلام ورحمة الله وبركاته يا أمينة! أهلاً بكِ في حجاب سول. تم استقبال طلبكِ رقم #HS-9842 بنجاح.",
        timestamp: "10:42 ص",
        isRead: true,
      },
      {
        id: "m-3",
        conversationId: "conv-1",
        sender: "customer",
        text: "السلام عليكم، هل يمكن شحن طلبي اليوم مساءً؟",
        timestamp: "10:45 ص",
        isRead: false,
      },
    ],
  },
  {
    id: "conv-2",
    customerName: "فاطمة الزهراء قادري",
    customerPhone: "0770981234",
    wilaya: "وهران",
    lastMessage: "شكراً جزيلاً، جودة القماش ممتازة جداً ما شاء الله",
    lastMessageTime: "أمس 18:20",
    unreadCount: 0,
    messages: [
      {
        id: "m-201",
        conversationId: "conv-2",
        sender: "customer",
        text: "مساء الخير، هل فستان التفاصيل الأنيقة متوفر بمقاس XL؟",
        timestamp: "أمس 16:15",
        isRead: true,
      },
      {
        id: "m-202",
        conversationId: "conv-2",
        sender: "admin",
        text: "أهلاً بكِ فاطمة، نعم متوفر وجاهز للشحن الفوري إلى وهران.",
        timestamp: "أمس 16:30",
        isRead: true,
      },
      {
        id: "m-203",
        conversationId: "conv-2",
        sender: "customer",
        text: "شكراً جزيلاً، جودة القماش ممتازة جداً ما شاء الله",
        timestamp: "أمس 18:20",
        isRead: true,
      },
    ],
  },
  {
    id: "conv-3",
    customerName: "نورهان الشريف",
    customerPhone: "0550112233",
    wilaya: "عنابة",
    lastMessage: "كم يستغرق التوصيل إلى ولاية عنابة؟",
    lastMessageTime: "أمس 12:00",
    unreadCount: 0,
    messages: [
      {
        id: "m-301",
        conversationId: "conv-3",
        sender: "customer",
        text: "مرحباً، أود الاستفسار عن مدة التوصيل وأسعار الخمارات المتوفرة.",
        timestamp: "أمس 11:50",
        isRead: true,
      },
      {
        id: "m-302",
        conversationId: "conv-3",
        sender: "customer",
        text: "كم يستغرق التوصيل إلى ولاية عنابة؟",
        timestamp: "أمس 12:00",
        isRead: true,
      },
    ],
  },
];

const CURRENT_DATA_VERSION = "v15";
const PRODUCTS_KEY = `hijab_soul_products_${CURRENT_DATA_VERSION}`;
const ORDERS_KEY = `hijab_soul_orders_${CURRENT_DATA_VERSION}`;
const CONVERSATIONS_KEY = `hijab_soul_conversations_${CURRENT_DATA_VERSION}`;
const CATEGORIES_KEY = `hijab_soul_categories_${CURRENT_DATA_VERSION}`;
const HERO_BANNER_KEY = `hijab_soul_hero_banner_${CURRENT_DATA_VERSION}`;

export const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  abayas: "/images/categories/abayas.jpg",
  dresses: "/images/categories/dresses.jpg",
  isdalat: "/images/categories/isdalat.jpg",
  "hijab-supplies": "/images/categories/hijabs.jpg",
  hijabs: "/images/categories/hijabs.jpg",
  accessories: "/images/categories/accessories.jpg",
  khimar: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
  sales: "/images/categories/sale.jpg",
  shoes: "/images/uploads/akiki_cream_handbag_1789829330238.jpg",
};

export function getProductFallbackImage(category?: string): string {
  if (!category) return "/images/categories/abayas.jpg";
  const normalized = category === "hijab-robe" ? "abayas" : category;
  return DEFAULT_CATEGORY_IMAGES[normalized] || "/images/categories/abayas.jpg";
}

function cleanupLegacyStorage() {
  if (typeof window === "undefined") return;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        key.startsWith("hijab_soul_") &&
        !key.endsWith(`_${CURRENT_DATA_VERSION}`)
      ) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Ignore storage errors in restricted iframe environments
  }
}

export const INITIAL_CATEGORIES: StoreCategory[] = [
  {
    id: "dresses",
    name: "فساتين",
    href: "/dresses",
    image: "/images/categories/dresses.jpg",
    bannerImage: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
    alt: "فساتين محتشمة وأنيقة - حجاب سول",
    description: "فساتين محتشمة وأنيقة بقصات راقية وأقمشة فاخرة تناسب كل المناسبات",
    order: 0,
    isActive: true,
  },
  {
    id: "isdalat",
    name: "اسدالات",
    href: "/isdalat",
    image: "/images/categories/isdalat.jpg",
    bannerImage: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
    alt: "إسدالات صلاة وخروج راقية - حجاب سول",
    description: "إسدالات صلاة وخروج ساترة ومريحة بخامات قطنية نقية وتصاميم عملية",
    order: 2,
    isActive: true,
  },
  {
    id: "hijab-supplies",
    name: "حجابات",
    href: "/hijab-supplies",
    image: "/images/categories/hijabs.jpg",
    bannerImage: "/images/hijabs/black-silk-chiffon.jpg",
    alt: "حجابات وخمارات بأقمشة ناعمة فاخرة - حجاب سول",
    description: "شالات وحجابات شيفون وكريب قطني بألوان ساحرة تناسب إطلالتك اليومية",
    order: 3,
    isActive: true,
  },
  {
    id: "abayas",
    name: "عبايات",
    href: "/abayas",
    image: "/images/categories/abayas.jpg",
    bannerImage: "/images/abayas/black-floral-embroidered.jpg",
    alt: "عبايات عصرية بتطريز راقٍ - حجاب سول",
    description: "عبايات خليجية سوداء وملونة بتطريزات يدوية راقية وكريستال فاخر",
    order: 4,
    isActive: true,
  },
  {
    id: "accessories",
    name: "اكسسوارات",
    href: "/accessories",
    image: "/images/categories/accessories.jpg",
    bannerImage: "/images/accessories/akiki-cream-bag.jpg",
    alt: "إكسسوارات وبروشات الحجاب الأنيقة - حجاب سول",
    description: "حقائب راقية، مجوهرات مطلية، مشابك شعر، وأطواق لتكتمل أناقتك",
    order: 5,
    isActive: true,
  },
  {
    id: "sales",
    name: "تخفيضات",
    href: "/sales",
    image: "/images/categories/sale.jpg",
    bannerImage: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
    alt: "عروض وتخفيضات حصرية على الأزياء المحتشمة - حجاب سول",
    description: "عروض وتخفيضات موسمية استثنائية على تشكيلات حجاب سول المختارة",
    order: 6,
    isActive: true,
  },
  {
    id: "khimar",
    name: "خمارات",
    href: "/khimar",
    image: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
    bannerImage: "/images/hijabs/pearl-beaded-shawls.jpg",
    alt: "خمارات شرعية سابغة - حجاب سول",
    description: "خمارات فرنسية وتركية سابغة خفيفة الوزن وسهلة الارتداء",
    order: 7,
    isActive: true,
  },
  {
    id: "shoes",
    name: "أحذية",
    href: "/shoes",
    image: "/images/uploads/akiki_cream_handbag_1789829330238.jpg",
    bannerImage: "/images/accessories/lady-white-bag.jpg",
    alt: "أحذية وأطقم شرعية مريحة - حجاب سول",
    description: "أحذية نسائية طبية ومريحة تتناسق مع الإطلالة المحتشمة",
    order: 8,
    isActive: true,
  },
];

export interface ImagePreset {
  id: string;
  name: string;
  category: string;
  url: string;
}

export const CURATED_IMAGE_PRESETS: ImagePreset[] = [
  // Categories & Core
  {
    id: "p-cat-1",
    name: "فساتين - صورة القسم الأساسية",
    category: "dresses",
    url: "/images/categories/dresses.jpg",
  },
  {
    id: "p-cat-2",
    name: "إسدالات - صورة القسم الأساسية",
    category: "isdalat",
    url: "/images/categories/isdalat.jpg",
  },
  {
    id: "p-cat-3",
    name: "حجابات - صورة القسم الأساسية",
    category: "hijabs",
    url: "/images/categories/hijabs.jpg",
  },
  {
    id: "p-cat-4",
    name: "عبايات - صورة القسم الأساسية",
    category: "abayas",
    url: "/images/categories/abayas.jpg",
  },
  {
    id: "p-cat-5",
    name: "إكسسوارات - صورة القسم الأساسية",
    category: "accessories",
    url: "/images/categories/accessories.jpg",
  },
  {
    id: "p-cat-6",
    name: "تخفيضات - صورة القسم الأساسية",
    category: "sales",
    url: "/images/categories/sale.jpg",
  },

  // Dresses
  {
    id: "p-dr-1",
    name: "فستان كتان رمادي راقٍ",
    category: "dresses",
    url: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
  },
  {
    id: "p-dr-2",
    name: "فستان شيفون مورد",
    category: "dresses",
    url: "/images/uploads/mauve_hijab_model_1789749104873.jpg",
  },
  {
    id: "p-dr-3",
    name: "فستان فينتج زيتي",
    category: "dresses",
    url: "/images/uploads/sage_green_crystal_abaya_1789830162620.jpg",
  },
  {
    id: "p-dr-4",
    name: "فستان كريب موف ناعم",
    category: "dresses",
    url: "/images/uploads/black_embroidered_abaya_1789749117503.jpg",
  },
  {
    id: "p-dr-5",
    name: "كاب شوكولاتة كلاسيكي",
    category: "dresses",
    url: "/images/uploads/chocolate_brown_cape_abaya_1789830195176.jpg",
  },
  {
    id: "p-dr-6",
    name: "فستان كوتور وردي بلش",
    category: "dresses",
    url: "/images/uploads/burgundy_pearl_lace_abaya_1789830171852.jpg",
  },
  {
    id: "p-dr-7",
    name: "فستان طبقات عنابي",
    category: "dresses",
    url: "/images/uploads/burgundy_silver_embroidery_abaya_1789830112029.jpg",
  },
  {
    id: "p-dr-8",
    name: "فستان لافندر فينتج",
    category: "dresses",
    url: "/images/uploads/crystal_sparkle_black_abaya_1789830134113.jpg",
  },
  {
    id: "p-dr-9",
    name: "كاب أبيض عرائسي",
    category: "dresses",
    url: "/images/uploads/lady_white_handbag_1789829346343.jpg",
  },
  {
    id: "p-dr-10",
    name: "طقم سهرة ليلكي",
    category: "dresses",
    url: "/images/uploads/embroidered_evening_bag_1789829357737.jpg",
  },

  // Abayas
  {
    id: "p-ab-1",
    name: "عباءة سوداء بتطريز ورود",
    category: "abayas",
    url: "/images/abayas/black-floral-embroidered.jpg",
  },
  {
    id: "p-ab-2",
    name: "عباءة عنابي بتطريز فضي",
    category: "abayas",
    url: "/images/abayas/burgundy-silver-embroidery.jpg",
  },
  {
    id: "p-ab-3",
    name: "عباءة خرز أسود راقية",
    category: "abayas",
    url: "/images/abayas/black-beaded-branch.jpg",
  },
  {
    id: "p-ab-4",
    name: "عباءة كريستال سوداء",
    category: "abayas",
    url: "/images/abayas/crystal-sparkle-black.jpg",
  },
  {
    id: "p-ab-5",
    name: "عباءة زيتي بكريستال",
    category: "abayas",
    url: "/images/abayas/sage-green-crystal.jpg",
  },
  {
    id: "p-ab-6",
    name: "عباءة دانتيل لؤلؤي",
    category: "abayas",
    url: "/images/abayas/burgundy-pearl-lace.jpg",
  },
  {
    id: "p-ab-7",
    name: "عباءة عاجية مائية",
    category: "abayas",
    url: "/images/abayas/ivory-watercolor-floral.jpg",
  },
  {
    id: "p-ab-8",
    name: "كاب عباءة بني شوكولاتة",
    category: "abayas",
    url: "/images/abayas/chocolate-brown-cape.jpg",
  },

  // Hijabs & Khimar
  {
    id: "p-hj-1",
    name: "شال شيفون حرير أسود",
    category: "hijabs",
    url: "/images/hijabs/black-silk-chiffon.jpg",
  },
  {
    id: "p-hj-2",
    name: "شال مرصع باللؤلؤ",
    category: "hijabs",
    url: "/images/hijabs/pearl-beaded-shawls.jpg",
  },
  {
    id: "p-hj-3",
    name: "شال رمادي ميتاليك",
    category: "hijabs",
    url: "/images/hijabs/metallic-bead-grey.jpg",
  },
  {
    id: "p-hj-4",
    name: "حجاب جاهز بيج كريب",
    category: "hijabs",
    url: "/images/hijabs/instant-beige-crepe.jpg",
  },
  {
    id: "p-hj-5",
    name: "باليت ألوان الحجابات",
    category: "hijabs",
    url: "/images/hijabs/rainbow-ladder-palette.jpg",
  },
  {
    id: "p-hj-6",
    name: "حجاب جيرسي عنابي سريع",
    category: "hijabs",
    url: "/images/hijabs/burgundy-jersey-instant.jpg",
  },

  // Isdalat
  {
    id: "p-is-1",
    name: "إسدال أزرق سماوي وأبيض",
    category: "isdalat",
    url: "/images/uploads/isdal_pastel_blue_white_1789832048044.jpg",
  },
  {
    id: "p-is-2",
    name: "إسدال طبقات رمادي وأسود",
    category: "isdalat",
    url: "/images/uploads/isdal_layered_grey_black_1789832059450.jpg",
  },
  {
    id: "p-is-3",
    name: "إسدال ملكي أزرق وأبيض",
    category: "isdalat",
    url: "/images/uploads/isdal_royal_blue_white_1789832073187.jpg",
  },
  {
    id: "p-is-4",
    name: "إسدال شوكولاتة وأسود",
    category: "isdalat",
    url: "/images/uploads/modest_black_isdal_1789749094153.jpg",
  },
  {
    id: "p-is-5",
    name: "إسدال متدرج كشكش شوكولاتة",
    category: "isdalat",
    url: "/images/uploads/modest_clothing_sale_1789749140662.jpg",
  },

  // Accessories
  {
    id: "p-ac-1",
    name: "حقيبة كريمي فاخرة Akiki",
    category: "accessories",
    url: "/images/accessories/akiki-cream-bag.jpg",
  },
  {
    id: "p-ac-2",
    name: "حقيبة بيضاء كلاسيكية Lady",
    category: "accessories",
    url: "/images/accessories/lady-white-bag.jpg",
  },
  {
    id: "p-ac-3",
    name: "حقيبة سهرة مطرزة",
    category: "accessories",
    url: "/images/accessories/embroidered-evening-bag.jpg",
  },
  {
    id: "p-ac-4",
    name: "حقيبة كروس خضراء زيتي",
    category: "accessories",
    url: "/images/accessories/sage-green-crossbody.jpg",
  },
  {
    id: "p-ac-5",
    name: "طوق شعر لؤلؤي أغصان",
    category: "accessories",
    url: "/images/accessories/pearl-branch-headband.jpg",
  },
  {
    id: "p-ac-6",
    name: "مشبك فراشة للشعر",
    category: "accessories",
    url: "/images/accessories/butterfly-hair-claw.jpg",
  },
  {
    id: "p-ac-7",
    name: "سوار أساور ذهبية مكدسة",
    category: "accessories",
    url: "/images/accessories/luxury-bangle-stack.jpg",
  },
  {
    id: "p-ac-8",
    name: "أكمام ومعاصم حجاب محتشمة",
    category: "accessories",
    url: "/images/accessories/modest-wrist-cuffs.jpg",
  },
];

/**
 * Utility to compress and convert an uploaded file into a high quality data URL
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getStoredCategories(): StoreCategory[] {
  if (typeof window === "undefined") return INITIAL_CATEGORIES;
  try {
    cleanupLegacyStorage();
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    const parsed: StoreCategory[] = JSON.parse(raw);
    const initialMap = new Map(INITIAL_CATEGORIES.map((c) => [c.id, c]));
    
    // Filter out obsolete categories like "hijab-robe"
    const validParsed = parsed.filter((c) => c.id !== "hijab-robe");

    // Synchronize initial categories with verified assets
    const synchronized: StoreCategory[] = validParsed.map((cat) => {
      const initCat = initialMap.get(cat.id);
      if (initCat) {
        return {
          ...cat,
          name: initCat.name,
          href: initCat.href,
          image: initCat.image,
          bannerImage: initCat.bannerImage || cat.bannerImage,
          alt: initCat.alt,
          description: initCat.description || cat.description,
        };
      }
      return cat;
    });

    // Add any new initial categories not yet present
    const existingIds = new Set(synchronized.map((c) => c.id));
    for (const initCat of INITIAL_CATEGORIES) {
      if (!existingIds.has(initCat.id)) {
        synchronized.push(initCat);
      }
    }

    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(synchronized));
    return synchronized.sort((a, b) => a.order - b.order);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: StoreCategory[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  window.dispatchEvent(new Event("hijab_categories_updated"));
}

export function getStoredHeroBanner(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(HERO_BANNER_KEY);
  } catch {
    return null;
  }
}

export function saveStoredHeroBanner(url: string | null) {
  if (typeof window === "undefined") return;
  if (url) {
    localStorage.setItem(HERO_BANNER_KEY, url);
  } else {
    localStorage.removeItem(HERO_BANNER_KEY);
  }
  window.dispatchEvent(new Event("hijab_hero_banner_updated"));
}

export function getStoredProducts(): AdminProduct[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    cleanupLegacyStorage();
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed: AdminProduct[] = JSON.parse(raw);
    const initialMap = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));

    // Synchronize and heal products
    const synchronized: AdminProduct[] = parsed.map((prod) => {
      const initProd = initialMap.get(prod.id);
      if (initProd) {
        // Built-in catalog item: guarantee latest verified image and category
        return {
          ...initProd,
          stock: typeof prod.stock === "number" ? prod.stock : initProd.stock,
          isFeatured: typeof prod.isFeatured === "boolean" ? prod.isFeatured : initProd.isFeatured,
          price: typeof prod.price === "number" && prod.price > 0 ? prod.price : initProd.price,
        };
      }
      // Custom user product: validate image and normalize category
      const normalizedCat = prod.category === "hijab-robe" ? "abayas" : prod.category;
      const validImage = prod.image && prod.image.trim() !== "" 
        ? prod.image 
        : getProductFallbackImage(normalizedCat);
      return {
        ...prod,
        category: normalizedCat,
        href: normalizedCat ? `/${normalizedCat}` : "/abayas",
        image: validImage,
      };
    });

    // Add any initial products that might be missing
    const existingIds = new Set(synchronized.map((p) => p.id));
    for (const initProd of INITIAL_PRODUCTS) {
      if (!existingIds.has(initProd.id)) {
        synchronized.push(initProd);
      }
    }

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(synchronized));
    return synchronized;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: AdminProduct[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("hijab_products_updated"));
}

export function getStoredOrders(): CustomerOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: CustomerOrder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("hijab_orders_updated"));
}

export function getStoredConversations(): CustomerConversation[] {
  if (typeof window === "undefined") return INITIAL_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    if (!raw) {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
      return INITIAL_CONVERSATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CONVERSATIONS;
  }
}

export function saveStoredConversations(conversations: CustomerConversation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  window.dispatchEvent(new Event("hijab_conversations_updated"));
}

export function useStoreData() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [conversations, setConversations] = useState<CustomerConversation[]>(INITIAL_CONVERSATIONS);
  const [categories, setCategories] = useState<StoreCategory[]>(INITIAL_CATEGORIES);
  const [heroBanner, setHeroBanner] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setConversations(getStoredConversations());
    setCategories(getStoredCategories());
    setHeroBanner(getStoredHeroBanner());

    const updateProducts = () => setProducts(getStoredProducts());
    const updateOrders = () => setOrders(getStoredOrders());
    const updateConvs = () => setConversations(getStoredConversations());
    const updateCats = () => setCategories(getStoredCategories());
    const updateHero = () => setHeroBanner(getStoredHeroBanner());

    window.addEventListener("hijab_products_updated", updateProducts);
    window.addEventListener("hijab_orders_updated", updateOrders);
    window.addEventListener("hijab_conversations_updated", updateConvs);
    window.addEventListener("hijab_categories_updated", updateCats);
    window.addEventListener("hijab_hero_banner_updated", updateHero);

    return () => {
      window.removeEventListener("hijab_products_updated", updateProducts);
      window.removeEventListener("hijab_orders_updated", updateOrders);
      window.removeEventListener("hijab_conversations_updated", updateConvs);
      window.removeEventListener("hijab_categories_updated", updateCats);
      window.removeEventListener("hijab_hero_banner_updated", updateHero);
    };
  }, []);

  // Category CRUD
  const updateCategory = useCallback((id: string, updates: Partial<StoreCategory>) => {
    setCategories((prev) => {
      const next = prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat));
      saveStoredCategories(next);
      return next;
    });
  }, []);

  const addCategory = useCallback((newCat: Omit<StoreCategory, "id"> & { id?: string }) => {
    const id = newCat.id || `cat-${Date.now()}`;
    const item: StoreCategory = {
      ...newCat,
      id,
      order: newCat.order ?? 99,
      isActive: newCat.isActive ?? true,
      alt: newCat.alt || `${newCat.name} - حجاب سول`,
    };
    setCategories((prev) => {
      const next = [...prev, item].sort((a, b) => a.order - b.order);
      saveStoredCategories(next);
      return next;
    });
    return item;
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveStoredCategories(next);
      return next;
    });
  }, []);

  const resetCategoriesToDefault = useCallback(() => {
    setCategories(INITIAL_CATEGORIES);
    saveStoredCategories(INITIAL_CATEGORIES);
  }, []);

  const updateHeroBanner = useCallback((url: string | null) => {
    setHeroBanner(url);
    saveStoredHeroBanner(url);
  }, []);

  // Product CRUD
  const updateProduct = useCallback((updated: AdminProduct) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      saveStoredProducts(next);
      return next;
    });
  }, []);

  const addProduct = useCallback((newProd: Omit<AdminProduct, "id" | "createdAt">) => {
    const item: AdminProduct = {
      ...newProd,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0]!,
    };
    setProducts((prev) => {
      const next = [item, ...prev];
      saveStoredProducts(next);
      return next;
    });
    return item;
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveStoredProducts(next);
      return next;
    });
  }, []);

  // Order CRUD
  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const next = prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
      saveStoredOrders(next);
      return next;
    });
  }, []);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders((prev) => {
      const next = prev.filter((ord) => ord.id !== orderId);
      saveStoredOrders(next);
      return next;
    });
  }, []);

  const addOrder = useCallback((newOrder: CustomerOrder) => {
    setOrders((prev) => {
      const next = [newOrder, ...prev];
      saveStoredOrders(next);
      return next;
    });
    return newOrder;
  }, []);

  // Chat Actions
  const sendMessage = useCallback(
    (conversationId: string, text: string, sender: "admin" | "customer" = "admin") => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId,
        sender,
        text,
        timestamp: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }),
        isRead: sender === "admin",
      };

      setConversations((prev) => {
        const next = prev.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: text,
              lastMessageTime: newMessage.timestamp,
              messages: [...c.messages, newMessage],
            };
          }
          return c;
        });
        saveStoredConversations(next);
        return next;
      });

      // If admin sent message, simulate customer reading it or responding if test
      return newMessage;
    },
    [],
  );

  const markConversationAsRead = useCallback((conversationId: string) => {
    setConversations((prev) => {
      const next = prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            unreadCount: 0,
            messages: c.messages.map((m) => ({ ...m, isRead: true })),
          };
        }
        return c;
      });
      saveStoredConversations(next);
      return next;
    });
  }, []);

  return {
    products,
    orders,
    conversations,
    categories,
    heroBanner,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    deleteOrder,
    addOrder,
    sendMessage,
    markConversationAsRead,
    updateCategory,
    addCategory,
    deleteCategory,
    resetCategoriesToDefault,
    updateHeroBanner,
  };
}
