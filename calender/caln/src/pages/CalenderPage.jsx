import { useState } from "react"
import CalendarHeader from "../components/CalenderHeader"
import CalendarGrid from "../components/CalenderGrid"

const CalendarPage = () => {

  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => (
      new Date(
        prev.getFullYear(),
        prev.getMonth() - 1,
        1
      )
    ))
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => (
      new Date(
        prev.getFullYear(),
        prev.getMonth() + 1,
        1
      )
    ))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      <div className="max-w-7xl mx-auto">

        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        <CalendarGrid
          currentDate={currentDate}
        />

      </div>

    </div>
  )
}

export default CalendarPage