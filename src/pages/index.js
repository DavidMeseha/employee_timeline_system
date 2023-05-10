import OptionsBar from "@/layouts/OptionsBar"
import TimeLineDisplay from "@/layouts/TimeLineDisplay"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      <nav>
        <OptionsBar />
      </nav>
      <main>
        <TimeLineDisplay />
      </main>
    </>
  )
}
