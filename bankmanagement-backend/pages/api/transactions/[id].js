import { transactionService } from "../../../service/transactionService";

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
        case "GET":
        if (id) {
            const transaction = transactionService.getById(id);
            return transaction ? res.status(200).json(transaction) : res.status(404).json({ error: "Transaction not found" });
        } else {
            return res.status(200).json(transactionService.getAll());
        }
        
        default:
            return res.status(405).json({ error: "Method not allowed "});
    }
}