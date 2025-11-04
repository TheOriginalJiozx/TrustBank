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

        case "PUT":
            const updated = transactionService.update(id, req.body);
            return updated ? res.status(200).json(transaction) : res.status(404).json({ error: "Transaction not found" });
        
        case "DELETE":
            const deleted = transactionService.delete(id);
            return deleted ? res.status(200).json(transaction) : res.status(404).json({ error: "Transaction not found" });
        
        default:
            return res.status(405).json({ error: "Method not allowed "});
    }
}