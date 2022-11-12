/**
 *
 * DropdownMenu
 *
 */

const DropdownMenu = ({ main, items, show, setShow }) => {
  const handleMenu = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="my-auto" onClick={() => handleMenu()}>
      <div className="relative ">
        {main}
        {show ? (
          <>
            <div
              className="w-screen h-screen z-40 fixed top-0 left-0 overflow-auto"
              onClick={handleClose}
            />

            <div
              className="z-50 shadow absolute right-0 w-54 bg-black border border-blue-400 mt-2  p-2 rounded"
              onClick={() => handleMenu()}
            >
              {items && items}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownMenu;
