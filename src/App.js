import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const defaultQuotes = [
    { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { content: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { content: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { content: "If you’re going through hell, keep going.", author: "Winston Churchill" },
    { content: "What we think, we become.", author: "Buddha" },
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Whatever you are, be a good one.", author: "Abraham Lincoln" },
    { content: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { content: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { content: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { content: "Well done is better than well said.", author: "Benjamin Franklin" },
    { content: "Either you run the day or the day runs you.", author: "Jim Rohn" }
  ];

  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : defaultQuotes;
  });

  const [current, setCurrent] = useState(0);
  const [dark, setDark] = useState(false);
  const [bg, setBg] = useState("#1d2671");
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const colors = ["#1d2671", "#c33764", "#0f766e", "#7c3aed", "#be123c", "#0369a1"];

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const nextQuote = () => {
    setCurrent(Math.floor(Math.random() * quotes.length));
    setBg(colors[Math.floor(Math.random() * colors.length)]);
  };

  const addQuote = () => {
    if (!newQuote || !newAuthor) {
      alert("Please enter quote and author");
      return;
    }
    setQuotes([...quotes, { content: newQuote, author: newAuthor }]);
    setNewQuote("");
    setNewAuthor("");
  };

  const quote = quotes[current];

  const copyQuote = () => {
    navigator.clipboard.writeText(`${quote.content} — ${quote.author}`);
    alert("Quote copied!");
  };

  const tweetQuote = () => {
    const text = encodeURIComponent(`${quote.content} — ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className={`app ${dark ? "dark" : ""}`} style={{ background: bg }}>
      <div className="quote-box">
        <div className="top">
          <h1>Quote Generator</h1>
          <button className="mode" onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
        </div>

        <p className="quote-text">“{quote.content}”</p>
        <p className="quote-author">— {quote.author}</p>

        <button className="primary" onClick={nextQuote}>New Quote</button>

        <div className="actions">
          <button onClick={copyQuote}>📋 Copy</button>
          <button onClick={tweetQuote}>🐦 Tweet</button>
        </div>

        <hr />

        <h3>Add Your Own Quote</h3>
        <input placeholder="Quote" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} />
        <input placeholder="Author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
        <button className="primary" onClick={addQuote}>Add Quote</button>
      </div>
    </div>
  );
}
