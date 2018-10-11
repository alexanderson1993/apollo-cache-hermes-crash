# Apollo Cache Hermes Crash

A demo showing Apollo Cache Hermes crashing a React Native Android application.

Be sure to install `exp`:

```
npm i -g exp
```

Then clone this repo, install, and run.

```
git clone https://github.com/alexanderson1993/apollo-cache-hermes-crash
cd apollo-cache-hermes-crash
npm install
npm start
```

Open up an Android device or emulator and use the Expo app to run this app. (See
[https://expo.io](https://expo.io) for more information on how to do this.)

Reproduction Steps:

1. Create a new expo project
2. Wire it up to connect to a GraphQL server using apollo-cache-hermes
3. Run in an Android emulator. Observe it crash.
4. Replace apollo-cache-hermes with apollo-cache-inmemory
5. Run in an Android emulator. Observe it work as expected.
