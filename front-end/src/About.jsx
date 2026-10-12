import { useEffect, useState } from 'react'
import axios from 'axios'
import './About.css'

const About = () => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setError(false)

    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME || 'http://localhost:3000'}/about`, {
        signal: controller.signal,
      })
      .then(response => setAbout(response.data))
      .catch(err => {
        if (!axios.isCancel(err)) setError(true)
      })

    return () => controller.abort()
  }, [attempt])

  if (error) {
    return (
      <div role="alert">
        <p>The page could not load. Please try again.</p>
        <button onClick={() => setAttempt(attempt + 1)}>Try again</button>
      </div>
    )
  }

  if (!about) return <p role="status">Loading...</p>

  return (
    <section className="About">
      <h1>{about.title}</h1>
      {about.imageUrl && <img src={about.imageUrl} alt={about.imageAlt} />}
      {about.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  )
}

export default About
