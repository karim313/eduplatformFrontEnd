interface Video {
    title: string;
    videoUrl: string;
    duration: number;
    _id: string;
}

interface Playlist {
    title: string;
    videos: Video[];
    _id: string;
}

export interface CourseidI {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor: string;
    rating: number;
    reviews: number;
    hours: number;
    lessons: number;
    category: string;
    level: string;
    image: string;
    imageCover: string;
    tag: string;
    playlists: Playlist[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    videos: Video[];
}