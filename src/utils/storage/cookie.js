const cookie = {
  get: name => {
    const pairs = document.cookie.split(';');
    const pair = pairs.find(pair => pair.includes(name));
    return pair ? pair.split('=').pop() : '';
  },
  set: (name, value, opts = {}) => {
    opts = { path: '/', ...opts };
    if (opts.expires) {
      opts.expires = new Date(opts.expires).toUTCString();
    }
    let newCookie = `${name}=${value}`;
    for (const key in opts) {
      newCookie += '; ' + `${key}=${opts[key]}`;
    }
    document.cookie = newCookie;
  },
  remove: key => {
    document.cookie = `${key}=; max-age=-1`;
  },
}

export {
  cookie as default,
  cookie
}
