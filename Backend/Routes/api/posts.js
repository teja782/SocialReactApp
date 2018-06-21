import express from 'express';
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:"Posts from user"});
})

router.get('test/customer',()=>{
    res.json({hello:"hello"});
})

router.post("test/hello",()=>{
    res.json({h1:"this is h1"});
});

router.get('"user",()=>{' +
    '' +
    '})

export default router;