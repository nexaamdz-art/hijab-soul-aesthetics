import { useState, useRef, useEffect } from "react";
import { Search, Send, User, Phone, CheckCheck, Sparkles, Zap } from "lucide-react";
import { CustomerConversation } from "@/lib/store-data";

interface AdminChatProps {
  conversations: CustomerConversation[];
  activeConversationId?: string;
  onSendMessage: (conversationId: string, text: string) => void;
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
  activeConversationId: initialActiveId,
  onSendMessage,
  onMarkAsRead,
}: AdminChatProps) {
  const [selectedConvId, setSelectedConvId] = useState<string>(
    initialActiveId || (conversations.length > 0 ? conversations[0].id : ""),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
  }, [activeConv?.messages.length]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !activeConv) return;

    onSendMessage(activeConv.id, text);
    if (!textToSend) setInputText("");

    // Simulate customer typing and response if desired
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
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
      c.wilaya.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#2B2119]">الدردشة الحية مع العملاء</h2>
        <p className="text-xs sm:text-sm text-[#735A45]">
          التواصل المباشر، الرد على الاستفسارات، وتأكيد طلبات الزبائن فورياً
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-[#FAF6F0] border border-[#E3D4C0] shadow-md overflow-hidden min-h-[640px]">
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
                placeholder="بحث في المحادثات .."
                className="w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EADCCB]">
            {filteredConversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;

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

                    <p className="text-xs text-[#5A412F] truncate line-clamp-1">
                      {conv.lastMessage}
                    </p>

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
              <div className="text-center py-8 text-xs text-[#735A45]">لا توجد محادثات مطابقة</div>
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
                    title="اتصال"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Chat Message Bubble History */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF6F0]/40 max-h-[460px]">
                {/* Security/Notice badge */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE0CD]/80 text-[11px] text-[#735A45]">
                    <Sparkles className="h-3 w-3 text-[#8C2A3E]" />
                    <span>محادثة مباشرة ومشفرة مع عميل حجاب سول</span>
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isAdmin = msg.sender === "admin";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAdmin ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
                        {!isAdmin && (
                          <div className="h-6 w-6 rounded-full bg-[#2B2119] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {activeConv.customerName[0]}
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isAdmin
                              ? "bg-[#2B2119] text-white rounded-br-xs"
                              : "bg-white text-[#2B2119] border border-[#E3D4C0] rounded-bl-xs"
                          }`}
                        >
                          <p>{msg.text}</p>
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

              {/* Message Input Box */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#E3D4C0]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتبي رسالتكِ للعميل واضغطي Enter .."
                    className="flex-1 rounded-xl border border-[#D5C2AA] bg-[#FAF6F0] px-4 py-2.5 text-xs sm:text-sm text-[#2B2119] placeholder:text-[#9F8A77] focus:outline-none focus:border-[#2B2119]"
                  />

                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!inputText.trim()}
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#2B2119] text-white hover:bg-[#433225] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0"
                  >
                    <Send className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-xs text-[#735A45]">
              اختاري محادثة للبدء في الدردشة
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
