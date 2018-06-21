# install instructions

* run `npm install`;
* run `npm install nodemon -g`;
* run `mkdir -p public/files/` at project root
* run `dd if=/dev/zero of=public/files/file.dmz  bs=1000M  count=1` at project root
* run `DEBUG=myapp:* npm run watch`

go to `http://localhost:3000` and click link and watch
