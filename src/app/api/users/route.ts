import { promises as fsPromises } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'public/mocks/users.json')

export async function GET() {
  const users = await fsPromises.readFile(usersFilePath, 'utf8')
  const usersJSON = JSON.parse(users)
  return NextResponse.json(usersJSON)
}
