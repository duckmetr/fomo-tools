import { api } from '@/api/instance'

class UsersService {
  async getMe() {
    const { data } = await api({
      method: 'POST',
      url: '/user/data/all',
      data: {}
    })

    return data
  }
}

export const usersService = new UsersService()
