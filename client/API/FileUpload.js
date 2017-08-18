import axios from 'axios'
const BASE_API = 'http://localhost:3000/api/'

export const fileUpload = (file, VATexclude) => {
    let data = new FormData();
    data.append('file', file);
    data.append('exclude', VATexclude);

    const config = { headers: { 'Content-Type': undefined} };

    return axios.post(BASE_API + 'extract-vat-numbers', data, config);

}

