import API from './api';

interface loginType {
  username: string,
  password: string,
}

interface registerType {
  username: string,
  password: string,
  email: string,
  nickname: string,
}

const userService = {
  fetchMe: async(token: string) => {
    return API.callWithAuth('/wp/v2/users/me', undefined, "GET", token)
  },
  uploadMedia: async(data = {}, token: string,) => {
    return API.callWithAuth('/wp/v2/media', data, 'POST', token, true)
  },
  uploadProfile: async(description: string, avaId: any, token: string) => {
    return API.callWithAuthJson('/wp/v2/users/me', {
      description,
      simple_local_avatar: {
        media_id: avaId
      }
    }, 'PUT', token, false)
  },
  changePassword: async(password: string, newPassword: string, confirmNewPassword: string, token: string) => {
    return API.callWithAuthJson('/wp/v2/users/password', {
      password,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword
    }, 'PUT', token, false)
  }
};

export default userService;
