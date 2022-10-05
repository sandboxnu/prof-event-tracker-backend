const { PrismaClient } = require('@prisma/client')

let prisma = new PrismaClient()

/**
 * 
 * 
 *   id            Int            @id @default(autoincrement())
  email         String         @unique
  firstName     String
  lastName      String
  preferredName String?
  role          Role           @default(FACULTY)

 */

const EXAMPLE_USERS = [
    {
        email: "a@a.com",
        firstName: "Dave",
        lastName: "Dog",
        role: "FACULTY"
    },
    {
        email: "a2@a.com",
        firstName: "Bob",
        lastName: "Patel",
        role: "DEAN"
    },
    {
        email: "a3@a.com",
        firstName: "Roger",
        lastName: "Wow",
        preferredName: "Rob",
        role: "FACULTY"
    },
    {
        email: "a4@a.com",
        firstName: "Mark",
        lastName: "Sivak",
        preferredName: "Mark",
        role: "MERIT_COMMITTEE_HEAD"
    },
    {
        email: "a5@a.com",
        firstName: "Diego",
        lastName: "Hernandez",
        role: "MERIT_COMMITTEE_MEMBER"
    },
]

function createUsers( arr ) {
    arr.forEach(user => {
        prisma.user.create({data: user})
        .then(u => console.table(u))
    })
}

createUsers(EXAMPLE_USERS)