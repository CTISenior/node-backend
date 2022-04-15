import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const { parsed: envs } = result;

console.log(envs);

module.exports = envs;
