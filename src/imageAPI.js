import axios from 'axios';

export class ImageAPI {
  static BASE_URL = 'https://pixabay.com';
  static END_POINT = '/api/';

  constructor() {
    this.query = 'Default';
    this.page = 1;
    this.pageSize = 40;
    this.totalResults = 0;
  }

  fetchImages() {
    const url = ImageAPI.BASE_URL + ImageAPI.END_POINT;
    const params = {
      key: '42078504-06c0bc861c70afe486d8727f6',
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.pageSize,
    };

    return axios.get(url, { params }).then(response => response.data);
  }
}
