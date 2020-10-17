import { listen } from './server.js';


listen(3001, () => {
  console.log('listening on 3001');
});