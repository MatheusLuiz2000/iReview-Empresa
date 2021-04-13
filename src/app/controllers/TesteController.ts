import { Request, Response } from 'express';
import path from 'path';
import moment from 'moment';

class TesteController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };
}

export default new TesteController();
