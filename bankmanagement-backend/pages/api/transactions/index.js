import { transactionService } from "../../../services/transactionService";

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return res.status(200).json(transactionService.getAll());

        case "POST":
            const newTransaction = transactionService.create(req.body);
            return res.status(201).json(newTransaction);
        
        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
}