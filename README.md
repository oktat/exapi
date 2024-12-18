# exapi

Exapi framework

Express based REST API sablon

## Install

```cmd
git clone https://github.com/oktat/exapi
cd exapi
npm install
```

## APP KEY generation

Run the genkey tools:

```cmd
node tools/genkey.js
```

## Database settings

The database settings can be found at the following location:

* config/default.json

### Database dialect

The default database is an in-memory database. Its contents are cleared after the server is restarted.

One of:

* :memory:
* sqlite
* mariadb

After installing the appropriate dependencies, it can be used:

* mysql
* postgres
* mssql
* db2
* snowflake
* oracle

## Starting

For development:

```cmd
npm run dev
```

Run productum:

```cmd
npm start
```

## Licence

May be freely distributed under the MIT license.

Copyright (c) 2023 Sallai András
