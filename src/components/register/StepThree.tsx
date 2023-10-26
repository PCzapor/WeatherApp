import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { stepThreeSubmit } from "store/features/register/stepThreeSlice";
import { z } from "zod";
type stepThreeValidationType = z.infer<typeof stepThreeValidation>;
const stepThreeValidation = z.object({
    rodo: z.boolean(),
    termsOfUse: z.boolean(),
});
const StepThree = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<stepThreeValidationType>({
        resolver: zodResolver(stepThreeValidation),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<stepThreeValidationType> = (data) => {
        dispatch(stepThreeSubmit({ ...data }));
        navigate("/");
    };
    return (
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-center">Register</h2>
            <div className="progress  my-3" style={{ height: "2px" }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuemin={0}
                    aria-valuenow={66.6}
                    aria-valuemax={100}
                ></div>
            </div>
            <div className="w-75 my-4">
                <div className="input-group my-2">
                    <input type="checkbox" {...register("rodo")} />
                    <label htmlFor="rodo" className="ml-4  mb-0">
                        <Link to={"/rodo"}>rodo</Link>
                    </label>
                </div>
                <div className="input-group">
                    <input type="checkbox" {...register("termsOfUse")} />
                    <label htmlFor="termsOfUse" className="ml-4  mb-0">
                        <Link to={"/rodo"}>Terms Of Use</Link>
                    </label>
                </div>
            </div>
            <div className="w-100 d-flex justify-content-between">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/2");
                    }}
                    className="btn btn-danger"
                >
                    Previous
                </button>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default StepThree;
