import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadDetail,
  selectData,
  selectLoading,
  selectStaus,
} from "./detailSlice";
import { FaArrowAltCircleLeft, FaLink } from "react-icons/fa";

import styles from "./detail.module.css";
import Loader from "./Skeleton";

const Detail = () => {
  const { user, repo } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const status = useSelector(selectStaus);

  useEffect(() => {
    dispatch(loadDetail({ user, repo }));
  }, [user, repo]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="mt-10 px-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          {status === "failed" && (
            <div className={`mx-auto ${styles.warningbox}`}>
              <p>Something Went Wrong</p>
              <p>No Data Found</p>
            </div>
          )}
          {status === "found" && (
            <>
              <div className="text-4xl font-bold border-b my-2 flex gap-4">
                <FaArrowAltCircleLeft
                  className="cursor-pointer"
                  onClick={handleBack}
                />
                {data?.full_name}
              </div>
              <table className={styles.table}>
                <tr>
                  <th>Owner Name</th>
                  <td>
                    <a
                      href={data?.owner?.html_url}
                      target="_blank"
                      className="flex flex-wrap gap-2 items-end"
                      rel="noreferrer"
                    >
                      <FaLink className="text-blue-800" /> {data?.owner?.login}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Repo Name</th>
                  <td>
                    <a
                      href={data?.html_url}
                      target="_blank"
                      className="flex flex-wrap gap-2 items-end"
                      rel="noreferrer"
                    >
                      <FaLink className="text-blue-800" /> {data?.name}
                    </a>
                  </td>
                </tr>

                <tr>
                  <th>Open issues</th>
                  <td>{data?.open_issues_count}</td>
                </tr>
                <tr>
                  <th>Default Branch</th>
                  <td>{data?.default_branch}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{data?.description}</td>
                </tr>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
