# Instructions 
- Add entrties to hosts file.
  - 127.0.0.1	myapp.com
  - 127.0.0.1	client-a.myapp.com
  - 127.0.0.1	client-b.myapp.com
  - 127.0.0.1	sso.myapp.com
  - 127.0.0.1	sso-hub.myapp.com
  - 127.0.0.1	externalapp.com
- npm install
- npm run build:all
- docker-compose up -d .

Note: once docker containers are running you can do changes and run a single build e.g `npm run build sso-ui`, then refresh sso.myapp.com.
