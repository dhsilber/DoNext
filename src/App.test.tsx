import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('prompts for ingest data', () => {
  render(<App />)

  const linkElement = screen.getByText("Ingest:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of data', () => {
  render(<App />)

  const linkElement = screen.getByText("Download")
  expect(linkElement).toBeInTheDocument()
})

// test('shows data in local storage', () => {
//   const dos = localStorage
//   const first = dos.list[0].text
//   const last = dos.list[dos.list.length - 1].text

//   render(<App />)

//   screen.getByText(first)
//   screen.getByText(last)
// })
