import Image from "next/image";

export default function Home() {

  return <div className="px-6 py-16 max-w-6xl mx-auto">
      
    
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to ManageNote
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          This project is built using Next.js and Tailwind CSS.  
          It focuses on creating a clean, responsive, and modern web
          experience while keeping the code simple and maintainable.
        </p>
      </section>

     
       <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Fast Performance
          </h3>
          <p className="text-gray-600">
            Next.js optimizes your application with server-side rendering
            and smart caching for blazing fast load times.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Modern UI
          </h3>
          <p className="text-gray-600">
            Tailwind CSS helps you build responsive and elegant interfaces
            quickly without writing custom CSS.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Easy to Scale
          </h3>
          <p className="text-gray-600">
            The component-based structure makes it easy to grow this project
            into a full-featured application.
          </p>
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Cloud Database (NeonDB)
          </h3>
          <p className="text-gray-600">
            We use NeonDB — a serverless PostgreSQL database that scales
            automatically, supports branching, and works perfectly with
            modern full-stack applications.
          </p>
        </div>

      </section>
    </div>

}