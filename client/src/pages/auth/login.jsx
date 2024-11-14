import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/toast";
import { LoginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
// import { LoginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
};

function AuthLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                console.log(data);

                toast({
                    title: data?.payload?.message,
                });
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
                    Don't have an account
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




// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     dispatch(loginUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   return (
//     <div className="w-full max-w-md mx-auto space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Sign in to your account
//         </h1>
//         <p className="mt-2">
//           Don't have an account
//           <Link
//             className="ml-2 font-medium text-primary hover:underline"
//             to="/auth/register"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthLogin;