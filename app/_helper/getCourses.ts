import { CoursesResponse } from "../_interface/courseI"

export async function getCourses(token: string | null) {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("https://educational-platform-api2-production-2097.up.railway.app/api/courses", {
            headers
        })

        const result: CoursesResponse = await response.json()
        return result
    }
    catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch courses" } as any
    }
}