import express, { Request, Response } from 'express';
import { KHQRService } from './khqr.service';

import morgan from 'morgan';

// Initialize Express app
const app = express();
const port = 6800;

app.use(express.json());

// MORGAN
app.use(morgan('dev'));

// Create instance of KHQRService
const service = new KHQRService();

// Route to get user by ID
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "KHQR Service" });
});

app.post('/merchant-qr', (req: Request, res: Response) => {
    const data = service.generateMerchantQR(req.body);
    res.json(data)
})

app.post('/my-qr', (req: Request, res: Response) => {
    const data = service.generateIndividualQr(req.body);
    res.json(data)
})

app.post('/decode-khqr', (req: Request, res: Response) => {
    const qr = req.body.qrCode || ""
    const data = service.decodeKHQR(qr);
    res.json(data)
})

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});