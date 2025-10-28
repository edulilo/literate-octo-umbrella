import Link from "next/link";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

const katakanaChars = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
];

export default async function KatakanaLesson() {
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
            <h1>Katakana Basics</h1>
            <p>Master the syllabary for foreign words</p>
          </div>

          <div className="card" style={{ backgroundColor: '#f8f9fa', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>About Katakana</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Katakana is primarily used for foreign words, loanwords, onomatopoeia, and emphasis.
              Each katakana character has the same sound as its hiragana counterpart, but with different shapes.
              It's essential for reading modern Japanese text.
            </p>
          </div>

          <h2 style={{ marginBottom: '1.5rem' }}>Basic Characters</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {katakanaChars.map((item, index) => (
              <div key={index} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.char}</div>
                <div style={{ color: '#666', fontSize: '1rem' }}>{item.romaji}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/lessons">
              <button className="btn btn-secondary">Back to Lessons</button>
            </Link>
            <button className="btn btn-primary">Practice Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
}
