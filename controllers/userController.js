const {User: UserModel} = require("../models/User")

const userController ={
    create: async(req, res) => {
        try{
            const user ={
                nm_usuario: req.body.nm_usuario,
                login: req.body.login,
                senha: req.body.senha,
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                dt_nasc: req.body.dt_nasc,
                dt_val_licenca: req.body.dt_val_licenca,
            }
            const response = await UserModel.create(user);

            res.status(201).json({response, msg: "Usuário criado com sucesso!"})

        }catch(error){
            console.log(error)
        }
    },

    getAll: async(req, res) =>{
        try{
            const users = await UserModel.find()
            res.json(users)
        } catch(error){
            console.log(error)
        }
    },

    get: async(req, res) =>{
        try{
            const id = req.params.id
            const user = await UserModel.findById(id)
            if(!user){
                res.status(404).json({msg: "Usuário não encontrado."})
                return
            }

            res.json(user)
        }catch(error){
            console.log(error)
        }
    },

    delete: async(req, res) =>{
        try{
            const id = req.params.id
            const user = await UserModel.findById(id)
            if(!user){
                res.status(404).json({msg: "Usuário não encontrado."})
                return
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({deletedUser, msg: "Usuário deletado com sucesso!"})
        }catch(error){
            console.log(error)
        }
    },

    update: async(req,res) => {
        try{
            const id = req.params.id

            const user ={
                nm_usuario: req.body.nm_usuario,
                login: req.body.login,
                senha: req.body.senha,
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                dt_nasc: req.body.dt_nasc,
                dt_val_licenca: req.body.dt_val_licenca,
            }

            const updatedUser = await UserModel.findByIdAndUpdate(id, user)

            if(!updatedUser){
                res.status(404).json({msg: "Usuário não encontrado."})
                return
            }
            res.status(200).json({user, msg: "Usuário atualizado com sucesso!"})


        }catch(error){
            console.log(error)
        }
    }
}

module.exports = userController;