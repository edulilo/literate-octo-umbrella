import Link from "next/link";
import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

const lessons = [
  {
    id: "hiragana",
    title: "Hiragana Basics",
    description: "Learn the fundamental Japanese syllabary used for native words",
    level: "Beginner",
    duration: "20 min",
  },
  {
    id: "katakana",
    title: "Katakana Basics",
    description: "Master the syllabary used for foreign words and emphasis",
    level: "Beginner",
    duration: "20 min",
  },
  {
    id: "greetings",
    title: "Common Greetings",
    description: "Essential phrases for everyday interactions",
    level: "Beginner",
    duration: "15 min",
  },
  {
    id: "numbers",
    title: "Numbers and Counting",
    description: "Learn Japanese numbers and how to count",
    level: "Beginner",
    duration: "25 min",
  },
  {
    id: "food",
    title: "Food Vocabulary",
    description: "Words and phrases for restaurants and cooking",
    level: "Intermediate",
    duration: "30 min",
  },
  {
    id: "verbs",
    title: "Basic Verbs",
    description: "Common action words and conjugation patterns",
    level: "Intermediate",
    duration: "35 min",
  },
];

export default async function Lessons() {
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
            <h1>Lessons</h1>
            <p>Choose a lesson to start learning</p>
          </div>

          <div className="grid">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="card">
                <h3 style={{ marginBottom: '0.5rem' }}>{lesson.title}</h3>
                <p style={{ color: '#666', marginBottom: '1rem', minHeight: '3rem' }}>
                  {lesson.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: lesson.level === 'Beginner' ? '#e3f2fd' : '#fff3e0',
                    color: lesson.level === 'Beginner' ? '#1976d2' : '#f57c00',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {lesson.level}
                  </span>
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>{lesson.duration}</span>
                </div>
                <Link href={`/lessons/${lesson.id}`}>
                  <button className="btn btn-primary" style={{ width: '100%' }}>Start Lesson</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
