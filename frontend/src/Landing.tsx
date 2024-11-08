import { useNavigate } from "react-router-dom";


export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#34581C] bg-[url('/img/bg.jpeg')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
            <div className="w-full max-w-md rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                    {/* <Icons.logo className="h-24 w-24 text-white" /> */}
                    <h1 className="text-4xl font-bold text-white">SavvyCircle</h1>
                </div>
                <p className="mt-4 text-xl font-medium text-white">
                    Chat, Save, Borrow, Thrive
                </p>
                <p className="mt-2 text-lg text-gray-200">
                    Lending Circles for Business
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}
                    className="mt-8 w-full transform bg-green-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-green-700"
                >
                    Get Started
                </button>
            </div>
        </main>
    );
}
