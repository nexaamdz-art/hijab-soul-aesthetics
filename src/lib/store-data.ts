import { useState, useEffect, useCallback } from "react";

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category:
    "abayas" | "dresses" | "khimar" | "isdalat" | "accessories" | "hijab-supplies" | "sales";
  stock: number;
  href: string;
  description?: string;
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
  notes?: string;
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
    image: "/images/products/product-1.jpg",
    category: "abayas",
    stock: 14,
    href: "/abayas",
    description: "عباءة بتصميم خليجي فاخر وقماش كريب ناعم مع تطريز يدوي على الأكمام.",
    createdAt: "2026-09-10",
  },
  {
    id: "product-2",
    name: "فستان بتفاصيل أنيقة",
    price: 3800,
    originalPrice: 4200,
    image: "/images/products/product-2.jpg",
    category: "dresses",
    stock: 8,
    href: "/dresses",
    description: "فستان محتشم بقصة راقية ولون رملي هادئ مناسب للمناسبات اليومية والزيارات.",
    createdAt: "2026-09-12",
  },
  {
    id: "product-3",
    name: "خمار صيفي خفيف",
    price: 2200,
    image: "/images/products/product-3.jpg",
    category: "khimar",
    stock: 25,
    href: "/khimar",
    description: "خمار تركي مصنوع من أجود أنواع الشيفون والحرير البارد لراحة تدوم طوال اليوم.",
    createdAt: "2026-09-14",
  },
  {
    id: "product-4",
    name: "فستان سادة بأكمام واسعة",
    price: 3400,
    originalPrice: 3900,
    image: "/images/products/product-4.jpg",
    category: "dresses",
    stock: 12,
    href: "/dresses",
    description: "فستان طويل عملي بقماش ناعم لا يتجعد مناسب لجميع فصول السنة.",
    createdAt: "2026-09-15",
  },
  {
    id: "product-5",
    name: "إسدال يومي عملي",
    price: 3000,
    image: "/images/products/product-5.jpg",
    category: "isdalat",
    stock: 19,
    href: "/isdalat",
    description: "إسدال صلاة وخروج مريح جداً بخامة قطنية ناعمة وساترة ومزود بسحاب مخفي.",
    createdAt: "2026-09-16",
  },
  {
    id: "product-6",
    name: "حجاب شيفون فاخر",
    price: 1200,
    image: "/images/products/product-6.jpg",
    category: "hijab-supplies",
    stock: 40,
    href: "/hijab-supplies",
    description: "حجاب شيفون كريب ممتاز غير شفاف ومثالي للتثبيت السريع.",
    createdAt: "2026-09-16",
  },
  {
    id: "product-7",
    name: "طقم إكسسوارات",
    price: 1500,
    image: "/images/products/product-7.jpg",
    category: "accessories",
    stock: 15,
    href: "/accessories",
    description: "طقم دبابيس ومشابك حجاب أنيقة مطلية بالذهب ومقاومة للصدأ.",
    createdAt: "2026-09-17",
  },
  {
    id: "product-8",
    name: "عباءة بتطريز ذهبي",
    price: 5200,
    originalPrice: 6000,
    image: "/images/products/product-8.jpg",
    category: "abayas",
    stock: 6,
    href: "/abayas",
    description: "عباءة سهرة فاخرة بتطريز خيوط حريرية ذهبية وقصة ملكية فخمة.",
    createdAt: "2026-09-18",
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
        image: "/images/products/product-1.jpg",
      },
      {
        productId: "product-6",
        name: "حجاب شيفون فاخر",
        price: 1200,
        quantity: 1,
        image: "/images/products/product-6.jpg",
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
        name: "فستان بتفاصيل أنيقة",
        price: 3800,
        quantity: 1,
        image: "/images/products/product-2.jpg",
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
        name: "إسدال يومي عملي",
        price: 3000,
        quantity: 2,
        image: "/images/products/product-5.jpg",
      },
      {
        productId: "product-3",
        name: "خمار صيفي خفيف",
        price: 2200,
        quantity: 1,
        image: "/images/products/product-3.jpg",
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
        name: "عباءة بتطريز ذهبي",
        price: 5200,
        quantity: 1,
        image: "/images/products/product-8.jpg",
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
        name: "فستان سادة بأكمام واسعة",
        price: 3400,
        quantity: 1,
        image: "/images/products/product-4.jpg",
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

const PRODUCTS_KEY = "hijab_soul_products_v1";
const ORDERS_KEY = "hijab_soul_orders_v1";
const CONVERSATIONS_KEY = "hijab_soul_conversations_v1";

export function getStoredProducts(): AdminProduct[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
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
  const [products, setProducts] = useState<AdminProduct[]>(() => getStoredProducts());
  const [orders, setOrders] = useState<CustomerOrder[]>(() => getStoredOrders());
  const [conversations, setConversations] = useState<CustomerConversation[]>(() =>
    getStoredConversations(),
  );

  useEffect(() => {
    const updateProducts = () => setProducts(getStoredProducts());
    const updateOrders = () => setOrders(getStoredOrders());
    const updateConvs = () => setConversations(getStoredConversations());

    window.addEventListener("hijab_products_updated", updateProducts);
    window.addEventListener("hijab_orders_updated", updateOrders);
    window.addEventListener("hijab_conversations_updated", updateConvs);

    return () => {
      window.removeEventListener("hijab_products_updated", updateProducts);
      window.removeEventListener("hijab_orders_updated", updateOrders);
      window.removeEventListener("hijab_conversations_updated", updateConvs);
    };
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
      createdAt: new Date().toISOString().split("T")[0],
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
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    deleteOrder,
    sendMessage,
    markConversationAsRead,
  };
}
