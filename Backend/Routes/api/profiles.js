import express from 'express';
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:"Users profiles"});
})

router.get('/test/profile',(res,req)=>{
    res.json({hello:"this is new route"});
})

router.post('test/add',(res, req)=>{
    res.json({this:"this is a check"});
})


router.post('test/add/12345',(res, req)=>{
    res.json({this:"this is a check"});
})

router.all('new',(res, req)=>{
    res.json({hello:"this is tek"});
})

// add more routers...............
export default router;