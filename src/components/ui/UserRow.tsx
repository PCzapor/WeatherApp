import useFavoritesSync from "components/hooks/useFavoritesSync"
import { useNotifications } from "components/hooks/useNotifications"
import { useDispatch } from "react-redux"
import { logout } from "store/features/user/userSlice"

const UserNotofication = () => {
  const notifications = useNotifications()

  return (
    <div className='dropdown mr-2'>
      <button
        type='button'
        className='btn btn-primary dropdown-toggle'
        data-toggle='dropdown'
      >
        Notifications{" "}
        <span className='badge badge-light'>{notifications.length}</span>
      </button>
      <div className='dropdown-menu dropdown-menu-right'>
        {notifications.length === 0 && (
          <span className='dropdown-item text-muted'>
            No news for your cities
          </span>
        )}
        {notifications.map((msg, i) => (
          <span key={i} className='dropdown-item'>
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}

const UserPanel = () => {
  useFavoritesSync()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout)
  }

  return (
    <div className='dropdown'>
      <img
        src='/User_Icon.png'
        alt='User Avatar'
        className='rounded-circle'
        style={{ width: "64px", height: "64px", cursor: "pointer" }}
        id='user-avatar'
        data-toggle='dropdown'
      />
      <div
        className='dropdown-menu dropdown-menu-right'
        aria-labelledby='user-avatar'
      >
        <a onClick={() => handleLogout()} className='dropdown-item' href='/'>
          Logout
        </a>
      </div>
    </div>
  )
}
export const UserRow = () => {
  return (
    <div className='d-flex w-100 mb-3 justify-content-end align-middle px-3'>
      <UserNotofication />
      <UserPanel />
    </div>
  )
}
