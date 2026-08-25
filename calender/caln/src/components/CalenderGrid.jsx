import { getCalendarDays } from "../utils/calenderUtils"

const CalendarGrid = ({ currentDate }) => {

  const days = getCalendarDays(currentDate)

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]

  return (
    <div>

      {/* Week Days */}

      <div className="grid grid-cols-7 border">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center font-semibold border-r"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}

      <div className="grid grid-cols-7 border-l">

        {days.map((item, index) => (

          <div
            key={index}
            className={`
              min-h-24
              p-2
              border-r
              border-b
              ${
                item.isCurrentMonth
                  ? "bg-white"
                  : "bg-gray-100 text-gray-400"
              }
            `}
          >

            <span className="text-sm font-medium">
              {item.date.getDate()}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default CalendarGrid