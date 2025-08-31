
"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
export default function Home() {
const router = useRouter();
const handlenavigate = ()=>{
         toast("Navigating to Add School Page");
         router.push("/addSchool")
}
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <section className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">School Portal</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Easily manage school records, admissions, and much more with our
          modern system.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer" onClick={handlenavigate}>
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer">
            Learn More
          </button>
        </div>
      </section>

      {/* Image Section */}
      <section className="mt-10 w-full max-w-3xl">
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/schoolimage.jpg" 
            alt="School illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📚 Manage Records
          </h3>
          <p className="text-gray-600 text-sm">
            Keep track of student, teacher, and school details efficiently.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🏫 Easy Admissions
          </h3>
          <p className="text-gray-600 text-sm">
            Simplify the admission process with modern tools.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📊 Insights & Reports
          </h3>
          <p className="text-gray-600 text-sm">
            Generate detailed reports to make better decisions.
          </p>
        </div>
      </section>
    </div>
  );
}