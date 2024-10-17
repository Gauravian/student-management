import React from 'react'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{},
    devTools: true
})

export default store