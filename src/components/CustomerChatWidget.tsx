import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  Download,
  CheckCheck,
  ShieldCheck,
  UserCheck,
  LogIn,
} from "lucide-react";
import { useStoreData } from "@/lib/store-data";
import { useAuth } from "@/lib/auth-context";

export function CustomerChatWidget() {
  const { conversations, sendMessage } = useStoreData();
  const { user, openAuthModal } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // We connect conversation to current user session or user default
  const defaultConv = conversations[0] || {
    id: "conv-user",
    customerName: user?.user_metadata?.full_name || "زبونة حجاب سول",
    customerPhone: "0660000000",
    wilaya: "الجزائر",
    lastMessage: "",
    lastMessageTime: "",
    unreadCount: 0,
    messages: [],
  };

  const activeConv = conversations.find((c) => c.id === defaultConv.id) || defaultConv;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, activeConv.messages.length, selectedImage]);

  const handleFloatingClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setIsOpen(true);
    }
  };

  // Handle local image file upload
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
    e.target.value = "";
  };

  // Handle Send
  const handleSend = () => {
    const text = inputText.trim();
    if (!text && !selectedImage) return;

    sendMessage(activeConv.id, text, "customer", selectedImage || undefined);
    setInputText("");
    setSelectedImage(null);
    setSelectedImageName("");

    // Simulate Admin Auto-Reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const sampleReplies = [
        {
          text: "أهلاً وسهلاً بكِ في حجاب سول! تم استقبال رسالتكِ بنجاح، وستقوم إدارة المتجر بالرد عليكِ فوراً.",
          img: undefined,
        },
        {
          text: "مرحباً بكِ! هذا الموديل متوفر حالياً بألوان متعددة وقماش كريب ممتاز، هل تودين معرفة المقاسات المتوفرة؟",
          img: "/images/uploads/black_floral_embroidered_abaya_1789830101193.jpg",
        },
      ];
      const randomReply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)] || sampleReplies[0];
      if (randomReply) {
        sendMessage(activeConv.id, randomReply.text, "admin", randomReply.img);
      }
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Small Floating Action Button (زر عائم صغير) */}
      <div className="fixed bottom-5 left-5 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={handleFloatingClick}
            className="relative flex items-center justify-center h-12 w-12 rounded-full bg-[#2B2119] text-white shadow-xl hover:bg-[#3D2F24] active:scale-90 transition-all duration-200 cursor-pointer border border-[#E3D4C0]/40 group"
            aria-label="التواصل مع صاحب الموقع"
            title="الدردشة المباشرة مع صاحب الموقع"
          >
            <MessageCircle className="h-5 w-5 text-[#E5D2B8] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#2B2119]" />
            </span>
          </button>
        )}
      </div>

      {/* Login Prompt Dialog (When non-logged-in user clicks chat) */}
      {showLoginPrompt && !user && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLoginPrompt(false);
          }}
        >
          <div
            dir="rtl"
            className="relative w-full max-w-sm rounded-2xl bg-[#FAF6F0] p-6 shadow-2xl border border-[#E3D4C0] text-[#2B2119] space-y-4 text-center"
          >
            <button
              type="button"
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-3.5 left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#EDE0CD] text-[#2B2119] hover:bg-[#E2CEB4]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2B2119] text-[#E5D2B8]">
              <MessageCircle className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-base font-black text-[#2B2119]">
                الدردشة المباشرة مع صاحب الموقع
              </h3>
              <p className="text-xs text-[#735A45] mt-1.5 leading-relaxed">
                خدمة الدردشة المباشرة متاحة فقط للأعضاء والزبائن المسجلين في المتجر. يرجى تسجيل الدخول أو إنشاء حساب للتواصل الفوري مع إدارة المتجر.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowLoginPrompt(false);
                  openAuthModal("signin");
                }}
                className="w-full min-h-[42px] flex items-center justify-center gap-2 rounded-xl bg-[#2B2119] text-white font-bold text-xs shadow-md hover:bg-[#3D2F24] active:scale-[0.98] cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-[#E5D2B8]" />
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>

              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-2 text-xs font-bold text-[#735A45] hover:text-[#2B2119] cursor-pointer"
              >
                إلغاء والعودة للمتجر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Box (For logged in users) */}
      {isOpen && user && (
        <div
          dir="rtl"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[540px] max-h-[85vh] rounded-2xl bg-[#FAF6F0] border border-[#E3D4C0] shadow-2xl flex flex-col overflow-hidden text-[#2B2119] animate-in slide-in-from-bottom-5 duration-200"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FCF9F4 0%, #F5EDE0 100%), radial-gradient(circle at 20% 20%, rgba(60,45,30,0.02) 0 1px, transparent 1px)",
          }}
        >
          {/* Header */}
          <div className="p-3.5 bg-[#2B2119] text-[#FAF6F0] flex items-center justify-between border-b border-[#433225]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-[#3D2F24] border border-[#D5C2AA]/30 flex items-center justify-center text-xs font-bold text-[#E5D2B8]">
                  HS
                </div>
                <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#2B2119]" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>صاحب الموقع والإدارة</span>
                  <Sparkles className="h-3 w-3 text-[#E5D2B8]" />
                </h3>
                <p className="text-[10px] text-[#D5C2AA]">نحن متواجدون لمساعدتكِ فوراً</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-[#3D2F24] text-[#E5D2B8] hover:bg-[#4E3C2F] hover:text-white transition-colors cursor-pointer"
              title="إغلاق النافذة"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages History */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAF6F0]/50 text-xs">
            <div className="text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EDE0CD] text-[10px] text-[#735A45] font-medium">
                <ShieldCheck className="h-3 w-3 text-[#8C2A3E]" />
                <span>مرحباً بكِ! يمكنكِ مراسلة إدارة المتجر مباشرة للاستفسارات والطلبات الخاصة</span>
              </span>
            </div>

            {activeConv.messages.map((msg) => {
              const isCustomer = msg.sender === "customer";
              const imgUrl = msg.imageUrl || msg.imageAttachment;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCustomer ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`rounded-2xl p-2.5 max-w-[85%] leading-relaxed shadow-2xs overflow-hidden ${
                      isCustomer
                        ? "bg-[#2B2119] text-white rounded-br-xs"
                        : "bg-white text-[#2B2119] border border-[#E3D4C0] rounded-bl-xs"
                    }`}
                  >
                    {imgUrl && (
                      <div className="relative mb-2 group rounded-xl overflow-hidden border border-black/10">
                        <img
                          src={imgUrl}
                          alt="صورة مرفقة"
                          className="w-full max-h-48 object-cover rounded-lg cursor-pointer group-hover:scale-105 transition-transform"
                          onClick={() => setLightboxImage({ url: imgUrl, caption: msg.text })}
                        />
                        <button
                          type="button"
                          onClick={() => setLightboxImage({ url: imgUrl, caption: msg.text })}
                          className="absolute bottom-1 left-1 p-1 rounded-md bg-black/60 text-white text-[9px] flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Maximize2 className="h-2.5 w-2.5" />
                          <span>تكبير</span>
                        </button>
                      </div>
                    )}

                    {msg.text && <p>{msg.text}</p>}
                  </div>

                  <div className="flex items-center gap-1 text-[9px] text-[#9F8A77] mt-0.5 px-1 font-mono">
                    <span>{msg.timestamp}</span>
                    {isCustomer && <CheckCheck className="h-2.5 w-2.5 text-emerald-600" />}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#735A45] italic">
                <span className="h-2 w-2 rounded-full bg-[#8C2A3E] animate-ping" />
                <span>إدارة المتجر تكتب الآن ..</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Selected Image Preview before sending */}
          {selectedImage && (
            <div className="p-2.5 bg-[#FAF6F0] border-t border-[#E3D4C0] flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <img
                  src={selectedImage}
                  alt="معاينة"
                  className="h-10 w-10 rounded-lg object-cover border border-[#D5C2AA]"
                />
                <span className="text-[11px] font-bold text-[#2B2119] truncate max-w-[180px]">
                  {selectedImageName || "صورة مرفقة جاهزة"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedImageName("");
                }}
                className="p-1 rounded-full text-[#735A45] hover:text-red-600 hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Input and Controls */}
          <div className="p-2.5 bg-white border-t border-[#E3D4C0]">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#FAF6F0] border border-[#D5C2AA] text-[#5A412F] hover:bg-[#EDE0CD] transition-colors cursor-pointer shrink-0"
                title="إرفاق صورة"
              >
                <ImageIcon className="h-4 w-4 text-[#8C2A3E]" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتبي رسالتكِ أو استفساركِ .."
                className="flex-1 rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] px-3 py-2 text-xs text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!inputText.trim() && !selectedImage}
                className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#2B2119] text-white hover:bg-[#3D2F24] disabled:opacity-40 transition-all cursor-pointer shrink-0"
                title="إرسال"
              >
                <Send className="h-3.5 w-3.5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
        >
          <div className="relative max-w-2xl max-h-[85vh] flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 text-white text-xs font-bold">
              <span>{lightboxImage.caption || "عرض الصورة"}</span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  download="chat-image.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <img
              src={lightboxImage.url}
              alt="الصورة بالحجم الكامل"
              className="max-h-[75vh] max-w-full object-contain rounded-xl border border-white/20"
            />
          </div>
        </div>
      )}
    </>
  );
}
