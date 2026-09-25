import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  User,
  Phone,
  CheckCheck,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Paperclip,
  X,
  Maximize2,
  Download,
  ShoppingBag,
  ExternalLink,
  PlusCircle,
  Eye,
  Camera,
} from "lucide-react";
import { CustomerConversation, AdminProduct } from "@/lib/store-data";

interface AdminChatProps {
  conversations: CustomerConversation[];
  products?: AdminProduct[];
  activeConversationId?: string | undefined;
  onSendMessage: (
    conversationId: string,
    text: string,
    sender?: "admin" | "customer",
    imageUrl?: string | undefined,
    productAttachment?: { name: string; price: number; image: string } | undefined,
  ) => void;
  onMarkAsRead: (conversationId: string) => void;
}

const QUICK_REPLIES = [
  "أهلاً بكِ في حجاب سول 🕊️ يسعدنا تقديم المساعدة!",
  "تم تأكيد طلبكِ بنجاح وجاري تجهيزه للشحن اليوم إن شاء الله.",
  "المقاس متوفر حالياً ويمكنكِ إتمام الطلب مباشرة من المتجر.",
  "مدة التوصيل لولايتكِ من 24 إلى 48 ساعة والدفع عند الاستلام.",
  "يسعدنا جداً رضاكِ عن جودة القماش والخياطة! دمتم بخير ♡",
];

export function AdminChat({
  conversations,
  products = [],
  activeConversationId: initialActiveId,
  onSendMessage,
  onMarkAsRead,
}: AdminChatProps) {
  const [selectedConvId, setSelectedConvId] = useState<string>(
    initialActiveId || conversations[0]?.id || "",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  // Modals
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(
    null,
  );
  const [productSearch, setProductSearch] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  useEffect(() => {
    if (initialActiveId) {
      setSelectedConvId(initialActiveId);
    }
  }, [initialActiveId]);

  const activeConvId = activeConv?.id;
  useEffect(() => {
    if (activeConvId) {
      onMarkAsRead(activeConvId);
    }
  }, [activeConvId, onMarkAsRead]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages.length, selectedImage]);

  // Handle File Upload from device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setSelectedImageName(file.name);
      }
    };
    reader.readAsDataURL(file);

    // Reset input value so same file can be selected again
    e.target.value = "";
  };

  // Handle Paste from Clipboard (Ctrl+V)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item && item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setSelectedImage(event.target.result as string);
              setSelectedImageName("صورة من الحافظة");
            }
          };
          reader.readAsDataURL(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  // Send Message
  const handleSend = (textToSend?: string, imageToSend?: string | null) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    const img = imageToSend !== undefined ? imageToSend : selectedImage;

    if (!activeConv) return;
    if (!text && !img) return;

    onSendMessage(activeConv.id, text, "admin", img || undefined);

    if (textToSend === undefined) setInputText("");
    setSelectedImage(null);
    setSelectedImageName("");

    // Simulate customer typing and response if desired
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Simulate Customer Sending an Image
  const handleSimulateCustomerImage = () => {
    if (!activeConv) return;
    const sampleCustomerImages = [
      {
        url: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
        text: "السلام عليكم، هل هذا الموديل متوفر منه مقاس 42 ولون كحلي؟",
      },
      {
        url: "/images/uploads/ivory_watercolor_floral_abaya_1789830182632.jpg",
        text: "أهلاً، لقد حولت المبلغ عبر بريدي موب وهذا وصل الدفع المرفق.",
      },
      {
        url: "/images/uploads/hijab_pearl_beaded_shawls_1789831343828.jpg",
        text: "هل القماش شيفون تركي ناعم أم كريب كوري؟",
      },
    ];

    const randomItem =
      sampleCustomerImages[Math.floor(Math.random() * sampleCustomerImages.length)] ||
      sampleCustomerImages[0];

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (randomItem) {
        onSendMessage(activeConv.id, randomItem.text, "customer", randomItem.url);
      }
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerPhone.includes(searchQuery) ||
      c.wilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">
            الدردشة الحية مع العملاء
          </h2>
          <p className="text-xs sm:text-sm text-[#735A45]">
            التواصل المباشر، إرسال واستقبال صور المنتجات والوصولات، وتأكيد طلبات الزبائن فورياً
          </p>
        </div>

        {activeConv && (
          <button
            type="button"
            onClick={handleSimulateCustomerImage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D5C2AA] text-xs font-bold text-[#5A412F] hover:bg-[#FAF6F0] hover:border-[#2B2119] transition-all cursor-pointer shadow-xs"
            title="تجربة استلام صورة من الزبون في المحادثة"
          >
            <Camera className="h-3.5 w-3.5 text-[#8C2A3E]" />
            <span>محاكاة إرسال صورة من الزبون</span>
          </button>
        )}
      </div>

      {/* Main Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-[#FAF6F0] border border-[#E3D4C0] shadow-md overflow-hidden min-h-[660px]">
        {/* Conversations List (4 cols) */}
        <div className="lg:col-span-4 border-l border-[#E3D4C0] flex flex-col bg-[#FAF6F0]">
          {/* Search bar */}
          <div className="p-3.5 border-b border-[#E3D4C0] bg-white">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#735A45]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في المحادثات والرسائل .."
                className="w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EADCCB] max-h-[600px]">
            {filteredConversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;
              const hasImages = conv.messages.some((m) => m.imageUrl || m.imageAttachment);

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors text-right ${
                    isSelected ? "bg-[#EDE0CD]" : "hover:bg-[#F5EDE0] bg-transparent"
                  }`}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {conv.customerName[0] || <User className="h-5 w-5" />}
                    </div>
                    <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#2B2119] truncate">
                        {conv.customerName}
                      </span>
                      <span className="text-[10px] text-[#735A45] shrink-0 font-mono">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {hasImages && (
                        <span title="يحتوي على صور">
                          <ImageIcon className="h-3 w-3 text-[#8C2A3E] shrink-0" />
                        </span>
                      )}
                      <p className="text-xs text-[#5A412F] truncate line-clamp-1">
                        {conv.lastMessage}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-[#9F8A77]">{conv.wilaya}</span>
                      {conv.unreadCount > 0 && (
                        <span className="h-4 min-w-[16px] px-1 rounded-full bg-[#8C2A3E] text-[10px] font-bold text-white flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="text-center py-8 text-xs text-[#735A45]">
                لا توجد محادثات مطابقة للبحث
              </div>
            )}
          </div>
        </div>

        {/* Active Chat Conversation Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#E3D4C0] bg-[#FAF6F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#2B2119] text-white font-bold flex items-center justify-center text-sm">
                    {activeConv.customerName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#2B2119]">
                        {activeConv.customerName}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        متصل الآن
                      </span>
                    </div>
                    <p className="text-xs text-[#735A45] mt-0.5">
                      {activeConv.wilaya} • هاتف: <span dir="ltr">{activeConv.customerPhone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeConv.customerPhone}`}
                    className="p-2 rounded-xl bg-white border border-[#D5C2AA] text-[#2B2119] hover:bg-[#EDE0CD] transition-colors"
                    title="اتصال بالهاتف"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Chat Message Bubble History */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF6F0]/40 max-h-[440px]">
                {/* Notice badge */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE0CD]/80 text-[11px] text-[#735A45]">
                    <Sparkles className="h-3 w-3 text-[#8C2A3E]" />
                    <span>محادثة مباشرة ومشفرة — تدعم إرسال واستقبال الصور بجودة عالية</span>
                  </span>
                </div>

                {activeConv.messages.map((msg, index) => {
                  const isAdmin = msg.sender === "admin";
                  const imageUrl = msg.imageUrl || msg.imageAttachment;

                  return (
                    <div
                      key={`${msg.id || "msg"}-${index}`}
                      className={`flex flex-col ${isAdmin ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                        {!isAdmin && (
                          <div className="h-6 w-6 rounded-full bg-[#2B2119] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {activeConv.customerName[0]}
                          </div>
                        )}

                        <div
                          className={`rounded-2xl p-2 sm:p-3 text-xs sm:text-sm leading-relaxed shadow-xs overflow-hidden ${
                            isAdmin
                              ? "bg-[#2B2119] text-white rounded-br-xs"
                              : "bg-white text-[#2B2119] border border-[#E3D4C0] rounded-bl-xs"
                          }`}
                        >
                          {/* Image Attachment Rendering */}
                          {imageUrl && (
                            <div className="relative mb-2 group rounded-xl overflow-hidden border border-black/10 bg-black/5">
                              <img
                                src={imageUrl}
                                alt="مرفق صورة"
                                className="w-full max-h-64 object-cover rounded-lg cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
                                onClick={() =>
                                  setLightboxImage({ url: imageUrl, caption: msg.text })
                                }
                                loading="lazy"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setLightboxImage({ url: imageUrl, caption: msg.text })
                                }
                                className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] cursor-pointer hover:bg-black/80"
                                title="تكبير الصورة"
                              >
                                <Maximize2 className="h-3 w-3" />
                                <span>تكبير</span>
                              </button>
                            </div>
                          )}

                          {/* Product Card Attachment if any */}
                          {msg.productAttachment && (
                            <div className="mb-2 p-2 rounded-xl bg-black/10 border border-white/10 flex items-center gap-2 text-right">
                              <img
                                src={msg.productAttachment.image}
                                alt={msg.productAttachment.name}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-xs truncate">
                                  {msg.productAttachment.name}
                                </p>
                                <p className="text-[11px] font-mono text-emerald-300">
                                  {msg.productAttachment.price.toLocaleString("ar-DZ")} دج
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Message Text */}
                          {msg.text && <p className="px-1">{msg.text}</p>}
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1 text-[10px] text-[#9F8A77] mt-1 px-1 ${
                          isAdmin ? "mr-2" : "ml-8"
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isAdmin && <CheckCheck className="h-3 w-3 text-emerald-600" />}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#735A45] italic">
                    <span className="h-2 w-2 rounded-full bg-[#8C2A3E] animate-ping" />
                    <span>الزبون يكتب الآن ..</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Reply Chips */}
              <div className="p-2.5 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center gap-1.5 overflow-x-auto">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#735A45] shrink-0 pl-1">
                  <Zap className="h-3 w-3 text-[#8C2A3E]" />
                  <span>ردود جاهزة:</span>
                </div>
                {QUICK_REPLIES.map((rep, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(rep)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C2AA] text-[11px] text-[#2B2119] hover:bg-[#EDE0CD] whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {rep}
                  </button>
                ))}
              </div>

              {/* Image Preview Banner if selected */}
              {selectedImage && (
                <div className="p-3 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center justify-between gap-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-[#D5C2AA] shrink-0 bg-white">
                      <img
                        src={selectedImage}
                        alt="معاينة الصورة المرفقة"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2B2119]">
                        <ImageIcon className="h-3.5 w-3.5 text-[#8C2A3E]" />
                        <span>{selectedImageName || "صورة مرفقة جاهزة للإرسال"}</span>
                      </span>
                      <p className="text-[11px] text-[#735A45]">
                        يمكنكِ كتابة تعليق مع الصورة أو إرسالها مباشرة بالضغط على زر الإرسال
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedImageName("");
                    }}
                    className="p-1.5 rounded-full bg-white hover:bg-red-50 text-[#735A45] hover:text-red-600 border border-[#D5C2AA] transition-colors cursor-pointer"
                    title="إلغاء إرفاق الصورة"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Message Input Box & Image Attach Controls */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#E3D4C0]">
                {/* Hidden Native File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  {/* Image Attachment Button */}
                  <div className="relative flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#FAF6F0] border border-[#D5C2AA] text-[#5A412F] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-all cursor-pointer shrink-0"
                      title="إرفاق صورة من جهازكِ"
                    >
                      <ImageIcon className="h-4 w-4 text-[#8C2A3E]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsProductPickerOpen(true)}
                      className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#FAF6F0] border border-[#D5C2AA] text-[#5A412F] hover:bg-[#EDE0CD] hover:text-[#2B2119] transition-all cursor-pointer shrink-0"
                      title="إرفاق صورة منتج من المتجر"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Text Input */}
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    placeholder={
                      selectedImage
                        ? "اكتبي تعليقاً على الصورة المرفقة واضغطي Enter .."
                        : "اكتبي رسالتكِ أو قومي بلصق صورة (Ctrl+V) .."
                    }
                    className="flex-1 rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] px-4 py-2.5 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
                  />

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!inputText.trim() && !selectedImage}
                    className="flex items-center justify-center h-10 px-4 rounded-xl bg-[#2B2119] text-white hover:bg-[#433225] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0 gap-1.5 text-xs font-bold"
                  >
                    <span>إرسال</span>
                    <Send className="h-3.5 w-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-xs text-[#735A45]">
              اختاري محادثة من القائمة للبدء في الدردشة
            </div>
          )}
        </div>
      </div>

      {/* Product Catalog Picker Modal */}
      {isProductPickerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsProductPickerOpen(false);
          }}
        >
          <div
            dir="rtl"
            className="relative w-full max-w-2xl rounded-2xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#E3D4C0] text-[#2B2119] max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E3D4C0]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#8C2A3E]" />
                <h3 className="font-bold text-base text-[#2B2119]">
                  اختيار صورة منتج من كتالوج المتجر
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProductPickerOpen(false)}
                className="p-1 rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E2CEB4] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#735A45]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="ابحثي عن عباءة، فستان، خمار .."
                  className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-[#D5C2AA] bg-white text-[#2B2119] focus:outline-none focus:border-[#2B2119]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedImage(prod.image);
                    setSelectedImageName(prod.name);
                    setIsProductPickerOpen(false);
                  }}
                  className="group relative rounded-xl border border-[#D5C2AA] bg-white p-2 text-right hover:border-[#8C2A3E] hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-3/4 w-full rounded-lg overflow-hidden bg-[#FAF6F0] mb-2">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h4 className="font-bold text-xs text-[#2B2119] line-clamp-1">{prod.name}</h4>
                  <p className="text-[11px] font-mono text-[#8C2A3E] font-bold mt-1">
                    {prod.price.toLocaleString("ar-DZ")} دج
                  </p>
                  <span className="mt-2 text-[10px] text-center py-1 rounded-md bg-[#FAF6F0] group-hover:bg-[#2B2119] group-hover:text-white transition-colors font-semibold">
                    إرفاق هذا الموديل
                  </span>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-[#735A45]">
                  لم يتم العثور على منتجات مطابقة
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            {/* Action Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="text-xs font-bold truncate max-w-[70%]">
                {lightboxImage.caption || "عرض الصورة بالحجم الكامل"}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  download="hijab-soul-chat-image.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="تحميل الصورة"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="إغلاق"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image display */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/40">
              <img
                src={lightboxImage.url}
                alt="الصورة بالحجم الكامل"
                className="max-h-[80vh] max-w-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
