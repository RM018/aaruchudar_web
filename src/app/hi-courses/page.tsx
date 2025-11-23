import HICourses from "@/components/HICourses";
import Chatbot from "@/components/Chatbot";

export default function CoursesPage() {
  return (
    <main className="overflow-hidden flex justify-center items-center w-full">
      <div className="w-full flex justify-center">
        <HICourses />
      </div>
      <Chatbot />
    </main>
  );
}