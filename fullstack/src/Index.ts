import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import type { Application, Request, Response, NextFunction } from 'express';
import Routes from './routes/Routes.js';

class Index {

  static startServer(): void {
    const app: Application = express();
    const PORT = process.env.PORT || 3000;

    app.set('view engine', 'ejs');
    app.set('views', path.join(process.cwd(), 'src/views'));
    app.use(express.static('src/public'));
    app.use(expressLayouts);
    app.set('layout', 'layouts/app');

    app.use(Routes.initializeRoutes());

    app.use((req: Request, res: Response) => {
      res.status(404).render('errors/error', {
        viewData: { title: "Not found", status: 404, message: "The page you're looking for doesn't exist." }
      });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(500).render('errors/error', {
        viewData: { title: "Server error", status: 500, message: "Something went wrong." }
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

}

Index.startServer();
