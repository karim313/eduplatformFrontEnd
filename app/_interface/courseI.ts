// types/course.ts

export interface Video {
  _id: string
  title: string
  videoUrl: string
  duration: number // seconds
}

export interface Playlist {
  _id: string
  title: string
  videos: Video[]
}

export interface Course {
  _id: string
  title: string
  description: string
  price: number
  instructor: string
  rating: number
  reviews: number
  hours: number
  lessons: number
  category: string
  level: string
  image: string
  imageCover: string
  tag: string
  playlists: Playlist[]
  createdAt: string
  updatedAt: string
  __v: number
  videos: Video[]
}

export const SAMPLE_COURSE: Course = {
  instructor: "Admin Instructor",
  rating: 0,
  reviews: 0,
  hours: 0,
  lessons: 0,
  category: "General",
  level: "All Levels",
  image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
  imageCover: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
  tag: "",
  _id: "696c45bce443fe3acb34e936",
  title: "Advanced TypeScript",
  description: "Learn advanced TS concepts",
  price: 99.99,
  playlists: [
    {
      title: "Getting Started",
      videos: [
        {
          title: "Introduction",
          videoUrl: "https://www.youtube.com/watch?v=gICXsDDyOOA",
          duration: 600,
          _id: "696c4edae443fe3acb34e946"
        }
      ],
      _id: "696c4e31e443fe3acb34e93d"
    }
  ],
  createdAt: "2026-01-18T02:30:20.990Z",
  updatedAt: "2026-01-18T03:09:14.917Z",
  __v: 2,
  videos: []
}

export interface CoursesResponse {
  success: boolean
  count: number
  data: Course[]
}