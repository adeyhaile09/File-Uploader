import http from '../http-common';

const getAll = () => {
  return http.get('/uploads');
};

const DataService = {
  getAll,
};

export default DataService();
