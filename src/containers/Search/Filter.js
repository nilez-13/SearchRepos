import React, { memo } from "react";
const Filter = ({}) => {
  return (
    <div
      className={`bg-black border-b-2 flex items-end z-10 py-2 ${styles.sticky}`}
    >
      <div className="mt-2 mx-4 flex items-end justify-start gap-4">
        <div>Sort by</div>
        <div className="grid grid-cols-4 gap-4">
          <button
            className={`${styles.sortButton} tooltip `}
            onClick={() => handleSort("stars")}
          >
            <FaStar
              className={`${
                sort === "stars"
                  ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                  : ""
              }`}
            />
            <div className={`tooltipBox`}>
              <p className="tooltipText">Star count</p>
            </div>
          </button>

          <button
            className={`${styles.sortButton} tooltip `}
            onClick={() => handleSort("forks")}
          >
            <GoRepoForked
              className={`${
                sort === "forks"
                  ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                  : ""
              }`}
            />
            <div className={`tooltipBox`}>
              <p className="tooltipText"> Fork count</p>
            </div>
          </button>

          <button
            className={`${styles.sortButton} tooltip`}
            onClick={() => handleSort("updated")}
          >
            <GoHistory
              className={`${
                sort === "updated"
                  ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                  : ""
              }`}
            />
            <div className={`tooltipBox`}>
              <p className="tooltipText"> Last update</p>
            </div>
          </button>
          <button
            className={`${styles.sortButton} tooltip`}
            onClick={handleOrder}
          >
            {order === "desc" ? (
              <>
                <FaSortAmountDown />
                <div className={`tooltipBox`}>
                  <p className="tooltipText">Descending</p>
                </div>
              </>
            ) : (
              <>
                <FaSortAmountUpAlt />
                <div className={`tooltipBox`}>
                  <p className="tooltipText"> Ascending</p>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
