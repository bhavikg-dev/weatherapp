export function hasSuccess(data) {
  if (data && typeof data.status !== 'undefined' && data.status === false) {
    return {
      data,
      error: data.message ? data.message : 'Something went wrong!',
      status: 0,
    };
  }

  return {data, error: false, status: 200};
}

export function hasError(error) {
  if (error === 'Network Error') {
    return {
      data: null,
      error: 'Please check your internet connection.',
      status: 0,
    };
  }

  return {
    error:
      error.data && error.data.message
        ? error.data.message
        : 'Something went wrong.',
    status: error.data && error.data.status ? error.data.status : 0,
    data: null,
  };
}
