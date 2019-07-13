module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: parseInt(process.env.PORT) || 3000,
  REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',
  KAFKA_HOST: process.env.KAFKA_HOST || 'localhost:9092',
  KAFKA_TOPIC: process.env.KAFKA_TOPIC || 'topic-ranking'
}
