import React, { useState } from 'react';
import { Controller, FieldValues, Path, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

type InputVal={
    "Username":string;
    "Password":string;
    "Confirm password":string;
    "Something from endpoint":string;
    checkbox:boolean;
}

type InputProps={
    type?:string;
    label:Path<InputVal>;
    register:UseFormRegister<InputVal>
    required:boolean;
}
type Context ={
    register:UseFormRegister<InputVal>
   
}


export const Step1 = ()=>{
    const {register}=useRegister();
    const Input = ({ label, register, required }: InputProps) => (
        <div className="form-group">
          <label>{label}</label>
          <input {...register(label, { required })} />
        </div>)

return(
    <div className="col-md-6 w-50">
    <h2 className="mb-4 text-center">Register</h2>
    <div className="progress" style={{height: "1px"}}>
<div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuemin={0} aria-valuenow={25} aria-valuemax={100}></div>
</div>
<Input label="Username" register={register} required />
<Input label="Password" register={register} required />
<Input label="Confirm password" register={register} required/>  
      {/* <button onClick={()=>setStep(2)} className="btn btn-primary">Next</button> */}
</div>
)
}
export const Step2=()=>{
    const {register}=useRegister();
    const Select = React.forwardRef<
    HTMLSelectElement,
    { label: string } & ReturnType<UseFormRegister<InputVal>>
  >(({ onChange, onBlur, name, label }, ref) => (
        <>
          <label className='m-2'>{label}</label>
          <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
))
    return(
        <div className="col-md-6">
        <h2 className="mb-4 text-center">Register</h2>
        <div className="progress" style={{height: "2px"}}>
    <div className="progress-bar" role="progressbar" style={{width: "66.6%"}} aria-valuemin={0} aria-valuenow={66.6} aria-valuemax={100}></div>
    </div>
    <div className='w-75 my-4'>

          <Select label="Something from endpoint" {...register("Something from endpoint")} />
    </div>
          <div className='w-100 d-flex justify-content-between'>
          {/* <button onClick={()=>setStep(1)} className="btn btn-danger">Previous</button>
          <button onClick={()=>setStep(3)} className="btn btn-primary">Next</button> */}
          </div>
    </div>
    )
}
export const Step3=()=>{
    const {register}=useRegister();
    const {control, reset}=useForm<InputVal>({defaultValues:{
        checkbox:false,
    },})

    const Checkbox = ({field}:{field: FieldValues}) =>{
        
        console.log(field.value)
        return(
        <input type="checkbox" aria-label="consent checkbox" {...field} />
             )}
        
    return(
        <div className="col-md-6">
        <h2 className="mb-4 text-center">Register</h2>
        <div className="progress" style={{height: "2px"}}>
    <div className="progress-bar" role="progressbar" style={{width: "66.6%"}} aria-valuemin={0} aria-valuenow={66.6} aria-valuemax={100}></div>
    </div>
    <div className='w-75 my-4'>
        <Controller  name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox field={field} />}/>
        
    </div>
          <div className='w-100 d-flex justify-content-between'>
          {/* <button onClick={()=>setStep(2)} className="btn btn-danger">Previous</button> */}
          <input type='submit' className="btn btn-primary"/>
          </div>
    </div>
)}

const Register = () => {
    
    const url = useParams();
     const {register, handleSubmit}= useForm<InputVal>();
     const onSubmit: SubmitHandler<InputVal> = (data)=>{console.log(data)}
     return (
    <form onSubmit={handleSubmit(onSubmit)}>

<div
    className="d-flex align-items-center justify-content-center"
    style={{
      minHeight: "100vh",
      backgroundColor: "#f0f8ff",
    }}
    >
      <div className="container w-100">
        <div className="row justify-content-center">
            {/* {step===1 && <Step1 register={register} setStep={setStep}/> }
            {step===2 && <Step2 register={register} setStep={setStep} /> }
            {step===3 && <Step3 register={register} setStep={setStep} onSubmit={onSubmit}/> } */}
    <Outlet context={{register}}/>
         
      </div>
    </div>
    </div>
    </form>
  )
}
export function useRegister(){
    return useOutletContext<Context>();
}

export default Register