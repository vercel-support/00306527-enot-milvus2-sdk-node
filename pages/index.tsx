import { GetServerSideProps } from 'next'

interface HomeProps {
  result: string
}

export default function Home({ result }: HomeProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Milvus Example</h1>
      <pre className="p-4 bg-gray-100 rounded overflow-auto">
        {result}
      </pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Use the absolute URL when deploying to Vercel
    const protocol = process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https' : 'http'
    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost:3000'
    const response = await fetch(`${protocol}://${host}/api/milvus`)
    const data = await response.json()
    return {
      props: {
        result: JSON.stringify(data, null, 2),
      },
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      props: {
        result: 'An error occurred',
      },
    }
  }
}