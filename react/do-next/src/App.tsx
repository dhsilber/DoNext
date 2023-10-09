import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom"
import DoNext from './DoNext'
import RepeatingDos from './todo/RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './event/Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { MinuteMilliseconds, TodoStorageKey } from './Constants'
import Projects from './project/Projects'
import Tracks from './track/Tracks'
import Tasks from './task/Tasks'
import Analyze from './analyze/Analyze'
import Edit from './Edit'

function App() {
  return <>
  <div>
  <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<DoNext />} />
        <Route path="edit" element={<Edit />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </div>                                                  
  </>
}

export default App
