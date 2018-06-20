import express from 'express';
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:"Users profiles"});
})

router.get('/test/profile',()=>{
    res.json({hello:"this is new route"});
})

export default router;