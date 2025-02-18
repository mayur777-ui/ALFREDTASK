import express from 'express';
import dotenv from 'dotenv';
import main from './utility/db.js';
import cors from 'cors';
import flashcardRoutes from'./Routers/FlashCard.router.js';
const app = express();



dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));


app.use(express.json());


app.use('/api', flashcardRoutes);
const port = process.env.PORT;


app.use('/api/home', (req,res)=>{
  res.send("hello from home")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    main();
});