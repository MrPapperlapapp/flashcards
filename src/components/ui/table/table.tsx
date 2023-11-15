import s from './table.module.scss'

const data = [
  {
    cardsCount: 10,
    createdBy: 'John Doe',
    title: 'Project A',
    updated: '2023-07-07',
  },
  {
    cardsCount: 5,
    createdBy: 'Jane Smith',
    title: 'Project B',
    updated: '2023-07-06',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
]

export const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cards</th>
          <th>Last Updated</th>
          <th>Created by</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.title}>
            <td>{item.title}</td>
            <td>{item.cardsCount}</td>
            <td>{item.updated}</td>
            <td>{item.createdBy}</td>
            <td>icons...</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
