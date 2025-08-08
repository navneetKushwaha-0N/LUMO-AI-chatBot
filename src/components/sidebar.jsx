import { Menu, Moon, Plus, Sparkles, Sun, Trash2 } from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, conversations, setConversations, activeConversation, setActiveConversation, theme, setTheme }) => {
  
  // Naya conversation create karo
  const createNewConversation = () => {
    // Check karo koi purana conversation khali toh nahi
    const emptyConversation = conversations.find((conv) => conv.messages.length === 0);
    if (emptyConversation) {
      // Agar ek empty conversation hai toh usko hi active karo, naya banane ki zaroorat nahi
      setActiveConversation(emptyConversation.id);
      return;
    }
    // Sirf tab naya conversation banao jab koi empty na ho
    const newId = `conv-${Date.now()}`;
    setConversations([{ id: newId, title: "New Chat", messages: [] }, ...conversations]);
    setActiveConversation(newId);
  };

  // Conversation delete karo aur active wala handle karo
  const deleteConversation = (id, e) => {
    e.stopPropagation(); // Conversation select hone ka event rok do
    // Check karo kya yeh last conversation hai
    if (conversations.length === 1) {
      // Ek naya conversation banao jiska ID "default" ho
      const newConversation = { id: "default", title: "New Chat", messages: [] };
      setConversations([newConversation]);
      setActiveConversation("default"); // Active conversation ko default pe set karo
    } else {
      // Conversation list se remove karo
      const updatedConversations = conversations.filter((conv) => conv.id !== id);
      setConversations(updatedConversations);
      // Agar active conversation delete ho gaya toh kisi aur pe switch karo
      if (activeConversation === id) {
        // Pehla conversation choose karo jo delete nahi hua
        const nextConversation = updatedConversations[0];
        setActiveConversation(nextConversation.id);
      }
    }
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      
      {/* Sidebar ka header section */}
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <Menu size={18} />
        </button>
        <button className="new-chat-btn" onClick={createNewConversation}>
          <Plus size={20} />
          <span>New chat</span>
        </button>
      </div>

      {/* Conversation ka list section */}
      <div className="sidebar-content">
        <h2 className="sidebar-title">Chat history</h2>
        <ul className="conversation-list">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`conversation-item ${activeConversation === conv.id ? "active" : ""}`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <div className="conversation-icon-title">
                <div className="conversation-icon">
                  <Sparkles size={14} />
                </div>
                <span className="conversation-title">{conv.title}</span>
              </div>
              {/* Delete button sirf tab dikhana jab ek se zyada chats ho ya title "New Chat" na ho */}
              <button
                className={`delete-btn ${conversations.length > 1 || conv.title !== "New Chat" ? "" : "hide"}`}
                onClick={(e) => deleteConversation(conv.id, e)}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme change karne ka toggle */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? (
            <>
              <Moon size={20} />
              <span>Dark mode</span>
            </>
          ) : (
            <>
              <Sun size={20} />
              <span>Light mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
