export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">

      <div className="flex flex-col gap-6 text-center">

        <h1 className="text-4xl font-bold">
          Opero
        </h1>

        <p className="text-gray-500">
          Sistema de reservas para negocios
        </p>

        <div className="flex gap-4 justify-center">

          <a
            href="/login"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Login
          </a>

          <a
            href="/register"
            className="border px-6 py-2 rounded"
          >
            Register
          </a>

        </div>

      </div>

    </div>
  );
}