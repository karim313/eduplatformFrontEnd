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

export interface MyCourse {
    _id: string;
    title: string;
    description: string;
    price: number;
    playlists: Playlist[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MyCoursesResponse {
    success: boolean;
    count: number;
    data: MyCourse[];
}
