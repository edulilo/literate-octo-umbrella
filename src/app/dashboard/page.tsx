import Link from "next/link";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome back, {user.displayName || user.primaryEmail}!</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Continue your Japanese learning journey</p>

          <div className="grid">
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Today's Goal</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>6 out of 10 words reviewed</p>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Streak</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0070f3' }}>7 days</p>
              <p style={{ color: '#666' }}>Keep it up!</p>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Total Vocabulary</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0070f3' }}>124 words</p>
              <p style={{ color: '#666' }}>Learned so far</p>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Quick Practice</h2>
            <div className="grid">
              <Link href="/lessons/hiragana">
                <div className="card" style={{ cursor: 'pointer' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Hiragana</h3>
                  <p style={{ color: '#666' }}>Practice basic Japanese syllabary</p>
                </div>
              </Link>
              <Link href="/lessons/katakana">
                <div className="card" style={{ cursor: 'pointer' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Katakana</h3>
                  <p style={{ color: '#666' }}>Learn foreign word characters</p>
                </div>
              </Link>
              <Link href="/vocabulary">
                <div className="card" style={{ cursor: 'pointer' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Common Phrases</h3>
                  <p style={{ color: '#666' }}>Essential everyday expressions</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
