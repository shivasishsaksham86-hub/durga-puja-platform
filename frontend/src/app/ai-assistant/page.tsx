"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Namaskar! 🙏 I am your personal Durga Puja travel assistant. Are you looking for traditional Bonedi Bari pujas or modern theme pandals today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput("");

    // Simulate sophisticated AI response based on a knowledge base
    setTimeout(() => {
      let aiResponse = "";
      const lower = userMsg.toLowerCase();
      
      const knowledgeBase = [
        { keywords: ["north", "bagbazar", "kumartuli", "sovabazar", "ahiritola"], response: "For North Kolkata, I highly recommend visiting Bagbazar Sarbojanin for the traditional Ekchala idol, Ahiritola Sarbojanin, and Kumartuli Park for stunning themes. Don't forget to visit the Sovabazar Rajbari to witness the Bonedi Bari heritage! 🌸" },
        { keywords: ["south", "theme", "suruchi", "tridhara", "deshapriya", "ballygunge"], response: "South Kolkata is famous for its grand theme pandals! Based on current crowds, your best route is: 1. Deshapriya Park, 2. Tridhara Sammilani, 3. Suruchi Sangha, and 4. Ballygunge Cultural. Wear comfortable walking shoes! 👟" },
        { keywords: ["food", "eat", "roll", "biryani", "bhog", "restaurant"], response: "No pandal hopping is complete without food! 🍛 Grab a Kathi Roll near Park Street, authentic Kolkata Biryani at Arsalan, or try the traditional Bhog (Khichdi, Labra, and Payesh) served at local community pandals during afternoon Ashtami." },
        { keywords: ["history", "bonedi", "traditional", "oldest", "rajbari", "laha", "sabarna"], response: "To experience history, you must visit the Sabarna Roy Choudhury Paribar or Laha Bari. Their pujas are centuries old, preserving the colonial-era aristocratic traditions and classical Dhaak beats. 🏛️" },
        { keywords: ["metro", "transport", "bus", "travel", "cab", "uber", "taxi", "how to go"], response: "During Durga Puja days (Saptami to Navami), the Kolkata Metro runs almost all night, making it the fastest and safest way to travel! Cabs and buses are available but expect heavy traffic diversions. 🚇" },
        { keywords: ["maddox", "square", "adda", "hangout", "friends", "chill"], response: "Ah, Maddox Square! That's the ultimate 'Adda' (hangout) zone. It's less about the theme and more about sitting on the grass with friends, drinking tea, and enjoying the festive vibe all night long! ☕" },
        { keywords: ["sreebhumi", "burj khalifa", "lake town", "vip road"], response: "Sreebhumi Sporting Club is known for their spectacular, massive pandals (like the famous Burj Khalifa theme!). A quick tip: it gets incredibly crowded, so try visiting very early in the morning, around 4 AM! ✨" },
        { keywords: ["weather", "rain", "umbrella", "hot", "humid", "temperature"], response: "Kolkata weather during Puja is usually quite humid, and sudden rain showers are common! Always carry an umbrella, wear light cotton clothes, and stay hydrated with bottled water while walking. ☔💧" },
        { keywords: ["safety", "police", "lost", "emergency", "help"], response: "Safety first! Kolkata Police is highly active during Puja. You'll find police assistance booths near every major pandal. Download the 'Kolkata Police' app, keep emergency numbers handy, and stay close to your group in crowds. 👮" },
        { keywords: ["sindoor", "khela", "dashami", "bisarjan", "immersion", "vijaya"], response: "Vijaya Dashami is the final day. Married women play 'Sindoor Khela' (smearing vermilion) at the pandals before the Goddess is taken for Bisarjan (immersion) at the Ganges ghats like Babu Ghat. It's an emotional and beautiful sight. 🙏" },
        { keywords: ["ashtami", "anjali", "sondhi", "puja time", "saptami", "navami", "ritual"], response: "Maha Ashtami is the most auspicious day. The morning starts with 'Pushpanjali' (floral offerings) everywhere. In the evening, the mystical 'Sondhi Puja' bridges Ashtami and Navami with 108 lotus flowers and oil lamps. 🪔" },
        { keywords: ["hello", "hi", "hey", "namaskar", "greetings", "good morning", "good evening"], response: "Namaskar! 🙏 Welcome to the AGOMONI Puja Guide. How can I help you plan your pandal hopping today? Feel free to ask me anything about routes, food, transport, or traditions!" },
        { keywords: ["thank you", "thanks", "dhanyabad", "awesome", "great", "helpful"], response: "You're very welcome! Subho Saradiya! (Happy Durga Puja!) Let me know if you need any more tips or guidance. Have a wonderful festival! 🌸✨" },
      ];

      // Score matching
      let bestMatch = null;
      let maxMatches = 0;

      for (const rule of knowledgeBase) {
        let matchCount = 0;
        for (const keyword of rule.keywords) {
          if (lower.includes(keyword)) matchCount++;
        }
        if (matchCount > maxMatches) {
          maxMatches = matchCount;
          bestMatch = rule;
        }
      }

      if (bestMatch) {
        aiResponse = bestMatch.response;
      } else {
        const fallbacks = [
          "That sounds wonderful! Can you tell me if you have a specific area in Kolkata in mind, or how much time you have for pandal hopping today?",
          "I'm still learning about that specific topic, but I can definitely help you with popular themes, traditional pujas, food, or transportation. What would you like to explore?",
          "Interesting! If you're looking to plan a route, let me know whether you prefer North Kolkata's traditional vibes or South Kolkata's grand themes.",
          "Durga Puja is a massive festival with so much to see! Could you rephrase your question, or ask me about specific famous pandals, travel tips, or historical facts?"
        ];
        aiResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 800);
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    // Use timeout to allow state to update before sending if we were to trigger send automatically,
    // but here we just populate the input for the user to send.
  };

  return (
    <div className={styles.page}>
      <nav className="navbar">
        <div className="container">
          <div className="navContent">
            <Link href="/" className="logo">
              <span className="text-gradient">আগমনী</span> AGOMONI
            </Link>
            <div className="navLinks">
              <Link href="/heritage" className="navLink">Heritage Hub</Link>
              <Link href="/timeline" className="navLink">Timeline</Link>
              <Link href="/gallery" className="navLink">Gallery</Link>
              <Link href="/map" className="navLink">Smart Map</Link>
              <Link href="/ai-assistant" className="btn-primary">Ask AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.chatContainer}>
        <div className={`glass-panel ${styles.chatWindow}`}>
          <div className={styles.chatHeader}>
            <div className={styles.avatar}>
               <span role="img" aria-label="AI">🤖</span>
            </div>
            <div className={styles.headerInfo}>
              <h2>Puja Guide AI</h2>
              <p>Online • Ready to plan your pandal hopping</p>
            </div>
          </div>
          
          <div className={styles.chatHistory}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.messageRow} ${msg.sender === 'user' ? styles.userRow : ''}`}>
                <div className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.quickActionsContainer}>
             <div className={styles.quickActions}>
               <button className={styles.quickBtn} onClick={() => handleQuickAction("What are the best theme pandals in South Kolkata?")}>South Kolkata Themes</button>
               <button className={styles.quickBtn} onClick={() => handleQuickAction("I want to see historical Bonedi Bari pujas.")}>Historical Bonedi Bari</button>
               <button className={styles.quickBtn} onClick={() => handleQuickAction("Where can I get the best street food?")}>Street Food near Pandals</button>
             </div>
          </div>

          <div className={styles.chatInputArea}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className={styles.chatInput} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
