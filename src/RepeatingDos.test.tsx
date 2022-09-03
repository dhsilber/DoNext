import { render, screen } from '@testing-library/react'
import { DoData } from './DoData'
import RepeatingDos from './RepeatingDos'

it('show repeating todos', () => {
    const dos = new DoData
    const first = dos.list[0].text
    const last = dos.list[dos.list.length-1].text
  
    render(<RepeatingDos />)
  
    screen.getByText(first)
    screen.getByText(last)
  })
  