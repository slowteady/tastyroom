import axios from 'axios';
import {Platform} from 'react-native';

export const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030',
  withCredentials: true,
});
