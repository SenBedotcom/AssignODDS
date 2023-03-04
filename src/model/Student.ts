
enum House {
  Gryffindor = 'Gryffindor',
  Ravenclaw = 'Ravenclaw',
  Hufflepuff = 'Hufflepuff',
  Slytherin = 'Slytherin'
}

type HouseString = keyof typeof House;

export type Student = {
  id: string
  name: string
  house: string
  updatedAt: Date
  createdAt: Date
}
