const Detail = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((each) => (
        <div className="p-20 text-xl bg-gray-400 rounded">{each}</div>
      ))}
    </div>
  );
};

export default Detail;
