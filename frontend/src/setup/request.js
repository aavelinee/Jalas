// modules
import { create } from 'axios'

const server = 'http://localhost:3000'

export const { get, post } = create({
  baseURL: server
})
