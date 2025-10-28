import Link from "next/link";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

const vocabulary = [
  { japanese: "こんにちは", romaji: "konnichiwa", english: "Hello", category: "Greetings" },
  { japanese: "ありがとう", romaji: "arigatou", english: "Thank you", category: "Greetings" },
  { japanese: "おはよう", romaji: "ohayou", english: "Good morning", category: "Greetings" },
  { japanese: "さようなら", romaji: "sayounara", english: "Goodbye", category: "Greetings" },
  { japanese: "すみません", romaji: "sumimasen", english: "Excuse me", category: "Greetings" },
  { japanese: "はい", romaji: "hai", english: "Yes", category: "Basic" },
  { japanese: "いいえ", romaji: "iie", english: "No", category: "Basic" },
  { japanese: "おいしい", romaji: "oishii", english: "Delicious", category: "Food" },
  { japanese: "みず", romaji: "mizu", english: "Water", category: "Food" },
  { japanese: "たべる", romaji: "taberu", english: "To eat", category: "Verbs" },
  { japanese: "のむ", romaji: "nomu", english: "To drink", category: "Verbs" },
  { japanese: "いく", romaji: "iku", english: "To go", category: "Verbs" },
];

export default async function Vocabulary() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1>Japanese Learning App</h1>
          <ul className="nav-links">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/lessons">Lessons</Link></li>
            <li><Link href="/vocabulary">Vocabulary</Link></li>
            <li>
              <Link href="/handler/sign-out">
                <button className="btn btn-secondary">Sign Out</button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <div className="card">
          <div className="lesson-header">
            <h1>Vocabulary List</h1>
            <p>Common Japanese words and phrases</p>
          </div>

          {vocabulary.map((word, index) => (
            <div key={index} className="vocabulary-item">
              <div className="japanese-text">{word.japanese}</div>
              <div className="romaji">{word.romaji}</div>
              <div className="translation">{word.english}</div>
              <p style={{ textAlign: 'center', color: '#999', fontSize: '0.875rem' }}>
                Category: {word.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
