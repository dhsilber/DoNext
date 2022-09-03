import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { DoData } from './DoData'

test('renders learn react link', () => {
  render(<App />)

  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('show repeating todos', () => {
  const dos = new DoData
  const first = dos.list[0].text
  const last = dos.list[dos.list.length-1].text

  render(<App />)

  screen.getByText(first)
  screen.getByText(last)
})
