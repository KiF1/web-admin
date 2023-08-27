/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    KEY_API_TRELLO: '9fd76f90889801293926365bb2803353', 
    TOKEN_API_TRELLO: 'ATTAa4c7db955dddbe4d720f01775c9f89883f0d6c7ccd2b55a7126d9814fc93c85745A55453'
  },
  resolve: {
    preferRelative: true,
  },
  images: {
    domains: [
      'd2k1ftgv7pobq7.cloudfront.net',
      'trello-backgrounds.s3.amazonaws.com',
      'trello-members.s3.amazonaws.com',
      'imagemumu.imgix.net'
    ]
  }
};