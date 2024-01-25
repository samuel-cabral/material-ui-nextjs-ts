import { promises as fsPromises } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export interface User {
  id: number
  name: string
}

const usersFilePath = path.join(process.cwd(), 'public/mocks/users.json')

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const searchedName = searchParams.get('name')

  const encodedUsersFileData = await fsPromises.readFile(usersFilePath, 'utf8')
  const usersList = JSON.parse(encodedUsersFileData).users as User[]

  if (searchedName) {
    const filteredUsers = usersList.filter((user) =>
      user.name.toLowerCase().includes(searchedName),
    )
    return NextResponse.json(filteredUsers)
  }

  return NextResponse.json([])
}
