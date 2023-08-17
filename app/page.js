import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <h1 className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello world!
      </h1>
      <Posts />
    </main>
  )
}
