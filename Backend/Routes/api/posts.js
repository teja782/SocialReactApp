import express from 'express';
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:"Posts from user"});
})

router.get('test/customer',()=>{
    res.json({hello:"hello"});
})

export default router;