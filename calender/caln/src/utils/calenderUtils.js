export const getCalendarDays = (currentDate) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
  
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
  
    const startDay = firstDay.getDay()
    const totalDays = lastDay.getDate()
  
    const days = []
  
    // Previous month's dates
    const previousMonthLastDate = new Date(year, month, 0).getDate()
  
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthLastDate - i),
        isCurrentMonth: false,
      })
    }
  
    // Current month's dates
    for (let day = 1; day <= totalDays; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      })
    }
  
    // Next month's dates
    const remainingDays = 42 - days.length
  
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      })
    }
  
    return days
  }