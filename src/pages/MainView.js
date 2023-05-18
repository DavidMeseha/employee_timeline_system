import OptionsBar from "../layouts/OptionsBar"
import TimeLineDisplay from "../layouts/TimeLineDisplay"

export default function Home() {
  return (
    <>
      <nav>
        <OptionsBar />
      </nav>
      <main>
        <TimeLineDisplay />
      </main>
    </>
  )
}
