import axios from 'axios';

const API_URL = "https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/folders";

export const getFolder = async () => {
try {
    const res = await axios.get(API_URL);
    return res.data;

} catch(error){
    throw new Error('Failed to fetch folders');
}
}

export const createFolder = async (name) => {
    try {
        const res = await axios.post(API_URL, name);
        return res.data;
    } catch(error) {
        throw new Error('Failed to fetch folders');

    }
}

export const deleteFolder = async (id) => {
    try {
         const res = await axios.delete(`${API_URL}/${id}`);
         console.log(res)
         return res.data;
    } catch {
        throw new Error('Failed to delete folder');

    }
}
