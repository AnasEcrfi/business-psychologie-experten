"use client"

import * as React from "react"
import { Clock, Plus, X, Calendar, CalendarDays, Infinity } from "lucide-react"

export interface FixedTimeSlot {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  enabled: boolean
  durationType: 'forever' | 'weeks' | 'months' | 'until_date'
  durationValue?: number
  validUntil?: string // Date in YYYY-MM-DD format
}

interface FixedTimeSlotsProps {
  initialSlots?: FixedTimeSlot[]
  onSlotsChange?: (slots: FixedTimeSlot[]) => void
}

export function FixedTimeSlots({ initialSlots, onSlotsChange }: FixedTimeSlotsProps) {
  // Default slots: Monday 13-15, Tuesday 11-13
  const [slots, setSlots] = React.useState<FixedTimeSlot[]>(
    initialSlots || [
      { dayOfWeek: 1, startTime: "13:00", endTime: "15:00", enabled: true, durationType: 'forever' },
      { dayOfWeek: 2, startTime: "11:00", endTime: "13:00", enabled: true, durationType: 'forever' },
    ]
  )

  const weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

  const handleAddSlot = () => {
    const newSlot: FixedTimeSlot = {
      dayOfWeek: 3, // Wednesday as default
      startTime: "09:00",
      endTime: "11:00",
      enabled: true,
      durationType: 'forever'
    }
    const updatedSlots = [...slots, newSlot]
    setSlots(updatedSlots)
    onSlotsChange?.(updatedSlots)
  }

  const handleRemoveSlot = (index: number) => {
    const updatedSlots = slots.filter((_, i) => i !== index)
    setSlots(updatedSlots)
    onSlotsChange?.(updatedSlots)
  }

  const handleSlotChange = (index: number, field: keyof FixedTimeSlot, value: string | number | boolean) => {
    const updatedSlots = [...slots]
    updatedSlots[index] = { ...updatedSlots[index], [field]: value }
    setSlots(updatedSlots)
    onSlotsChange?.(updatedSlots)
  }

  // This function can be exported and used in the calendar component
  // const generateTimeSlotsForDate = (date: Date): string[] => {
  //   const dayOfWeek = date.getDay()
  //   const activeSlots = slots.filter(slot => slot.enabled && slot.dayOfWeek === dayOfWeek)
  //   
  //   const times: string[] = []
  //   activeSlots.forEach(slot => {
  //     const start = parseInt(slot.startTime.split(':')[0])
  //     const end = parseInt(slot.endTime.split(':')[0])
  //     
  //     for (let hour = start; hour < end; hour++) {
  //       times.push(`${hour.toString().padStart(2, '0')}:00`)
  //       times.push(`${hour.toString().padStart(2, '0')}:30`)
  //     }
  //   })
  //   
  //   return times
  // }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Feste Terminzeiten
        </h3>
        <button
          onClick={handleAddSlot}
          className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {slots.map((slot, index) => (
          <div key={index} className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800">
            <div className="flex flex-col gap-3">
              {/* First row: Day and time settings */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={slot.enabled}
                  onChange={(e) => handleSlotChange(index, 'enabled', e.target.checked)}
                  className="rounded border-gray-300 dark:border-zinc-600"
                />
                
                <select
                  value={slot.dayOfWeek}
                  onChange={(e) => handleSlotChange(index, 'dayOfWeek', parseInt(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                >
                  {weekDays.map((day, i) => (
                    <option key={i} value={i}>{day}</option>
                  ))}
                </select>

                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                />
                
                <span className="text-muted-foreground">bis</span>
                
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                />

                <button
                  onClick={() => handleRemoveSlot(index)}
                  className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              
              {/* Second row: Duration settings */}
              <div className="flex items-center gap-3 pl-7">
                <span className="text-sm text-gray-600 dark:text-gray-400">Gültig:</span>
                
                <select
                  value={slot.durationType}
                  onChange={(e) => handleSlotChange(index, 'durationType', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm"
                >
                  <option value="forever">Für immer</option>
                  <option value="weeks">Für X Wochen</option>
                  <option value="months">Für X Monate</option>
                  <option value="until_date">Bis zu einem Datum</option>
                </select>
                
                {slot.durationType === 'weeks' && (
                  <input
                    type="number"
                    min="1"
                    value={slot.durationValue || 4}
                    onChange={(e) => handleSlotChange(index, 'durationValue', parseInt(e.target.value))}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 w-20 text-sm"
                    placeholder="Wochen"
                  />
                )}
                
                {slot.durationType === 'months' && (
                  <input
                    type="number"
                    min="1"
                    value={slot.durationValue || 1}
                    onChange={(e) => handleSlotChange(index, 'durationValue', parseInt(e.target.value))}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 w-20 text-sm"
                    placeholder="Monate"
                  />
                )}
                
                {slot.durationType === 'until_date' && (
                  <input
                    type="date"
                    value={slot.validUntil || ''}
                    onChange={(e) => handleSlotChange(index, 'validUntil', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm"
                    min={new Date().toISOString().split('T')[0]}
                  />
                )}
                
                {slot.durationType === 'forever' && (
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Infinity className="w-4 h-4" />
                    Unbegrenzt
                  </span>
                )}
                
                {slot.durationType === 'weeks' && slot.durationValue && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (bis {new Date(Date.now() + slot.durationValue * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')})
                  </span>
                )}
                
                {slot.durationType === 'months' && slot.durationValue && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (bis {new Date(Date.now() + slot.durationValue * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-sm">
        <p className="font-medium mb-1">Hinweis:</p>
        <p>Diese festen Zeitfenster werden automatisch für die entsprechenden Wochentage angewendet.</p>
        <p className="mt-1">• <strong>Für immer:</strong> Die Zeiträume gelten unbegrenzt</p>
        <p>• <strong>Für X Wochen/Monate:</strong> Die Zeiträume gelten für den angegebenen Zeitraum</p>
        <p>• <strong>Bis zu einem Datum:</strong> Die Zeiträume gelten bis zum gewählten Datum</p>
      </div>
    </div>
  )
}