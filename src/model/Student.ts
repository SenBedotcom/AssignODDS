
export enum House {
  Gryffindor = 'Gryffindor',
  Ravenclaw = 'Ravenclaw',
  Hufflepuff = 'Hufflepuff',
  Slytherin = 'Slytherin'
}

export type Student = {
  id: string
  name: string
  house: string
  updatedAt: Date
  createdAt: Date
}
