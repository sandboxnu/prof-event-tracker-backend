// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

// async function main() {
//   // create two dummy articles
//   const post1 = await prisma.article.upsert({
//     where: { title: 'Prisma Adds Support for MongoDB' },
//     update: {},
//     create: {
//       title: 'Prisma Adds Support for MongoDB',
//       body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
//       description:
//         "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
//       published: false,
//     },
//   });

//   const post2 = await prisma.article.upsert({
//     where: { title: "What's new in Prisma? (Q1/22)" },
//     update: {},
//     create: {
//       title: "What's new in Prisma? (Q1/22)",
//       body: 'Our engineers have been working hard, issuing new releases with many improvements...',
//       description:
//         'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
//       published: true,
//     },
//   });

//   console.log({ post1, post2 });
// }



async function main() {
    // prisma.<table>.upsert updates data that matches the where clause

    const user1 = await prisma.user.upsert({
        where:{email: "a@b.com"},
        update: {},
        create: {
            email: "a@b.com",
            firstName:"Dave",
            lastName: "Dog",
            role: "FACULTY"
        }
    })

    const user2 = await prisma.user.upsert({
        where: {email: "a2@b.com"},
        update: {},
        create: {
            email: "a2@b.com",
            firstName: "Bob",
            lastName: "Patel",
            role: "DEAN"
        }
    })

    const user3 = await prisma.user.upsert({
        where: {email: "a3@b.com"},
        update: {},
        create: {
            email: "a3@b.com",
            firstName: "Roger",
            lastName: "Wow",
            preferredName: "Rob",
            role: "FACULTY"
        }
    })

    const user4 = await prisma.user.upsert({
        where: {email: "a4@b.com"},
        update: {},
        create: {
            email: "a4@b.com",
            firstName: "Mark",
            lastName: "Sivak",
            preferredName: "Mark",
            role: "MERIT_COMMITTEE_HEAD"
        }
    })

    const user5 = await prisma.user.upsert({
        where: {email: "a5@b.com"},
        update: {},
        create: {
            email: "a5@b.com",
            firstName: "Diego",
            lastName: "Hernandez",
            role: "MERIT_COMMITTEE_MEMBER"
        }
    })

    const user6 = await prisma.user.upsert({
        where: {email: "a6@b.com"},
        update: {},
        create: {
            email: "a6@b.com",
            firstName: "Ben",
            lastName: "Lerner",
            preferredName: "Blerner",
            role: "FACULTY"
        }
    })

    const user7 = await prisma.user.upsert({
        where: {email: "a7@b.com"},
        update: {},
        create: {
            email: "a7@b.com",
            firstName: "Christina",
            lastName: "Long",
            preferredName: "Hatsune Miku",
            role: "MERIT_COMMITTEE_MEMBER"
        }
    })

    const user8 = await prisma.user.upsert({
        where: {email: "a8@b.com"},
        update: {},
        create: {
            email: "a8@b.com",
            firstName: "Jeffery",
            lastName: "Hopkins",
            preferredName: "Jeff",
            role: "FACULTY"
        }
    })

    const user9 = await prisma.user.upsert({
        where: {email: "a9@b.com"},
        update: {},
        create: {
            email: "a9@b.com",
            firstName: "John",
            lastName: "Appleseed",
            role: "FACULTY"
        }
    })

    const activity1 = await prisma.activity.upsert({
        where: {id: 1},
        update: {},
        create: {
            user: {
                connect: {
                    id: user1.id
                }
            },
            academicYear: {
                create: {
                    startDate: new Date(),
                    endDate: new Date()
                }
            },
            date: new Date(),
            name: "Taught Course",
            description: "Led the the course intro to design, for over for 200 students",
            category: "TEACHING",
            significance: "MAJOR",
            isFavorite: false

        }

    })


    const activity2 = await prisma.activity.upsert({
        where: {id: activity1.id + 1},
        update: {},
        create: {
            user: {
                connect: {
                    id: user3.id
                }
            },
            academicYear: {
                create: {
                    startDate: new Date('2020-04-20T21:23:57.736Z'),
                    endDate: new Date('2021-04-20T21:23:57.736Z')
                }
            },
            date: new Date('2020-11-20T21:23:57.736Z'),
            name: "Client Project",
            description: "completed the client design project for Autodesk",
            category: "SERVICE",
            significance: "SIGNIFICANT",
            isFavorite: false

        }

    })

    const activity3 = await prisma.activity.upsert({
        where: {id: activity2.id + 1},
        update: {},
        create: {
            user: {
                connect: {
                    id: user6.id
                }
            },
            academicYear: {
                create: {
                    startDate: new Date('2022-07-20T21:23:57.736Z'),
                    endDate: new Date('2023-06-20T21:23:57.736Z')
                }
            },
            date: new Date('2022-11-20T21:23:57.736Z'),
            name: "Directed Study",
            description: "Animation simulation using Houdini",
            category: "RESEARCH",
            significance: "MINOR",
            isFavorite: false

        }

    })

    const activity4 = await prisma.activity.upsert({
        where: {id: activity3.id + 1},
        update: {},
        create: {
            user: {
                connect: {
                    id: user8.id
                }
            },
            academicYear: {
                create: {
                    startDate: new Date('2022-07-20T21:23:57.736Z'),
                    endDate: new Date('2023-06-20T21:23:57.736Z')
                }
            },
            date: new Date('2022-08-20T21:23:57.736Z'),
            name: "New Course",
            description: "ARTG 5240",
            category: "TEACHING",
            significance: "MAJOR",
            isFavorite: true

        }

    })

    const activity5 = await prisma.activity.upsert({
        where: {id: activity4.id + 1},
        update: {},
        create: {
            user: {
                connect: {
                    id: user1.id
                }
            },
            academicYear: {
                create: {
                    startDate: new Date('2022-07-20T21:23:57.736Z'),
                    endDate: new Date('2023-06-20T21:23:57.736Z')
                }
            },
            date: new Date('2022-10-20T21:23:57.736Z'),
            name: "Field Trip",
            description: "led a field trip to the MFA",
            category: "TEACHING",
            significance: "SIGNIFICANT",
            isFavorite: false

        }

    })




    console.log({ user1, user2, user3, user4, user5, user6, user7, user8, user9})
    console.log({activity1, activity2, activity3, activity4, activity5})
    
}


// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });


// code from: https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#seed-the-database 