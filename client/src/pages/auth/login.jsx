import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";

const initialState = {
    email: "",
    password: "",
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);


    const redirectPath = location.state?.from?.pathname || "/shop/home";

    console.log("Redirect path:", redirectPath);
    console.log("Logged-in user:", user);

    function onSubmit(event) {
        event.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                const userRole = data.payload.user.role;

                // Redirect based on role
                const finalRedirect = userRole === "admin" ? "/admin/products" : redirectPath;

                toast({
                    title: data.payload.message,
                });

                console.log("Navigating to:", finalRedirect);
                navigate(finalRedirect, { replace: true });
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2">
                    Don't have an account?
                    <Link
                        className="ml-2 font-medium text-primary hover:underline"
                        to="/auth/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={LoginFormControls}
                buttonText={"Sign In"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;
