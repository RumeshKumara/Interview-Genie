import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-6xl font-bold ">
        InterviewGenie
      </h1>
      <p className="text-lg tracking-wider text-gray-700">
        Your AI-powered interview preparation assistant
      </p>
      <div className="mt-4 ">
        <Button className="bg-[#5100ff] px-8 py-6 rounded-3xl text-white hover:bg-[#6f2dff] transition duration-300 ease-in-out">
          Get Started
          <ArrowRight className="inline w-4 h-4" />
        </Button>
        <Button variant="outline" className="py-6 px-6 ml-4 rounded-4xl text-[#5100ff] border-[#5100ff] hover:bg-[#5100ff] hover:text-white transition duration-300 ease-in-out">
          Learn More
        </Button>
      </div>

    </div>
  );
}
