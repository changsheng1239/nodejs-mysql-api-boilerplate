dev: export PORT=3000
dev:
	node index.js

prod: export PORT=3001
prod:
	pm2 start index.js

restart: export PORT=3001
restart:
	pm2 restart 0