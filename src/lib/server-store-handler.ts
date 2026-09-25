import fs from "node:fs";
import path from "node:path";
import {
  type AdminProduct,
  type StoreCategory,
  type CustomerOrder,
  type CustomerConversation,
  type ChatMessage,
  type OrderStatus,
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_CONVERSATIONS,
} from "./store-data";

const DATA_DIR = path.resolve(process.cwd(), ".data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const CONVERSATIONS_FILE = path.join(DATA_DIR, "conversations.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const UPLOAD_DIR = path.resolve(process.cwd(), "public/images/uploads");

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------- PRODUCTS ----------------

export function readStoredProducts(initialDefaults?: AdminProduct[]): AdminProduct[] {
  ensureDirectoryExists(DATA_DIR);
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const seed = initialDefaults || INITIAL_PRODUCTS;
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err) {
    console.error("Failed to read products file:", err);
    return [];
  }
}

export function writeStoredProducts(products: AdminProduct[]): void {
  ensureDirectoryExists(DATA_DIR);
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write products file:", err);
  }
}

// ---------------- CATEGORIES ----------------

export function readStoredCategories(initialDefaults?: StoreCategory[]): StoreCategory[] {
  ensureDirectoryExists(DATA_DIR);
  if (!fs.existsSync(CATEGORIES_FILE)) {
    const seed = initialDefaults || INITIAL_CATEGORIES;
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    const raw = fs.readFileSync(CATEGORIES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err) {
    console.error("Failed to read categories file:", err);
    return [];
  }
}

export function writeStoredCategories(categories: StoreCategory[]): void {
  ensureDirectoryExists(DATA_DIR);
  try {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write categories file:", err);
  }
}

// ---------------- ORDERS ----------------

export function readStoredOrders(initialDefaults?: CustomerOrder[]): CustomerOrder[] {
  ensureDirectoryExists(DATA_DIR);
  if (!fs.existsSync(ORDERS_FILE)) {
    const seed = initialDefaults || INITIAL_ORDERS;
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err) {
    console.error("Failed to read orders file:", err);
    return [];
  }
}

export function writeStoredOrders(orders: CustomerOrder[]): void {
  ensureDirectoryExists(DATA_DIR);
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write orders file:", err);
  }
}

// ---------------- CONVERSATIONS ----------------

export function readStoredConversations(
  initialDefaults?: CustomerConversation[],
): CustomerConversation[] {
  ensureDirectoryExists(DATA_DIR);
  if (!fs.existsSync(CONVERSATIONS_FILE)) {
    const seed = initialDefaults || INITIAL_CONVERSATIONS;
    fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    const raw = fs.readFileSync(CONVERSATIONS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err) {
    console.error("Failed to read conversations file:", err);
    return [];
  }
}

export function writeStoredConversations(conversations: CustomerConversation[]): void {
  ensureDirectoryExists(DATA_DIR);
  try {
    fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write conversations file:", err);
  }
}

// ---------------- SETTINGS ----------------

export interface StoreSettings {
  heroBanner: string | null;
  storeName: string;
}

export function readStoredSettings(): StoreSettings {
  ensureDirectoryExists(DATA_DIR);
  const defaultSettings: StoreSettings = { heroBanner: null, storeName: "حجاب سول" };
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), "utf8");
    return defaultSettings;
  }
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, "utf8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Failed to read settings file:", err);
    return defaultSettings;
  }
}

export function writeStoredSettings(settings: StoreSettings): void {
  ensureDirectoryExists(DATA_DIR);
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write settings file:", err);
  }
}

// ---------------- IMAGE UPLOAD HANDLER ----------------

export function saveUploadedBase64Image(dataUrl: string): string | null {
  try {
    ensureDirectoryExists(UPLOAD_DIR);
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || !matches[1] || !matches[2]) {
      return null;
    }
    const rawExt = matches[1].toLowerCase();
    const ext = rawExt === "jpeg" ? "jpg" : rawExt.replace(/\+xml$/, "");
    const buffer = Buffer.from(matches[2], "base64");
    const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const targetPath = path.join(UPLOAD_DIR, fileName);
    fs.writeFileSync(targetPath, buffer);
    return `/images/uploads/${fileName}`;
  } catch (err) {
    console.error("Failed to save uploaded base64 image:", err);
    return null;
  }
}

// ---------------- API ROUTER ----------------

export async function handleStoreApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const jsonHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  // --- UPLOAD API ---
  if (pathname === "/api/upload" && request.method === "POST") {
    try {
      const body = (await request.json()) as { image?: string; dataUrl?: string };
      const rawImage = body.image || body.dataUrl;
      if (!rawImage) {
        return new Response(JSON.stringify({ error: "لا توجد بيانات صورة مرفوعة" }), {
          status: 400,
          headers: jsonHeaders,
        });
      }

      if (rawImage.startsWith("data:image/")) {
        const savedUrl = saveUploadedBase64Image(rawImage);
        if (savedUrl) {
          return new Response(JSON.stringify({ success: true, url: savedUrl }), {
            headers: jsonHeaders,
          });
        }
      }

      // If it's already a clean URL or relative path, return as is
      return new Response(JSON.stringify({ success: true, url: rawImage }), {
        headers: jsonHeaders,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل رفع الصورة" }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  // --- PRODUCTS API ---
  if (pathname === "/api/products" || pathname.startsWith("/api/products/")) {
    const idFromPath = pathname.replace(/^\/api\/products\/?/, "");
    const idFromQuery = url.searchParams.get("id");
    const targetId = idFromPath || idFromQuery;

    // GET /api/products
    if (request.method === "GET") {
      const products = readStoredProducts();
      return new Response(JSON.stringify(products), { headers: jsonHeaders });
    }

    // POST /api/products (Create)
    if (request.method === "POST") {
      try {
        const body = (await request.json()) as { product?: AdminProduct } & Partial<AdminProduct>;
        const productData = body.product || body;

        let image = productData.image || "/images/products/product-1.jpg";
        if (image.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(image);
          if (savedUrl) image = savedUrl;
        }

        const newProduct: AdminProduct = {
          id: productData.id || `product-${Date.now()}`,
          name: productData.name?.trim() || "منتج جديد",
          price: Number(productData.price) || 0,
          originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
          image,
          category: productData.category || "abayas",
          stock: typeof productData.stock === "number" ? productData.stock : 10,
          href: productData.href || `/${productData.category || "abayas"}`,
          description: productData.description?.trim() || "",
          createdAt:
            productData.createdAt || new Date().toISOString().split("T")[0] || "2026-09-25",
        };

        const products = readStoredProducts();
        const updated = [newProduct, ...products];
        writeStoredProducts(updated);

        return new Response(
          JSON.stringify({ success: true, product: newProduct, products: updated }),
          {
            headers: jsonHeaders,
          },
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل إنشاء المنتج" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // PUT /api/products (Update)
    if (request.method === "PUT") {
      try {
        const body = (await request.json()) as { product?: AdminProduct } & Partial<AdminProduct>;
        const productData = body.product || body;
        const productId = productData.id || targetId;

        if (!productId) {
          return new Response(JSON.stringify({ error: "معرف المنتج مطلوب للتعديل" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        let image = productData.image;
        if (image && image.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(image);
          if (savedUrl) image = savedUrl;
        }

        const products = readStoredProducts();
        const index = products.findIndex((p) => p.id === productId);

        if (index === -1) {
          return new Response(JSON.stringify({ error: "المنتج غير موجود" }), {
            status: 404,
            headers: jsonHeaders,
          });
        }

        const existing = products[index]!;
        const updatedProduct: AdminProduct = {
          ...existing,
          ...productData,
          id: existing.id,
          name: productData.name !== undefined ? productData.name.trim() : existing.name,
          price: productData.price !== undefined ? Number(productData.price) : existing.price,
          originalPrice:
            productData.originalPrice !== undefined
              ? productData.originalPrice
                ? Number(productData.originalPrice)
                : undefined
              : existing.originalPrice,
          image: image || existing.image,
          category: productData.category || existing.category,
          stock: productData.stock !== undefined ? Number(productData.stock) : existing.stock,
          description:
            productData.description !== undefined
              ? productData.description.trim()
              : existing.description,
        };

        products[index] = updatedProduct;
        writeStoredProducts(products);

        return new Response(JSON.stringify({ success: true, product: updatedProduct, products }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل تعديل المنتج" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // DELETE /api/products (Delete)
    if (request.method === "DELETE") {
      try {
        let deleteId = targetId;
        if (!deleteId) {
          try {
            const body = (await request.json()) as { id?: string };
            deleteId = body.id;
          } catch {
            // body might be empty
          }
        }

        if (!deleteId) {
          return new Response(JSON.stringify({ error: "معرف المنتج مطلوب للحذف" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        const products = readStoredProducts();
        const filtered = products.filter((p) => p.id !== deleteId);
        writeStoredProducts(filtered);

        return new Response(JSON.stringify({ success: true, products: filtered }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل حذف المنتج" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }
  }

  // --- CATEGORIES API ---
  if (pathname === "/api/categories" || pathname.startsWith("/api/categories/")) {
    const isReset = pathname === "/api/categories/reset";
    const idFromPath = pathname.replace(/^\/api\/categories\/?/, "");
    const idFromQuery = url.searchParams.get("id");
    const targetId = idFromPath && idFromPath !== "reset" ? idFromPath : idFromQuery;

    // GET /api/categories
    if (request.method === "GET") {
      const categories = readStoredCategories();
      return new Response(JSON.stringify(categories), { headers: jsonHeaders });
    }

    // POST /api/categories/reset
    if (isReset && request.method === "POST") {
      // Re-initialize from defaults
      const categories = readStoredCategories();
      return new Response(JSON.stringify({ success: true, categories }), { headers: jsonHeaders });
    }

    // POST /api/categories (Create)
    if (request.method === "POST") {
      try {
        const body = (await request.json()) as {
          category?: StoreCategory;
        } & Partial<StoreCategory>;
        const categoryData = body.category || body;

        let image = categoryData.image || "/images/categories/abayas.jpg";
        if (image.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(image);
          if (savedUrl) image = savedUrl;
        }

        let bannerImage = categoryData.bannerImage;
        if (bannerImage && bannerImage.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(bannerImage);
          if (savedUrl) bannerImage = savedUrl;
        }

        const newCategory: StoreCategory = {
          id: categoryData.id || `cat-${Date.now()}`,
          name: categoryData.name?.trim() || "قسم جديد",
          href: categoryData.href || `/${categoryData.id || `cat-${Date.now()}`}`,
          image,
          bannerImage: bannerImage || undefined,
          alt: categoryData.alt || `${categoryData.name} - حجاب سول`,
          description: categoryData.description?.trim() || "",
          order: typeof categoryData.order === "number" ? categoryData.order : 99,
          isActive: categoryData.isActive !== false,
        };

        const categories = readStoredCategories();
        const updated = [...categories, newCategory].sort((a, b) => a.order - b.order);
        writeStoredCategories(updated);

        return new Response(
          JSON.stringify({ success: true, category: newCategory, categories: updated }),
          { headers: jsonHeaders },
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل إنشاء القسم" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // PUT /api/categories (Update)
    if (request.method === "PUT") {
      try {
        const body = (await request.json()) as {
          category?: StoreCategory;
        } & Partial<StoreCategory>;
        const categoryData = body.category || body;
        const catId = categoryData.id || targetId;

        if (!catId) {
          return new Response(JSON.stringify({ error: "معرف القسم مطلوب للتعديل" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        let image = categoryData.image;
        if (image && image.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(image);
          if (savedUrl) image = savedUrl;
        }

        let bannerImage = categoryData.bannerImage;
        if (bannerImage && bannerImage.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(bannerImage);
          if (savedUrl) bannerImage = savedUrl;
        }

        const categories = readStoredCategories();
        const index = categories.findIndex((c) => c.id === catId);

        if (index === -1) {
          return new Response(JSON.stringify({ error: "القسم غير موجود" }), {
            status: 404,
            headers: jsonHeaders,
          });
        }

        const existing = categories[index]!;
        const updatedCategory: StoreCategory = {
          ...existing,
          ...categoryData,
          id: existing.id,
          name: categoryData.name !== undefined ? categoryData.name.trim() : existing.name,
          href: categoryData.href !== undefined ? categoryData.href.trim() : existing.href,
          image: image || existing.image,
          bannerImage: bannerImage !== undefined ? bannerImage : existing.bannerImage,
          alt: categoryData.alt || existing.alt,
          description:
            categoryData.description !== undefined
              ? categoryData.description.trim()
              : existing.description,
          order: categoryData.order !== undefined ? Number(categoryData.order) : existing.order,
          isActive: categoryData.isActive !== undefined ? categoryData.isActive : existing.isActive,
        };

        categories[index] = updatedCategory;
        const sorted = categories.sort((a, b) => a.order - b.order);
        writeStoredCategories(sorted);

        return new Response(
          JSON.stringify({ success: true, category: updatedCategory, categories: sorted }),
          { headers: jsonHeaders },
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل تعديل القسم" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // DELETE /api/categories (Delete)
    if (request.method === "DELETE") {
      try {
        let deleteId = targetId;
        if (!deleteId) {
          try {
            const body = (await request.json()) as { id?: string };
            deleteId = body.id;
          } catch {
            // body empty
          }
        }

        if (!deleteId) {
          return new Response(JSON.stringify({ error: "معرف القسم مطلوب للحذف" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        const categories = readStoredCategories();
        const filtered = categories.filter((c) => c.id !== deleteId);
        writeStoredCategories(filtered);

        return new Response(JSON.stringify({ success: true, categories: filtered }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل حذف القسم" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }
  }

  // --- ORDERS API ---
  if (pathname === "/api/orders" || pathname.startsWith("/api/orders/")) {
    const idFromPath = pathname.replace(/^\/api\/orders\/?/, "");
    const idFromQuery = url.searchParams.get("id");
    const targetId = idFromPath || idFromQuery;

    // GET /api/orders
    if (request.method === "GET") {
      const orders = readStoredOrders();
      return new Response(JSON.stringify(orders), { headers: jsonHeaders });
    }

    // POST /api/orders (Create from Customer Checkout)
    if (request.method === "POST") {
      try {
        const body = (await request.json()) as { order?: CustomerOrder } & Partial<CustomerOrder>;
        const orderData = body.order || body;

        const newOrder: CustomerOrder = {
          id: orderData.id || `ord-${Date.now()}`,
          orderNumber: orderData.orderNumber || `HS-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: orderData.customerName?.trim() || "زبون",
          phone: orderData.phone?.trim() || "",
          wilaya: orderData.wilaya?.trim() || "الجزائر العاصمة",
          commune: orderData.commune?.trim() || "المركز",
          address: orderData.address?.trim() || "",
          items: orderData.items || [],
          totalAmount: Number(orderData.totalAmount) || 0,
          shippingCost: Number(orderData.shippingCost) || 500,
          grandTotal: Number(orderData.grandTotal) || 0,
          status: (orderData.status as OrderStatus) || "pending",
          createdAt:
            orderData.createdAt ||
            new Date().toLocaleDateString("ar-DZ", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          notes: orderData.notes?.trim() || undefined,
        };

        const orders = readStoredOrders();
        const updated = [newOrder, ...orders];
        writeStoredOrders(updated);

        return new Response(JSON.stringify({ success: true, order: newOrder, orders: updated }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل إنشاء الطلب" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // PUT /api/orders (Update status or order)
    if (request.method === "PUT") {
      try {
        const body = (await request.json()) as {
          id?: string;
          status?: OrderStatus;
          order?: Partial<CustomerOrder>;
        };
        const orderId = body.id || targetId || body.order?.id;
        const newStatus = body.status || body.order?.status;

        if (!orderId) {
          return new Response(JSON.stringify({ error: "معرف الطلب مطلوب للتحديث" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        const orders = readStoredOrders();
        const index = orders.findIndex((o) => o.id === orderId);

        if (index === -1) {
          return new Response(JSON.stringify({ error: "الطلب غير موجود" }), {
            status: 404,
            headers: jsonHeaders,
          });
        }

        const existing = orders[index]!;
        const updatedOrder: CustomerOrder = {
          ...existing,
          ...(body.order || {}),
          status: newStatus || existing.status,
        };

        orders[index] = updatedOrder;
        writeStoredOrders(orders);

        return new Response(JSON.stringify({ success: true, order: updatedOrder, orders }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل تحديث الطلب" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // DELETE /api/orders
    if (request.method === "DELETE") {
      try {
        let deleteId = targetId;
        if (!deleteId) {
          try {
            const body = (await request.json()) as { id?: string };
            deleteId = body.id;
          } catch {
            // body empty
          }
        }

        if (!deleteId) {
          return new Response(JSON.stringify({ error: "معرف الطلب مطلوب للحذف" }), {
            status: 400,
            headers: jsonHeaders,
          });
        }

        const orders = readStoredOrders();
        const filtered = orders.filter((o) => o.id !== deleteId);
        writeStoredOrders(filtered);

        return new Response(JSON.stringify({ success: true, orders: filtered }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل حذف الطلب" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }
  }

  // --- CONVERSATIONS API ---
  if (pathname === "/api/conversations" || pathname.startsWith("/api/conversations/")) {
    // GET /api/conversations
    if (pathname === "/api/conversations" && request.method === "GET") {
      const conversations = readStoredConversations();
      return new Response(JSON.stringify(conversations), { headers: jsonHeaders });
    }

    // POST /api/conversations/message (Send message)
    if (pathname === "/api/conversations/message" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          conversationId: string;
          text: string;
          sender?: "customer" | "admin";
          imageUrl?: string;
          productAttachment?: { name: string; price: number; image: string };
        };

        let imageUrl = body.imageUrl;
        if (imageUrl && imageUrl.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(imageUrl);
          if (savedUrl) imageUrl = savedUrl;
        }

        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          conversationId: body.conversationId,
          sender: body.sender || "admin",
          text: body.text || (imageUrl ? "📷 صورة مرفقة" : ""),
          timestamp: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }),
          isRead: body.sender === "admin",
          imageUrl: imageUrl || undefined,
          imageAttachment: imageUrl || undefined,
          productAttachment: body.productAttachment || undefined,
        };

        const conversations = readStoredConversations();
        const convIdx = conversations.findIndex((c) => c.id === body.conversationId);

        if (convIdx >= 0) {
          const conv = conversations[convIdx]!;
          conv.messages.push(newMessage);
          conv.lastMessage = newMessage.text;
          conv.lastMessageTime = newMessage.timestamp;
          if (newMessage.sender === "customer") {
            conv.unreadCount += 1;
          }
        } else {
          // Create new conversation
          conversations.unshift({
            id: body.conversationId,
            customerName: "زبون جديد",
            customerPhone: "",
            wilaya: "الجزائر",
            lastMessage: newMessage.text,
            lastMessageTime: newMessage.timestamp,
            unreadCount: newMessage.sender === "customer" ? 1 : 0,
            messages: [newMessage],
          });
        }

        writeStoredConversations(conversations);

        return new Response(JSON.stringify({ success: true, message: newMessage, conversations }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل إرسال الرسالة" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }

    // POST /api/conversations/read (Mark read)
    if (pathname === "/api/conversations/read" && request.method === "POST") {
      try {
        const body = (await request.json()) as { conversationId: string };
        const conversations = readStoredConversations();
        const conv = conversations.find((c) => c.id === body.conversationId);
        if (conv) {
          conv.unreadCount = 0;
          conv.messages.forEach((m) => (m.isRead = true));
          writeStoredConversations(conversations);
        }
        return new Response(JSON.stringify({ success: true, conversations }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل تحديث الرسائل" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }
  }

  // --- SETTINGS API ---
  if (pathname === "/api/settings") {
    if (request.method === "GET") {
      const settings = readStoredSettings();
      return new Response(JSON.stringify(settings), { headers: jsonHeaders });
    }

    if (request.method === "POST") {
      try {
        const body = (await request.json()) as Partial<StoreSettings>;
        let heroBanner = body.heroBanner;
        if (heroBanner && heroBanner.startsWith("data:image/")) {
          const savedUrl = saveUploadedBase64Image(heroBanner);
          if (savedUrl) heroBanner = savedUrl;
        }

        const current = readStoredSettings();
        const updated: StoreSettings = {
          ...current,
          ...body,
          heroBanner: heroBanner !== undefined ? heroBanner : current.heroBanner,
        };

        writeStoredSettings(updated);
        return new Response(JSON.stringify({ success: true, settings: updated }), {
          headers: jsonHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err instanceof Error ? err.message : "فشل حفظ الإعدادات" }),
          { status: 500, headers: jsonHeaders },
        );
      }
    }
  }

  return null;
}
