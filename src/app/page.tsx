import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1>Japanese Learning App</h1>
          <ul className="nav-links">
            <li><Link href="/sign-in">Sign In</Link></li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <div className="card">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
            Learn Japanese
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
            Master Japanese vocabulary and grammar with our interactive learning platform
          </p>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Link href="/sign-in">
              <button className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
                Get Started
              </button>
            </Link>
          </div>

          <div className="grid">
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Learn Vocabulary</h3>
              <p style={{ color: '#666' }}>
                Build your Japanese vocabulary with common words and phrases
              </p>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Track Progress</h3>
              <p style={{ color: '#666' }}>
                Monitor your learning journey and celebrate your achievements
              </p>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Practice Daily</h3>
              <p style={{ color: '#666' }}>
                Consistent practice with spaced repetition for better retention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
