class CustomException extends Error {
  constructor(error) {
    super(error);
    this.message = 'CustomException';
    this.data = error.data;
    this.status = error.status;
    this.url = error.url;
    this.statusText = error.statusText;
  }
}

export default CustomException;
