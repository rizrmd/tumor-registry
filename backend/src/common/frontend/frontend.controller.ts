import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller()
export class FrontendController {
  @Get()
  serveIndex(@Res() res: Response) {
    const indexPath = join(process.cwd(), 'frontend', 'index.html');
    return res.sendFile(indexPath);
  }

  @Get('health')
  serveHealthIndex(@Res() res: Response) {
    const indexPath = join(process.cwd(), 'frontend', 'index.html');
    return res.sendFile(indexPath);
  }

  // Serve all other routes as SPA (except /api/*)
  @Get('*')
  serveSpa(@Res() res: Response) {
    const indexPath = join(process.cwd(), 'frontend', 'index.html');
    return res.sendFile(indexPath);
  }
}
