import React, { useState, useRef, useEffect } from 'react'
import {
  FaChevronRight,
  FaCog,
  FaRegCalendarAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaPaperPlane,
} from 'react-icons/fa'
import './Chatbot.css'

const Sidebar = ({ categories, chats, selectedChat, onSelectChat, onNewChat }) => (
  <aside className="cbp__sidebar">
    <div className="cbp__section">
      {categories.map((cat) => (
        <div key={cat} className="cbp__item">
          <span>{cat}</span>
          <FaChevronRight />
        </div>
      ))}
    </div>

    <div className="cbp__section">
      <div className="cbp__section-title">Chats</div>
      {chats.map((chat) => (
        <div
          key={chat}
          className={`cbp__item ${selectedChat === chat ? 'active' : ''}`}
          onClick={() => onSelectChat(chat)}
        >
          <span>{chat}</span>
          <FaChevronRight />
        </div>
      ))}
    </div>

    <button className="cbp__new-chat" onClick={onNewChat}>
      New chat
    </button>
  </aside>
)

const HeaderMain = ({ named, toggleNamed }) => (
  <div className="cbp__header">
    <FaCog className="cbp__header-icon" />

    <div className="cbp__header-spacer" />

    <div className="cbp__toggle">
      <span>Name chat</span>
      <label className="cbp__switch">
        <input type="checkbox" checked={named} onChange={toggleNamed} />
        <span className="cbp__slider" />
      </label>
    </div>
  </div>
)

const Greeting = ({ onQuickAction, activeTab, setActiveTab }) => (
  <div className="cbp__greeting">
    <h2>How can I help you today?</h2>
    <p className="cbp__subtitle">
      This code will display a prompt asking the user for their name, and will display a greeting message with the name entered by the user.
    </p>

    <div className="cbp__quick-actions">
      <button onClick={() => onQuickAction('Generate Timetable')}>
        <FaRegCalendarAlt className="icon" />
        <span>Generate Timetable</span>
      </button>
      <button onClick={() => onQuickAction('Faculty Info')}>
        <FaUniversity className="icon" />
        <span>Faculty Info</span>
      </button>
      <button onClick={() => onQuickAction('Financial Aid Info')}>
        <FaMoneyBillWave className="icon" />
        <span>Financial Aid Info</span>
      </button>
    </div>

    <div className="cbp__tabs">
      {['All', 'Text', 'Image', 'Video', 'Music', 'Analytics'].map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
)

const ChatWindow = ({ messages }) => {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="cbp__chat-window">
      {messages.map((m, i) => (
        <div key={i} className={`cbp__message ${m.sender}`}>
          {m.text}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}

const ChatInput = ({ input, setInput, send }) => (
  <div className="cbp__input-bar">
    <input
      type="text"
      placeholder="Type your prompt here…"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && send()}
    />
    <button onClick={send}>
      <FaPaperPlane />
    </button>
  </div>
)

export default function ChatbotPage() {
  const categories = ['Akhtar Jamil Info', 'Financial Aid', 'Warning Policy', 'Timetable']
  const chats = ['Trip Information', 'Course Info', 'PAST']
  const [selectedChat, setSelectedChat] = useState(null)
  const [named, setNamed] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const newChat = () => {
    setSelectedChat(null)
    setMessages([])
  }

  const handleQuickAction = (action) => {
    newChat()
    // you could seed the first prompt here:
    setMessages([{ sender: 'bot', text: `You clicked “${action}”.` }])
  }

  const send = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { sender: 'user', text: input }])
    setInput('')
    // simulate bot reply
    setTimeout(() => {
      setMessages((m) => [...m, { sender: 'bot', text: '…this is a demo reply.' }])
    }, 600)
  }

  return (
    <div className="cbp__container">
      <Sidebar
        categories={categories}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={(c) => {
          setSelectedChat(c)
          setMessages([])
        }}
        onNewChat={newChat}
      />

      <main className="cbp__main">
        <HeaderMain named={named} toggleNamed={() => setNamed((v) => !v)} />

        {!selectedChat && messages.length === 0 ? (
          <Greeting
            onQuickAction={handleQuickAction}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <ChatWindow messages={messages} />
        )}

        <ChatInput input={input} setInput={setInput} send={send} />
      </main>
    </div>
  )
}
