# Change Log

## [v1.0.0-rc1] 2021-07-20
### Stable release - MAIN branch

- Stack: Node JS/ Express / TypeORM / SQLite3
- API:
   - Sign UP: `/api/users/register`
   - Sign IN: `/api/users/login`
   - Logout: `/api/users/logout`
   - Check Session: `/api/users/checkSession`
   - Edit User: `/api/users/edit`
- Data persistence
  - TypeORM / SQLite3
  - Db migrations are in `src/migrations` folder
  - Added new config `ormconfig.json`
