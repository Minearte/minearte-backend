# Minearte Backend

Welcome to Minearte Backend

This backend is written in TypeScript with **[deno](https://deno.land/)** __not Node.js__

# Configure 
Run to generate the .env file
```sh
deno task config
```

Fill the .env file with your data
```toml
# This is the configuration file for the server.
#
# This is the port that the server will listen on.
PORT=4000
# You can use any of the following options:
#   - INTERNAL: The cache is stored in the same process as the server.
#   - REDIS: The cache is stored in a Redis instance.
CACHE="REDIS"
# This is the interval in milliseconds that the cache will be refreshed.
CACHE_REFRESH_INTERVAL=600000
# Here you can configure the Redis instance.
#
# This is the Redis host. Only used if CACHE=REDIS.
REDIS_HOST="localhost"
# This is the Redis port. Only used if CACHE=REDIS.
REDIS_PORT=6379
# This is the Redis password. Only used if CACHE=REDIS.
REDIS_PASSWORD="password"
# This is the Redis database. Only used if CACHE=REDIS.
REDIS_DATABASE=0
# This is the Redis key prefix. Only used if CACHE=REDIS.
REDIS_KEY_PREFIX="minearte-cache:"
# Tebex
# Here you have to put your tebex secret
TEBEX_SECRET="YOUR_TEBEX_SECRET"
```

You can use Redis for cache or the same process, Redis is recommended for multi-instances

# Running 
Then for start the server you only need to run:
```sh
deno task start
```
If you want hot reload run (you need [denon](https://deno.land/x/denon)):
```sh
deno task dev
```

# Testing

If you want to test the app is working correctly run:

```sh
deno task test
```