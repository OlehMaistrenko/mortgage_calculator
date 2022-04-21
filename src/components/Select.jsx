function Select({ data, handleSelect, value, name, className }) {
  return (
    <select
      className={className}
      value={value}
      name={name}
      onChange={handleSelect}
    >
      {data.map((set) => (
        <option key={set.value} value={set.value}>
          {set.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
