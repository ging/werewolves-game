#werewolves-game

This is a demo of werewolves online game. It is based on Licode.

### Dependencies

- node.js
- npm
- git

### How to install

<pre>
git clone https://github.com/ging/licode-demos.git
cd licode-demos
npm install
cp config.js.template config.js
</pre>

### How to configure

Edit config.js file.

- nuve_host: where nuve REST API is listening
- service: credentials of the service you want to use
- demo_host: host where this demo server is running
- https: true/false depending on if you want to use ssl

Then copy *nuve.js*
<pre>
from licode/nuve/nuveClient/dist to licode-demos/models/
</pre>

and copy *erizo.js*

<pre>
from licode/erizo_controller/erizoClient/dist/ to licode-demos/public/javascripts
</pre>

### How to run

<pre>
sudo npm start
</pre>

### How to use

1. Run licode in the background.
2. Start listener on port by running "basicServer.js".
3. Input the website(for this demo, https://localhost:3004) and visit home-page.
4. Get into the room and share your localvideo.
5. Enjoy the game(for this demo, there should be 6 players before starting the game.)

For any questions please email aurora.shenyuan@gmail.com freely.
