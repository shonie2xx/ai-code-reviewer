import axios from 'axios';

export const reviewCode = async (code: string, language: string) => {
  const response = await axios.post('/api/review', { code, language });
  return response.data;
};
