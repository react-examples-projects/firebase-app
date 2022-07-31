import { useContext } from 'react'
import UserSessionContext from '../context/UserSession'

export default function useUser() {
  const data = useContext(UserSessionContext)
  return data;
}
