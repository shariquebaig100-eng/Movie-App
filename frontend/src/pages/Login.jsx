import { useState } from "react";
import {
    Container, TextField, Button, Typography, Box, InputAdornment,
    IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });
            login(res.data);

            toast.success("Login successful 🎉");
            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h4" align="center" gutterBottom>Login</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth 
                    label="Email" 
                    margin="normal"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                     helperText="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
            <Typography align="center" sx={{ mt: 2 }}>
                Don’t have an account?{" "}
                <Link to="/signup">Sign Up</Link>
            </Typography>
        </Container>
    );
};

export default Login;
