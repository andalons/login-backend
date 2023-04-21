export const register = (req, res) =>{
    console.log(req.body);
    res.json({
        error: null,
        data: 'register'
    });
}

export const login = (req, res) =>{
    console.log(req.body);
    res.json({
        error: null,
        data: 'login'
    });
}
