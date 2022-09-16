import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`GetTam-Backend Running on port ${port}`);
});
