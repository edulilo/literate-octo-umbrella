import Link from "next/link";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

const hiraganaChars = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
];

export default async function HiraganaLesson() {
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
            <h1>Hiragana Basics</h1>
            <p>Learn the fundamental Japanese syllabary</p>
          </div>

          <div className="card" style={{ backgroundColor: '#f8f9fa', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>About Hiragana</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Hiragana is one of the three writing systems in Japanese. It consists of 46 basic characters,
              each representing a syllable. Hiragana is primarily used for native Japanese words and grammatical elements.
            </p>
          </div>

          <h2 style={{ marginBottom: '1.5rem' }}>Basic Characters</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {hiraganaChars.map((item, index) => (
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
