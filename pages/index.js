import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Checking API...')

  useEffect(() => {
    // The API address comes from an environment variable, not hard-coded
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      setApiStatus('NEXT_PUBLIC_API_URL is not set')
      return
    }

    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => setApiStatus(`API status: ${data.status}`))
      .catch((err) => setApiStatus(`Could not reach the API (${err.message})`))
  }, [])

  return (
    <div className="container">
      <Head>
        <title>DevOps Sandbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Suvethii's DevOps Sandbox" />
        <p className="description">{apiStatus}</p>
      </main>

      <Footer />
    </div>
  )
}