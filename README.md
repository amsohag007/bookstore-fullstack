## Project Setup Process

### For Backend:

1. Go inside backend project

```bash
$ cd nest-prisma-postgres/
```

2. Install packages

```bash
$ npm install
```

3. Build postgres container

```bash
$ docker compose up -d
```

4. Migrate DB

```bash
$ npx prisma migrate dev
```

5. Run the project

```bash
$ npm run start:dev
```

## For frontend app:

1. Go inside backend project

```bash
$ cd frontend/
```

2. Install packages

```bash
$ npm install
```

3. Run the project

```bash
$ npm run dev
```
