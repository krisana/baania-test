import axios from "../axios.config";

export async function getHomes() {
  try {
    // const request = `firstname=${data.firstname}&lastname=${data.lastname}&licenseNo=${data.licenseNo}&idCard=${data.idCard}`;
    const response = await axios.get('/home?take=100');
    console.log('getHomes --> response', response)
    return response;
  } catch (e) {
    return e.response;
  }
}

export async function getPostCodeDetail(postCodeValue) {
  try {
    // const request = `firstname=${data.firstname}&lastname=${data.lastname}&licenseNo=${data.licenseNo}&idCard=${data.idCard}`;
    const response = await axios.get('/postCode/' + postCodeValue);
    console.log('getPostCodeDetail --> response', response)
    return response;
  } catch (e) {
    return e.response;
  }
}

export async function createHome(data) {
  try {
      const response = await axios.post('/home', {
          name: data.name,
          desc: data.desc,
          post_code: data.post_code,
          price: data.price,
        }
      );
      return response;
  } catch (e) {
      return e.response;
  }
}

export async function updateHome(data) {
  try {
      const response = await axios.patch('/home/' + data.id, {
          id: data.id,
          name: data.name,
          desc: data.desc,
          post_code: data.post_code,
          price: data.price,
        }
      );
      return response;
  } catch (e) {
      return e.response;
  }
}

export async function deleteHome(data) {
  try {
      const response = await axios.delete('/home/' + data.id);
      return response;
  } catch (e) {
      return e.response;
  }
}