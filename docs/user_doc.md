# User documentation

## Install dependencies

```cmd
pnpm install
```

## App key generation

```cmd
node tools/genkey.js
```

## Database setup

Edit the config/default.json file.

## Endpoints

All endpoint have a /api prefix.

| Endpoint | Method | Auth | Description |
|-|-|-|-|
| /register | POST  | no |  create user |
| /login    | POST  | no |  login  |
| /users    | GET   | no |  read users |
