import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    isSubmitting,
  } = useForm();

  const onSubmit = async (data) => {
    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(data),
    });
    let res = await r.text();
    console.log(data, res);
  };

  return (
    <>
      {isSubmitting && <div>Loading....</div>}
      <div className="w-full max-w-xs">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="m-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="username"
            {...register("username", {
              required: true,
              minLength: { value: 3, message: "Min lenght is 3" },
            })}
          />
          {errors.username && <div>{errors.username.message}</div>}
          <input
            className="m-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <input
            disable={isSubmitting}
            type="submit"
            value="Submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4"
          />
        </form>
      </div>
    </>
  );
}

export default App;
