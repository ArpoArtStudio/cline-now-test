"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface AuctionEvent {
  id: number
  title: string
  artist: string
  startTime: Date
  endTime: Date
  startingBid: string
  status: "upcoming" | "live" | "ended"
}

interface AuctionCalendarProps {
  onClose: () => void
  isDark: boolean
}

export default function AuctionCalendar({ onClose, isDark }: AuctionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"week" | "month" | "year">("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock auction events - in real app, this would come from your database/API
  const [auctionEvents] = useState<AuctionEvent[]>([
    {
      id: 1,
      title: "Digital Dreams: Neon Cityscape",
      artist: "FutureMuse",
      startTime: new Date(2024, 0, 15, 14, 0), // Jan 15, 2024, 2:00 PM
      endTime: new Date(2024, 0, 17, 16, 0), // Jan 17, 2024, 4:00 PM
      startingBid: "1.0 ETH",
      status: "live",
    },
    {
      id: 2,
      title: "Abstract Consciousness",
      artist: "VisionaryArt",
      startTime: new Date(2024, 0, 18, 10, 0), // Jan 18, 2024, 10:00 AM
      endTime: new Date(2024, 0, 20, 12, 0), // Jan 20, 2024, 12:00 PM
      startingBid: "1.0 ETH",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Matrix Reality",
      artist: "CyberVision",
      startTime: new Date(2024, 0, 22, 16, 0), // Jan 22, 2024, 4:00 PM
      endTime: new Date(2024, 0, 24, 18, 0), // Jan 24, 2024, 6:00 PM
      startingBid: "0.8 ETH",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Ocean Wave Dynamics",
      artist: "NatureTech",
      startTime: new Date(2024, 0, 25, 12, 0), // Jan 25, 2024, 12:00 PM
      endTime: new Date(2024, 0, 27, 14, 0), // Jan 27, 2024, 2:00 PM
      startingBid: "1.2 ETH",
      status: "upcoming",
    },
  ])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return auctionEvents.filter((event) => {
      const eventDate = new Date(event.startTime)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const navigateYear = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setFullYear(prev.getFullYear() - 1)
      } else {
        newDate.setFullYear(prev.getFullYear() + 1)
      }
      return newDate
    })
  }

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Day headers
    const dayHeaders = dayNames.map((day) => (
      <div key={day} className={`p-2 text-center text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {day}
      </div>
    ))

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const events = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      days.push(
        <div
          key={day}
          className={`p-2 min-h-[80px] border cursor-pointer transition-colors ${
            isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"
          } ${isToday ? (isDark ? "bg-gray-800" : "bg-blue-50") : ""} ${
            isSelected ? (isDark ? "bg-blue-900" : "bg-blue-100") : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div
            className={`text-sm font-semibold mb-1 ${isDark ? "text-white" : "text-black"} ${isToday ? "text-blue-600" : ""}`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.status === "live"
                    ? "bg-green-500 text-white"
                    : event.status === "upcoming"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-500 text-white"
                }`}
              >
                {event.title}
              </div>
            ))}
            {events.length > 2 && (
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>+{events.length - 2} more</div>
            )}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        {dayHeaders}
        {days}
      </div>
    )
  }

  const renderWeekView = () => {
    // Simplified week view - would need more complex logic for full implementation
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const events = getEventsForDate(day)
          return (
            <div key={index} className={`p-4 border rounded-lg ${isDark ? "border-gray-600" : "border-gray-300"}`}>
              <div className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
                {day.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
              </div>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-2 rounded ${
                      event.status === "live"
                        ? "bg-green-500 text-white"
                        : event.status === "upcoming"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                    }`}
                  >
                    <div className="font-semibold">{event.title}</div>
                    <div>{event.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderYearView = () => {
    const months = []
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(currentDate.getFullYear(), month, 1)
      const monthEvents = auctionEvents.filter((event) => {
        return event.startTime.getFullYear() === currentDate.getFullYear() && event.startTime.getMonth() === month
      })

      months.push(
        <div
          key={month}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            isDark ? "border-gray-600 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => {
            setCurrentDate(monthDate)
            setView("month")
          }}
        >
          <div className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
            {monthDate.toLocaleDateString("en-US", { month: "long" })}
          </div>
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {monthEvents.length} auction{monthEvents.length !== 1 ? "s" : ""}
          </div>
        </div>,
      )
    }

    return <div className="grid grid-cols-3 gap-4">{months}</div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <div className="flex items-center space-x-4">
            <CalendarIcon className={`h-6 w-6 ${isDark ? "text-white" : "text-black"}`} />
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Auction Calendar</h2>
          </div>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Controls */}
        <div className={`flex justify-between items-center p-4 border-b ${isDark ? "border-white" : "border-black"}`}>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => (view === "year" ? navigateYear("prev") : navigateMonth("prev"))}
              variant="outline"
              className={`${isDark ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black" : "bg-white border-black text-black hover:bg-black hover:text-white"} rounded-lg`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
              {view === "year"
                ? currentDate.getFullYear()
                : currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <Button
              onClick={() => (view === "year" ? navigateYear("next") : navigateMonth("next"))}
              variant="outline"
              className={`${isDark ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black" : "bg-white border-black text-black hover:bg-black hover:text-white"} rounded-lg`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            {["week", "month", "year"].map((viewType) => (
              <Button
                key={viewType}
                onClick={() => setView(viewType as "week" | "month" | "year")}
                className={`${
                  view === viewType
                    ? isDark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : isDark
                      ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black"
                      : "bg-white border-black text-black hover:bg-black hover:text-white"
                } rounded-lg capitalize`}
              >
                {viewType}
              </Button>
            ))}
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {view === "month" && renderMonthView()}
          {view === "week" && renderWeekView()}
          {view === "year" && renderYearView()}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className={`p-4 border-t ${isDark ? "border-white" : "border-black"}`}>
            <h4 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border ${isDark ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-50"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>{event.title}</h5>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>by {event.artist}</p>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {event.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} -
                        {event.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          event.status === "live"
                            ? "bg-green-500 text-white"
                            : event.status === "upcoming"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                        } rounded-lg mb-1`}
                      >
                        {event.status}
                      </Badge>
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"}`}>
                        Starting: {event.startingBid}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  No auctions scheduled for this date.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
