const CalendarHeader = ({
    currentDate,
    onPreviousMonth,
    onNextMonth,
    onToday,
  }) => {
  
    const monthName = currentDate.toLocaleString("default", {
      month: "long",
    })
  
    const year = currentDate.getFullYear()
  
    return (
      <div className="flex items-center justify-between mb-6">
  
        <button
          onClick={onPreviousMonth}
          className="px-4 py-2 border rounded-lg"
        >
          ←
        </button>
  
        <div className="flex items-center gap-4">
  
          <h2 className="text-2xl font-bold">
            {monthName} {year}
          </h2>
  
          <button
            onClick={onToday}
            className="px-3 py-1 border rounded-lg"
          >
            Today
          </button>
  
        </div>
  
        <button
          onClick={onNextMonth}
          className="px-4 py-2 border rounded-lg"
        >
          →
        </button>
  
      </div>
    )
  }
  
  export default CalendarHeader