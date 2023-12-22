export default function Switch({ id, label, value = false, onChange }) {
  return (
    <div className="flex gap-2">
      <input
        id={id}
        type="checkbox"
        onChange={(event) => {
          const isChecked = event.target.checked;
          onChange(isChecked);
        }}
        checked={value}
      />
      <label htmlFor={id} className="text-base">
        {label}
      </label>
    </div>
  );
}
