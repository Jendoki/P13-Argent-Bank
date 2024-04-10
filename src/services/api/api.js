import axios from 'axios';

// POST /user/login
const login = async (email, password) => {
  const { data } = await axios.post('http://localhost:3001/api/v1/user/login', { email, password })
  return data.body.token;
}

// POST ​/user​/profile
const getUserProfile = async (token) => {
  const { data } = await axios.post('http://localhost:3001/api/v1/user/profile',
    {
      key: "value",
    }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return data.body;
}

// PUT ​/user​/profile
const updateUserProfile = async (firstname, lastname, token) => {
  const { data } = await axios.put('http://localhost:3001/api/v1/user/profile',
    {
      "firstName": firstname,
      "lastName": lastname
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  return data.body;
}

export { login, getUserProfile, updateUserProfile };