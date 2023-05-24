const {User} = require('../models')

const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {hashPassword} = require('../helpers/bcrypt')

class UserController {
    //create register user function with static async
    static async register(req, res, next) {
        try {
            const {full_name, email, password, gender, role = 'customer', balance} = req.body
            const hashedPassword = hashPassword(password)
            const newUser = await User.create({
                full_name,
                email,
                password,
                gender,
                //role otomatis user
                role,
                balance
            })
            const response = {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                gender: newUser.gender,
                role: newUser.role,
                //rubah balance agar menjadi format rupiah
                balance: newUser.balance.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
                
            }
            res.status(201).json(response)
        }catch(err) {
            res.status(500).json(err)
            console.log(err);
            next(err)
        }
    }

    //login user
    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email : email
                }
            })
            if(!user) {
                throw{
                    status: 404,
                    message: 'email not found'
                }
            }

            //compare password
            const comparedPassword = comparePassword(password, user.password)
            if(!comparedPassword) {
                throw{
                    status: 400,
                    message: 'wrong password'
                }
                return next(err)
            }

            const response = {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
            }
            const access_token = generateToken(response)
            res.status(200).json({access_token})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //edit user without params
    static async updateUser(req, res, next) {
        try {
            //ambil id dari token
            const id = res.locals.user.id
            const {
                full_name,
                email,

            } = req.body
            const editUser = await User.update({
                full_name,
                email,
            }, {
                where: {
                    id
                }, returning: true
            })
            const response = {
                id: editUser[1][0].id,
                full_name: editUser[1][0].full_name,
                email: editUser[1][0].email,
                createdAt: editUser[1][0].createdAt,
                updatedAt: editUser[1][0].updatedAt
            }
            res.status(200).json({User : response})
        } catch (error) {
            res.status(500).json(error)
            next(error)

        }
    }

    //delete user without params
    static async deleteUser(req, res, next) {
        try {
            const id = res.locals.user.id;
            const deleteUser = await User.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: 'Your Account has been successfully deleted'})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }

    //get all user
    static async getAllUser(req, res, next) {
        try {
            const allUser = await User.findAll()
            allUser.forEach(el => {
                el.balance = `Rp. ${el.balance.toLocaleString()}`
            })
            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }

    //top up balance using patch
    static async topUpBalance(req, res, next) {
        try {
            const id = res.locals.user.id
            const {balance} = req.body
            const topUp = await User.increment('balance', {
                by: balance,
                where: {
                    id
                }, returning: true
            })
            const user = await User.findByPk(id)
            res.status(200).json({message: `Your Balance has been successfully updated to ${user.balance.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}`})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }
}

module.exports = UserController