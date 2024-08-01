 const Input = ({ label, type = "text" ,onChange}) => {
    return (
        <div className="mb-4 w-full">
            <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:font-bold placeholder:text-black"
                type={type}
          placeholder={label}
          onChange={onChange}
            />
        </div>
    );
};
export default Input;