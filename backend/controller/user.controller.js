const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const {ci} = req.params;
        const user = await User.findOne({ci: ci});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { ci, name, lastname, email, password, role } = req.body;

        const existingUser = await User.findOne({ 
            $or: [{ email }, { ci }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: "El usuario ya existe" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            ci,
            name,
            lastname,
            email,
            password: hashedPassword,
            role
        });

        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                ci: user.ci,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { ci } = req.params;
        const user = await User.findOneAndUpdate({ci: ci}, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { ci } = req.params;
        const user = await User.findOneAndDelete({ci:ci});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted succesfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            ci: user.ci,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Por favor proporcione email y contraseña" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: "Email o contraseña incorrectos" 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Email o contraseña incorrectos" 
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                ci: user.ci,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: "No autorizado - Token no proporcionado" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({       
            message: "No autorizado - Token inválido" 
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    generateToken,
    verifyToken, 
    login,
    logout
}