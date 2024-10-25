import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import { HttpStatusCodes } from '../constants/constants';

export const httpServer = http.createServer((req, res) => {
  const dirname = path.resolve(path.dirname(''));
  const filePath = path.join(dirname, req.url === '/' ? 'front/index.html' : `front${req.url}`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(HttpStatusCodes.NOT_FOUND);
      res.end(JSON.stringify(err));

      return;
    }
    res.writeHead(HttpStatusCodes.OK);
    res.end(data);
  });
});
