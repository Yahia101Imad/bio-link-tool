export default function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="w-full flex flex-col mb-4">
      {label && <label className="mb-1 text-gray-700 font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          p-3
          rounded-lg
          border
          border-gray-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          focus:outline-none
          bg-white
          transition
          duration-200
          placeholder-gray-400
        "
      />
    </div>
  );
}