import { useDispatch, useSelector } from 'react-redux'
import { toggleDisabledOf } from '../reducers/userReducer'

const User = ({ user, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {user.username}
    </li>
  )
}

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ filter, users }) => {
    if (filter === 'ALL') {
      return users
    }
    return filter === 'ADMIN'
      ? users.filter(user => user.administartor)
      : users.filter(user => !user.administartor)
  })

  return (
    <ul>
      {users.map(user =>
        <User
          key={user.id}
          user={user}
          handleClick={() =>
            dispatch(toggleDisabledOf(user.id))
          }
        />
      )}
    </ul>
  )
}

export default Users