import React from 'react'
import { render, screen } from '@testing-library/react'
import EventThingy from './Event'

const data = [
  { text: "demo event", start: 1663025400000,     duration: 900000 },
  { text: "another event", start: 1663104600000, duration: 8220000 },
  { text: "third event", start: 1663112820000, duration: 780000 },
]

test('Renders single event', () => {
  render(<EventThingy index={0} events={data} />)

  expect(screen.getByText("Monday")).toBeInTheDocument()
  expect(screen.getByText(/19:30/)).toBeInTheDocument()
  expect(screen.getByText(/demo event/)).toBeInTheDocument()
  expect(screen.getByText(/19:45/)).toBeInTheDocument()
})

test('second of events on sequential days', () => {
  render(<EventThingy index={1} events={data} />)

  expect(screen.getByText("Tuesday")).toBeInTheDocument()
  expect(screen.getByText(/17:30/)).toBeInTheDocument()
  expect(screen.getByText(/another event/)).toBeInTheDocument()
})

test('event starting at end time of previous event', () => {
  render(<EventThingy index={2} events={data} />)

  expect(screen.getByText(/19:47/)).toBeInTheDocument()
  expect(screen.getByText(/third event/)).toBeInTheDocument()
  expect(screen.getByText(/20:00/)).toBeInTheDocument()
})
