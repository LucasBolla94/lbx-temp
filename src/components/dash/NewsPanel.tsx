'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'

type NewsPost = {
  title: string
  content: string
  date?: Date
}

export default function NewsPanel() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, 'news'), orderBy('date', 'desc'))
      const snapshot = await getDocs(q)
      const news = snapshot.docs.map((doc) => ({
        ...doc.data(),
        date: doc.data().date?.toDate(),
      })) as NewsPost[]

      setPosts(news)
    }

    fetchNews()
  }, [])

  const visiblePosts = showAll ? posts : posts.slice(0, 3)

  return (
    <div className="w-full max-w-md mx-auto space-y-4 text-white">
      <h2 className="text-lg font-semibold text-center mb-2">Latest News</h2>

      {visiblePosts.map((post, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-sm space-y-2"
        >
          <h3 className="text-md font-semibold text-green-400">{post.title}</h3>
          <p className="text-sm text-zinc-300 whitespace-pre-line">{post.content}</p>
          <div className="flex justify-between text-xs text-zinc-500 pt-1">
            <span>{post.date?.toLocaleDateString()}</span>
            <span className="font-semibold text-green-600">LBX Group</span>
          </div>
        </div>
      ))}

      {posts.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-sm text-green-400 underline hover:text-green-300 text-center"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}
