import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./detail.module.css";

const Loader = () => {
  return (
    <>
      <Skeleton />

      <table className={styles.table}>
        <tr>
          <th>Owner Name</th>
          <td>
            <Skeleton />
          </td>
        </tr>
        <tr>
          <th>Repo Name</th>
          <td>
            <Skeleton />
          </td>
        </tr>

        <tr>
          <th>Open issues</th>
          <td>
            {" "}
            <Skeleton />
          </td>
        </tr>
        <tr>
          <th>Default Branch</th>
          <td>
            {" "}
            <Skeleton />
          </td>
        </tr>
        <tr>
          <th>Description</th>
          <td>
            {" "}
            <Skeleton />
          </td>
        </tr>
      </table>
    </>
  );
};

export default Loader;
