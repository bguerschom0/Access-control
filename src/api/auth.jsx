// src/api/auth.jsx

export class DigestAuth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.nc = 0;
  }

  // Create MD5 hash
  _md5(str) {
    return crypto.createHash('md5')
      .update(str)
      .digest('hex');
  }

  // Parse WWW-Authenticate header
  parseAuthHeader(header) {
    const matches = header.match(/(\w+)="([^"]+)"/g);
    const params = {};

    matches?.forEach(match => {
      const [key, value] = match.split('=').map(s => s.replace(/"/g, ''));
      params[key.toLowerCase()] = value;
    });

    return {
      realm: params.realm,
      nonce: params.nonce,
      opaque: params.opaque,
      qop: params.qop,
    };
  }

  generateAuthResponse(method, uri, challenge) {
    this.nc++;
    const cnonce = Math.random().toString(36).substring(7);
    
    // Calculate hashes according to RFC 2617
    const ha1 = this._md5(`${this.username}:${challenge.realm}:${this.password}`);
    const ha2 = this._md5(`${method}:${uri}`);
    
    const ncString = ('00000000' + this.nc).slice(-8);
    const response = this._md5([
      ha1,
      challenge.nonce,
      ncString,
      cnonce,
      challenge.qop,
      ha2
    ].join(':'));

    return {
      username: this.username,
      realm: challenge.realm,
      nonce: challenge.nonce,
      uri,
      qop: challenge.qop,
      nc: ncString,
      cnonce,
      response,
      opaque: challenge.opaque
    };
  }

  formatAuthHeader(auth) {
    const parts = [
      `Digest username="${auth.username}"`,
      `realm="${auth.realm}"`,
      `nonce="${auth.nonce}"`,
      `uri="${auth.uri}"`,
      `qop=${auth.qop}`,
      `nc=${auth.nc}`,
      `cnonce="${auth.cnonce}"`,
      `response="${auth.response}"`,
      `opaque="${auth.opaque}"`
    ];

    return parts.join(', ');
  }
}
