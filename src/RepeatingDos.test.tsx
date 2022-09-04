import { render, screen } from '@testing-library/react'
import { defaultData } from './App'
import RepeatingDos from './RepeatingDos'

it('show repeating todos', () => {
    const dos = defaultData
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text

    render(<RepeatingDos data={dos.todos}/>)

    screen.getByText(first)
    screen.getByText(last)
})
