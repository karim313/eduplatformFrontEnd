export interface EnrollDialogProps {
    courseId: string;
    courseTitle: string;
    price: number;
    isOpen: boolean;
    onClose: () => void;
}